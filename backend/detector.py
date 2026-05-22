import cv2
import numpy as np
import torch
from ultralytics import YOLO

import settings


def classify_waste(class_name: str) -> str:
    """Map model output class name to display category key."""
    return settings.CLASS_CATEGORY_MAP.get(class_name, "other_waste")


class WasteDetector:
    def __init__(self, model_path: str):
        self.device = self._select_device()
        self.model = YOLO(model_path)
        print(f"Using YOLO device: {self.device}")

    @staticmethod
    def _select_device() -> str:
        configured_device = settings.INFERENCE_DEVICE.strip().lower()
        if configured_device != "auto":
            return configured_device
        return "cuda:0" if torch.cuda.is_available() else "cpu"

    def detect(self, frame: np.ndarray) -> tuple[np.ndarray, list[dict]]:
        results = self.model.predict(frame, conf=0.6, device=self.device, verbose=False)

        detections = []
        annotated = frame

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
