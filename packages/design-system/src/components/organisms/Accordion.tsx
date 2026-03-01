"use client";

import { useState } from "react";

export function Accordion({
  items,
}: {
  items: { title: string; content: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article className="ds-accordion-item" key={item.title}>
            <button
              className="ds-accordion-trigger"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              {item.title}
            </button>
            {isOpen && <div className="ds-accordion-panel">{item.content}</div>}
          </article>
        );
      })}
    </div>
  );
}