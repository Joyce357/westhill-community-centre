"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal ${isOpen ? "open" : ""}`}
      id="details-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title-elt"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-content" ref={modalRef}>
        <button className="modal-close" aria-label="Close modal" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <h3 className="modal-title" id="modal-title-elt">
          {title}
        </h3>
        <div className="modal-body" id="modal-body-elt">
          {children}
        </div>
      </div>
    </div>
  );
}
