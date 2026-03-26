import cv2
import numpy as np
from ultralytics import YOLO

import settings


def classify_waste(class_name: str) -> str:
    """Map model output class name to display category key."""
    return settings.CLASS_CATEGORY_MAP.get(class_name, "other_waste")


class WasteDetector:
    def __init__(self, model_path: str):
        self.model = YOLO(model_path)

    def detect(self, frame: np.ndarray) -> tuple[np.ndarray, list[dict]]:
        resized = cv2.resize(frame, (640, 360))
        results = self.model.predict(resized, conf=0.6, verbose=False)

        detections = []
        annotated = resized

        for result in results:
            annotated = result.plot()
            for box in result.boxes:
                cls_id = int(box.cls[0])
                class_name = result.names[cls_id]
                detections.append({
                    "class": class_name.replace("_", " "),
                    "confidence": round(float(box.conf[0]), 3),
                    "category": classify_waste(class_name),
                    "bbox": [round(x, 1) for x in box.xyxy[0].tolist()],
                })

        return annotated, detections
