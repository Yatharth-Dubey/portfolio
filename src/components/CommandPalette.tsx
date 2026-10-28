import { useEffect, useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";

export type Command = { id: string; label: string; group: string; run: () => void };

type Props = { open: boolean; onClose: () => void; commands: Command[] };

function Dialog({ onClose, commands }: Omit<Props, "open">) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const needle = q.trim().toLowerCase();
  const results = commands.filter((c) => `${c.label} ${c.group}`.toLowerCase().includes(needle));
  const current = Math.min(idx, Math.max(results.length - 1, 0));

  useEffect(() => {
    document.getElementById(`cmd-opt-${current}`)?.scrollIntoView({ block: "nearest" });
  }, [current]);

  const run = (c?: Command) => {
    if (!c) return;
    onClose();
    c.run();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setIdx((current + 1) % Math.max(results.length, 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((current - 1 + results.length) % Math.max(results.length, 1)); }
    else if (e.key === "Enter") { e.preventDefault(); run(results[current]); }
  };

  return (
    <div className="cmd-overlay" onMouseDown={onClose}>
      <div className="cmd-box" role="dialog" aria-modal="true" aria-label="Quick jump" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <div className="cmd-input-row">
          <Search size={18} />
          <input
            autoFocus
            className="cmd-input"
            placeholder="Jump to a section, project or action"
            value={q}
            onChange={(e) => { setQ(e.target.value); setIdx(0); }}
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-list"
            aria-activedescendant={results.length ? `cmd-opt-${current}` : undefined}
          />
          <kbd>Esc</kbd>
        </div>
        <div className="cmd-list" id="cmd-list" role="listbox">
          {results.length === 0 && <p className="cmd-empty">Nothing matches "{q}"</p>}
          {results.map((c, i) => (
            <div key={c.id}>
              {(i === 0 || results[i - 1].group !== c.group) && <p className="cmd-group">{c.group}</p>}
              <div
                id={`cmd-opt-${i}`}
                role="option"
                aria-selected={i === current}
                className={`cmd-item ${i === current ? "is-active" : ""}`}
                onMouseMove={() => setIdx(i)}
                onClick={() => run(c)}
              >
                <span>{c.label}</span>
                {i === current && <CornerDownLeft size={14} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CommandPalette({ open, onClose, commands }: Props) {
  return open ? <Dialog onClose={onClose} commands={commands} /> : null;
}