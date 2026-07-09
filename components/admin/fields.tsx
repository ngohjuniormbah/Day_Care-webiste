"use client";

import type { ReactNode } from "react";

export const inputCls =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15";

export function Text({
  label,
  value,
  onChange,
  area = false,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      {area ? (
        <textarea className={inputCls} rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={inputCls} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

export function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[#7c5cff]" />
      {label}
    </label>
  );
}

export function Card({ title, desc, children }: { title: string; desc?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      {desc && <p className="mb-4 mt-0.5 text-sm text-slate-500">{desc}</p>}
      <div className={desc ? "" : "mt-4"}>{children}</div>
    </section>
  );
}

/** Editable list of plain strings, with add/remove. */
export function StringList({
  label,
  items,
  onChange,
  addLabel = "+ Add",
  placeholder,
}: {
  label?: string;
  items: string[];
  onChange: (next: string[]) => void;
  addLabel?: string;
  placeholder?: string;
}) {
  const setAt = (i: number, v: string) => onChange(items.map((x, j) => (j === i ? v : x)));
  const removeAt = (i: number) => onChange(items.filter((_, j) => j !== i));
  return (
    <div>
      {label && <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>}
      <div className="space-y-2">
        {items.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input className={inputCls} value={v} placeholder={placeholder} onChange={(e) => setAt(i, e.target.value)} />
            <button type="button" onClick={() => removeAt(i)} className="rounded-lg border border-slate-200 px-3 text-sm text-red-500 hover:bg-red-50" aria-label="Remove">✕</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...items, ""])} className="mt-2 text-sm font-semibold text-brand">{addLabel}</button>
    </div>
  );
}

/** Generic repeater for a list of objects: renders each item and supports add/remove/reorder. */
export function Repeater<T>({
  items,
  onChange,
  newItem,
  itemLabel,
  addLabel = "+ Add item",
  render,
}: {
  items: T[];
  onChange: (next: T[]) => void;
  newItem: () => T;
  itemLabel?: (item: T, i: number) => string;
  addLabel?: string;
  render: (item: T, set: (next: T) => void) => ReactNode;
}) {
  const setAt = (i: number, v: T) => onChange(items.map((x, j) => (j === i ? v : x)));
  const removeAt = (i: number) => onChange(items.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = items.slice();
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <strong className="text-sm text-slate-600">{itemLabel ? itemLabel(item, i) : `Item ${i + 1}`}</strong>
            <div className="flex items-center gap-1 text-slate-400">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded px-1.5 hover:bg-slate-100 disabled:opacity-30" aria-label="Move up">↑</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="rounded px-1.5 hover:bg-slate-100 disabled:opacity-30" aria-label="Move down">↓</button>
              <button type="button" onClick={() => removeAt(i)} className="rounded px-2 text-xs text-red-500 hover:bg-red-50">Remove</button>
            </div>
          </div>
          {render(item, (next) => setAt(i, next))}
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, newItem()])} className="text-sm font-semibold text-brand">{addLabel}</button>
    </div>
  );
}
