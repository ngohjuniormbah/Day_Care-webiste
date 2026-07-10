"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const items = [
  { title: "Placement", text: "Located in a secure, gated apartment with essential facilities including a toilet, kitchen, and office." },
  { title: "Equipment", text: "Equipped with essential facilities including a clean toilet, functional kitchen, and dedicated office." },
  { title: "Space", text: "Spacious hall divided into sleeping and learning / play sections for comfort and focus." },
  { title: "Outside", text: "Large enclosed veranda and grass yard for extra activities and supervised outdoor play." },
];

export function DetailAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-4">
      {items.map((it, i) => {
        const isOpen = i === open;
        return (
          <div key={it.title} className="rounded-2xl bg-white p-5 shadow-card">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-start justify-between gap-4 text-left"
              aria-expanded={isOpen}
            >
              <div>
                <h4 className="font-bold text-ink">{it.title}</h4>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden text-sm text-ink-muted"
                    >
                      <span className="mt-1 block">{it.text}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <span className={`grid h-8 w-8 flex-none place-items-center rounded-full bg-brand-soft text-brand transition-transform ${isOpen ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
