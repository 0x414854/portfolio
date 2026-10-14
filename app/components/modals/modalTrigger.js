"use client";

export default function ModalTrigger({ modalId, className, children }) {
  return (
    <button
      type="button"
      className={className}
      data-modal={modalId}
      onClick={() => {
        document.dispatchEvent(
          new CustomEvent("open-service-modal", {
            detail: modalId,
          }),
        );
      }}
    >
      {children}
    </button>
  );
}
