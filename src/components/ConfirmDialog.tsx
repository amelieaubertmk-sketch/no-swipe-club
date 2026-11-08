import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
/** Native modal semantics include focus containment and Escape handling. */
export function ConfirmDialog({
  children,
  onCancel,
}: {
  children: ReactNode;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog
      className="modal"
      ref={ref}
      aria-labelledby="dialog-title"
      onCancel={onCancel}
    >
      {children}
    </dialog>
  );
}
