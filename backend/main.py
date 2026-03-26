import asyncio
import base64
from concurrent.futures import ThreadPoolExecutor

import cv2
import numpy as np
from fastapi import FastAPI, File, HTTPException, Query, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

import settings
from detector import WasteDetector

app = FastAPI(title="Waste Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

_detectors: dict[str, WasteDetector] = {}
_executor = ThreadPoolExecutor(max_workers=2)


def get_detector(model_name: str) -> WasteDetector:
    if model_name not in settings.MODELS:
        raise HTTPException(status_code=404, detail=f"Model '{model_name}' not found")
    if model_name not in _detectors:
        _detectors[model_name] = WasteDetector(settings.MODELS[model_name])
    return _detectors[model_name]


@app.get("/api/models")
def list_models():
    return {"models": list(settings.MODELS.keys()), "default": settings.DEFAULT_MODEL}


@app.post("/api/detect/image")
async def detect_image(
    file: UploadFile = File(...),
    model_name: str = Query(default=settings.DEFAULT_MODEL),
):
    data = await file.read()
    arr = np.frombuffer(data, np.uint8)
    image = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if image is None:
        raise HTTPException(status_code=400, detail="Invalid image file")

    detector = get_detector(model_name)
    loop = asyncio.get_event_loop()
    annotated, detections = await loop.run_in_executor(_executor, detector.detect, image)

    _, buf = cv2.imencode(".jpg", annotated, [cv2.IMWRITE_JPEG_QUALITY, 90])
    return {"image": base64.b64encode(buf).decode(), "detections": detections}


@app.websocket("/ws/video")
async def video_stream(websocket: WebSocket, model: str = settings.DEFAULT_MODEL):
    await websocket.accept()

    if model not in settings.MODELS:
        await websocket.send_json({"error": f"Model '{model}' not found"})
        await websocket.close()
        return

    detector = get_detector(model)
    cap = cv2.VideoCapture(settings.WEBCAM_PATH)

    if not cap.isOpened():
        await websocket.send_json({"error": "Could not open webcam"})
        await websocket.close()
        return

    loop = asyncio.get_event_loop()
    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                await websocket.send_json({"error": "Failed to read frame"})
                break

            annotated, detections = await loop.run_in_executor(
                _executor, detector.detect, frame
            )

            _, buf = cv2.imencode(".jpg", annotated, [cv2.IMWRITE_JPEG_QUALITY, 80])
            await websocket.send_json({
                "frame": base64.b64encode(buf).decode(),
                "detections": detections,
            })
            await asyncio.sleep(0.033)  # ~30 FPS
    except WebSocketDisconnect:
        pass
    finally:
        cap.release()
