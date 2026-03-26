const CATEGORIES = {
  recyclable: {
    label: 'Recyclable',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  non_recyclable: {
    label: 'Non-Recyclable',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    dot: 'bg-blue-400',
  },
  hazardous: {
    label: 'Hazardous',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    dot: 'bg-red-400',
  },
  other_waste: {
    label: 'Other Waste',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
  },
  medical_textile: {
    label: 'Medical / Textile',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    dot: 'bg-purple-400',
  },
};

export default function DetectionResults({ detections }) {
  if (!detections.length) {
    return (
      <div className="text-center py-10 text-slate-600 dark:text-slate-600">
        <div className="text-4xl mb-2">🔍</div>
        <p className="text-sm">No objects detected yet</p>
      </div>
    );
  }

  const grouped = detections.reduce((acc, d) => {
    (acc[d.category] ??= []).push(d);
    return acc;
  }, {});

  return (
    <div className="space-y-3">
      {Object.entries(CATEGORIES).map(([cat, cfg]) => {
        const items = grouped[cat];
        if (!items?.length) return null;
        return (
          <div key={cat} className={`rounded-xl border p-3 ${cfg.bg} ${cfg.border}`}>
            <h3 className={`text-xs font-semibold uppercase tracking-wide mb-2 ${cfg.color}`}>
              {cfg.label} — {items.length}
            </h3>
            <ul className="space-y-1.5">
              {items.map((item, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    <span className="text-foreground text-sm">{item.class}</span>
                  </div>
                  <span className={`text-xs font-medium tabular-nums ${cfg.color}`}>
                    {Math.round(item.confidence * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
