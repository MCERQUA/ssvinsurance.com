"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-soft border-b border-line"
          : "bg-canvas/90 backdrop-blur-md"
      }`}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand to-brand-bright flex items-center justify-center shadow-soft">
              <span className="text-white font-heading font-bold text-sm">SI</span>
            </div>
            <span className="font-heading font-extrabold text-ink text-lg leading-tight">
              SSV<span className="text-brand">Insurance</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-bold text-ink hover:text-brand transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/quote"
              className="bg-cta text-white px-5 py-2 rounded-full font-body text-sm font-bold shadow-cta hover:bg-cta-dark hover:-translate-y-0.5 transition-all"
            >
              Get a Quote
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-ink cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-card border-t border-line px-4 py-4 space-y-3 shadow-card">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-body font-bold text-ink hover:text-brand py-1 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="block bg-cta text-white text-center px-4 py-2.5 rounded-xl font-body font-bold shadow-cta"
            onClick={() => setOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
