import { useState, useEffect } from 'react';
import { API_BASE } from './config';
import { HeroSection } from './components/blocks/hero-section-1';
import ModelSelector from './components/ModelSelector';
import VideoStream from './components/VideoStream';
import ImageUpload from './components/ImageUpload';
import DetectionResults from './components/DetectionResults';

export default function App() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('YOLO26m');
  const [activeTab, setActiveTab] = useState('camera');
  const [detections, setDetections] = useState([]);
  const [backendError, setBackendError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/models`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        setModels(data.models);
        if (data.default) setSelectedModel(data.default);
      })
      .catch(err => setBackendError(`Cannot reach backend: ${err.message}`));
  }, []);

  // Switch tab when hero nav links are clicked (#camera / #upload)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#upload') {
        setActiveTab('upload');
        setDetections([]);
      } else if (hash === '#camera') {
        setActiveTab('camera');
        setDetections([]);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setDetections([]);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setDetections([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Landing / Hero ───────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Detection App ────────────────────────────────────────────── */}
      <section className="bg-background py-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Detection Studio</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Point your camera or upload an image to classify waste in real time.
              </p>
            </div>
            {models.length > 0 && (
              <ModelSelector
                models={models}
                selected={selectedModel}
                onChange={handleModelChange}
              />
            )}
          </div>

          {/* Backend error banner */}
          {backendError && (
            <div className="mb-6 bg-destructive/20 border border-destructive/40 rounded-xl px-4 py-3 text-red-300 text-sm">
              {backendError} — make sure the backend is running on port 8000.
            </div>
          )}

          <div className="flex gap-6">
            {/* Left panel */}
            <div className="flex-1 min-w-0">
              {/* Tabs — IDs allow hero links to scroll here */}
              <div className="flex gap-2 mb-4">
                <button
                  id="camera"
                  onClick={() => switchTab('camera')}
                  className={`scroll-mt-24 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'camera'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                      : 'bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground border border-border'
                  }`}
                >
                  📷 Live Camera
                </button>
                <button
                  id="upload"
                  onClick={() => switchTab('upload')}
                  className={`scroll-mt-24 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'upload'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                      : 'bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground border border-border'
                  }`}
                >
                  📤 Upload Image
                </button>
              </div>

              <div className="bg-secondary rounded-2xl border border-border p-5">
                {activeTab === 'camera' ? (
                  <VideoStream
                    model={selectedModel}
                    onDetections={setDetections}
                    isActive={activeTab === 'camera'}
                  />
                ) : (
                  <ImageUpload
                    model={selectedModel}
                    onDetections={setDetections}
                  />
                )}
              </div>
            </div>

            {/* Right panel */}
            <div className="w-72 flex-shrink-0">
              <div className="bg-secondary rounded-2xl border border-border p-5 sticky top-6">
                <h3 className="font-semibold text-muted-foreground text-sm mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Detection Results
                </h3>
                <DetectionResults detections={detections} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
