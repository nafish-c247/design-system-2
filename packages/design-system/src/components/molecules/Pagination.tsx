import { useMemo } from "react";

export function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  const pages = useMemo(() => Array.from({ length: total }, (_, idx) => idx + 1), [total]);

  return (
    <nav className="ds-pagination" aria-label="Pagination">
      <button onClick={() => onChange(Math.max(1, current - 1))} disabled={current === 1}>
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          aria-current={current === page ? "true" : undefined}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      <button onClick={() => onChange(Math.min(total, current + 1))} disabled={current === total}>
        Next
      </button>
    </nav>
  );
}