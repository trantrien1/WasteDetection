from pathlib import Path

WEIGHTS_DIR = Path(__file__).parent.parent / "weights"

MODELS = {
    name: str(WEIGHTS_DIR / name / "best.pt")
    for name in ["YOLO26m", "YOLO26n"]
    if (WEIGHTS_DIR / name / "best.pt").exists()
}

DEFAULT_MODEL = "YOLO26m" if "YOLO26m" in MODELS else next(iter(MODELS), None)

WEBCAM_PATH = 0

# Direct mapping from model output class names → display category keys
# Source: class_balance.csv
CLASS_CATEGORY_MAP: dict[str, str] = {
    "Recyclable":      "recyclable",
    "Non-Recyclable":  "non_recyclable",
    "Hazardous":       "hazardous",
    "Other_Waste":     "other_waste",
    "Medical_Textile": "medical_textile",
}
