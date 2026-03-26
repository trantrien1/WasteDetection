# Waste Detection (YOLO)

Ứng dụng phát hiện rác thải (waste detection) với model YOLO, gồm:
- Backend: FastAPI (Python), nhận ảnh và stream webcam.
- Frontend: React + Vite + TailwindCSS.
- Mô hình: `weights/YOLO26m` và `weights/YOLO26n` (với file `.pt` và `.onnx`).

**Dataset:** [Waste Detection Dataset on Roboflow](https://app.roboflow.com/wastedetection-1zidy/waste-detection-vqkjo-dkcrc/3)

## 1. Yêu cầu hệ thống

- Python 3.10+
- Node.js 18+
- GPU và CUDA nếu dùng mô hình PyTorch với tăng tốc (tùy thiết lập `WasteDetector`).

## 2. Cài đặt Backend

1. Mở terminal trong `backend/`:
   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\activate   # Windows
   # source .venv/bin/activate  # macOS/Linux
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

2. Chỉnh `settings.py` nếu bạn muốn model mặc định, đường dẫn webcam, hay cấu hình khác.

3. Chạy backend:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

## 3. Cài đặt Frontend

1. Mở terminal trong `frontend/`:
   ```bash
   cd frontend
   npm install
   ```

2. Chạy dev server:
   ```bash
   npm run dev
   ```

3. Mặc định, frontend sẽ kết nối đến backend trên `http://127.0.0.1:8000` (kiểm tra `frontend/src/config.js`).

4. Mở trình duyệt vào URL của Vite (thường `http://localhost:3000`).

## 4. Cấu trúc project

- `backend/`:
  - `main.py`: API gồm endpoint models, image detect, websocket video.
  - `detector.py`: class `WasteDetector` dùng YOLO model để infer.
  - `settings.py`: cấu hình model map, webcam path, etc.

- `frontend/`:
  - `src/App.jsx`: logic chính tương tác API + hiển thị.
  - `src/components/ModelSelector.jsx`: selector model tùy chỉnh.
  - `src/components/VideoStream.jsx`: WebSocket video stream.

- `weights/`: chứa model file `YOLO26m` và `YOLO26n`.

## 5. Sử dụng

1. Mở app frontend, chọn model (YOLO26m/YOLO26n).
2. Upload ảnh hoặc bật webcam.
3. Xem kết quả *detections* và ảnh gắn nhãn.


## 6. Ghi chú

- `weights` nặng; nếu chưa có, tải model YOLO phù hợp (hoặc tự train).
- Đảm bảo backend được chạy khi dùng frontend.
