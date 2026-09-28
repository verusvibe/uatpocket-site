"use client";
import { sitePath } from "@/lib/urls";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./site";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) nav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const dismissOutside = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !nav.current?.contains(target) &&
        !button.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [open]);
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <button
          ref={button}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          ref={nav}
          id="primary-nav"
          aria-label="Main navigation"
          className={open ? "nav open" : "nav"}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              button.current?.focus();
            }
          }}
          onBlur={(e) => {
            if (
              open &&
              // Safari touch blurs the focused link with no next focus target
              // before click. Keep the menu mounted until that click navigates.
              e.relatedTarget !== null &&
              !e.currentTarget.contains(e.relatedTarget) &&
              e.relatedTarget !== button.current
            )
              setOpen(false);
          }}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <a href={sitePath("/#product")}>Product</a>
          <a href={sitePath("/#workflow")}>How It Works</a>
          <a href={sitePath("/#teams")}>For Teams</a>
          <a href={sitePath("/product")} aria-label="View Product One-Pager">
            One-Pager
          </a>
          <a href={sitePath("/support")}>Support</a>
          <a className="privacy-link" href={sitePath("/privacy")}>
            Privacy
          </a>
          <a className="button small" href={sitePath("/#early-access")}>
            Request Early Access
          </a>
        </nav>
      </div>
    </header>
  );
}
