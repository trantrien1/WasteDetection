export default function ModelSelector({ models, selected, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-slate-400 text-xs font-medium">Model</label>
      <select
        value={selected}
        onChange={e => onChange(e.target.value)}
        className="bg-slate-700 text-white text-sm rounded-lg px-3 py-1.5 border border-slate-600 focus:outline-none focus:border-emerald-500 cursor-pointer"
      >
        {models.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>
  );
}
