"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    // Return focus to the element that opened the dialog so keyboard users
    // don't get dropped back at the top of the page on close.
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      // Keep Tab cycles inside the dialog; background content is inert
      // for keyboard users while the dialog is open.
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const openerTimeout = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    }, 0);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(openerTimeout);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 ${className}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85" />
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-10 text-xs font-bold tracking-[0.2em] uppercase text-neutral-50 hover:opacity-75 font-mono"
        aria-label="Close"
      >
        [×]
      </button>
      <div
        className="relative max-w-[92vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
