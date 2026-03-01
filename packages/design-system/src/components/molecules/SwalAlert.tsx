"use client";

import { useState } from "react";
import { AlertTone } from "../../types";

export function SwalAlert({
  tone = "info",
  title,
  message,
}: {
  tone?: AlertTone;
  title: string;
  message: string;
}) {
  const [open, setOpen] = useState(true);

  if (!open) {
    return null;
  }

  return (
    <div className={`ds-alert ds-alert-${tone}`} role="alert">
      <div>
        <h4 className="ds-title-sm ds-mb-1">{title}</h4>
        <p>{message}</p>
      </div>
      <button className="ds-btn ds-btn-ghost" onClick={() => setOpen(false)}>
        Dismiss
      </button>
    </div>
  );
}