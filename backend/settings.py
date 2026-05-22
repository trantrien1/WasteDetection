from pathlib import Path
import os

WEIGHTS_DIR = Path(__file__).parent.parent / "weights"

MODELS = {
    name: str(WEIGHTS_DIR / name / "best.pt")
    for name in ["YOLO26x", "YOLO26m", "YOLO26s", "YOLO26n"]
    if (WEIGHTS_DIR / name / "best.pt").exists()
}

# Prefer the most capable available model as the default
_DEFAULT_PRIORITY = ["YOLO26x", "YOLO26m", "YOLO26s", "YOLO26n"]
DEFAULT_MODEL = next((m for m in _DEFAULT_PRIORITY if m in MODELS), next(iter(MODELS), None))

WEBCAM_PATH = 0

# Use "auto" to prefer CUDA when PyTorch can see an NVIDIA GPU.
# Override with YOLO_DEVICE=cpu or YOLO_DEVICE=cuda:0 if needed.
INFERENCE_DEVICE = os.getenv("YOLO_DEVICE", "auto")

# Direct mapping from model output class names → display category keys
# Source: class_balance.csv
CLASS_CATEGORY_MAP: dict[str, str] = {
    "Recyclable":      "recyclable",
    "Non-Recyclable":  "non_recyclable",
    "Hazardous":       "hazardous",
    "Other_Waste":     "other_waste",
    "Medical_Textile": "medical_textile",
}
