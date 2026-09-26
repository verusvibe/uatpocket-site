"use client";
import { Printer } from "lucide-react";
export function PrintButton() {
  return (
    <button
      className="button secondary print-button"
      onClick={() => window.print()}
    >
      <Printer size={17} aria-hidden="true" />
      Print / Save as PDF
    </button>
  );
}
