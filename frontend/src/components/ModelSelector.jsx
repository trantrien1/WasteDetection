import { useEffect, useRef, useState } from "react";

export default function ModelSelector({ models, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (model) => {
    onChange(model);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <label className="block text-slate-400 text-xs font-medium mb-1">Model</label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-44 flex justify-between items-center bg-slate-700 text-white text-sm rounded-lg px-3 py-1.5 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <span>{selected || "Chọn model"}</span>
        <span className="ml-2 text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-44 bg-slate-800 border border-slate-600 rounded-xl shadow-lg">
          <ul className="max-h-48 overflow-y-auto">
            {models.map((m) => (
              <li key={m}>
                <button
                  className={`w-full text-left px-3 py-2 text-sm ${selected === m ? "bg-emerald-500/20" : "hover:bg-slate-700"} rounded-xl text-white`}
                  onClick={() => handleSelect(m)}
                >
                  {m}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

