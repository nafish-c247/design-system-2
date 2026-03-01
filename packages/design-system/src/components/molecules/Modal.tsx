import { ReactNode } from "react";
import { Button } from "../atoms/Button";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="ds-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="ds-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="ds-modal-header ds-flex ds-align-center ds-justify-between">
          <h3 className="ds-title-sm">{title}</h3>
          <button className="ds-btn ds-btn-ghost" onClick={onClose}>
            Close
          </button>
        </header>
        <div className="ds-modal-body">{children}</div>
        <footer className="ds-modal-footer">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Save</Button>
        </footer>
      </div>
    </div>
  );
}