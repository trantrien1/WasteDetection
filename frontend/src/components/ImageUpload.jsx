import { useRef, useState } from 'react';
import { API_BASE } from '../config';

export default function ImageUpload({ model, onDetections }) {
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  const runDetection = async (file) => {
    if (!file?.type.startsWith('image/')) {
      setError('Please provide a valid image file.');
      return;
    }

    setError(null);
    setResultImage(null);
    setLoading(true);

    try {
      const form = new FormData();
      form.append('file', file);

      const res = await fetch(`${API_BASE}/api/detect/image?model_name=${model}`, {
        method: 'POST',
        body: form,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setResultImage(`data:image/jpeg;base64,${data.image}`);
      onDetections(data.detections);
    } catch (err) {
      setError(`Detection failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    runDetection(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all select-none ${
          dragging
            ? 'border-emerald-400 bg-emerald-500/10'
            : 'border-slate-600 hover:border-emerald-500/60 hover:bg-slate-700/30'
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => runDetection(e.target.files[0])}
        />
        <div className="text-4xl mb-3">{dragging ? '🎯' : '📁'}</div>
        <p className="text-slate-300 font-medium text-sm">
          {dragging ? 'Drop to detect' : 'Drag & drop or click to upload'}
        </p>
        <p className="text-slate-500 text-xs mt-1">PNG, JPG, JPEG supported</p>
      </div>

      {error && (
        <div className="bg-red-900/40 border border-red-700/50 rounded-xl px-4 py-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center py-8 text-slate-400 gap-3">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Detecting objects…</p>
        </div>
      )}

      {resultImage && (
        <div className="rounded-xl overflow-hidden bg-black">
          <img src={resultImage} alt="Detection result" className="w-full" />
        </div>
      )}
    </div>
  );
}
