import { useEffect, useRef, useState } from 'react';
import { WS_BASE } from '../config';

export default function VideoStream({ model, onDetections, isActive }) {
  const imgRef = useRef(null);
  const wsRef = useRef(null);
  const lastUpdateRef = useRef(0);
  const hasFrameRef = useRef(false);
  const [status, setStatus] = useState('disconnected');
  const [error, setError] = useState(null);
  const [hasFrame, setHasFrame] = useState(false);

  useEffect(() => {
    if (!isActive) {
      wsRef.current?.close();
      wsRef.current = null;
      hasFrameRef.current = false;
      setStatus('disconnected');
      setHasFrame(false);
      return;
    }

    setStatus('connecting');
    setError(null);
    hasFrameRef.current = false;
    setHasFrame(false);

    const ws = new WebSocket(`${WS_BASE}/ws/video?model=${model}`);
    wsRef.current = ws;

    ws.onopen = () => setStatus('connected');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.error) {
        setError(data.error);
        setStatus('error');
        return;
      }

      if (data.frame && imgRef.current) {
        imgRef.current.src = `data:image/jpeg;base64,${data.frame}`;
        if (!hasFrameRef.current) {
          hasFrameRef.current = true;
          setHasFrame(true);
        }
      }

      if (data.detections) {
        const now = Date.now();
        if (now - lastUpdateRef.current > 200) {
          lastUpdateRef.current = now;
          onDetections(data.detections);
        }
      }
    };

    ws.onerror = () => {
      setStatus('error');
      setError('WebSocket connection failed — is the backend running?');
    };

    ws.onclose = () => {
      if (wsRef.current === ws) {
        setStatus('disconnected');
      }
    };

    return () => {
      ws.close();
    };
  }, [model, isActive]);

  const statusStyles = {
    connected: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    connecting: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    error: 'text-red-400 bg-red-500/10 border-red-500/30',
    disconnected: 'text-slate-400 bg-slate-700/50 border-slate-600/30',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs px-2 py-1 rounded-md border font-medium ${statusStyles[status]}`}>
          {status}
        </span>
        {status === 'connected' && (
          <span className="text-xs text-slate-500">~30 FPS</span>
        )}
      </div>

      {error && (
        <div className="bg-red-900/40 border border-red-700/50 rounded-xl px-4 py-3 mb-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
        {!hasFrame && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 gap-2">
            <div className="text-5xl">📷</div>
            <p className="text-sm">
              {status === 'connecting' ? 'Connecting to camera…' : 'Camera not active'}
            </p>
          </div>
        )}
        <img
          ref={imgRef}
          alt="Live detection feed"
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            hasFrame ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
}
