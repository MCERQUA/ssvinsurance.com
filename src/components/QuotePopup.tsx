"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Brand colour is inlined so this renders correctly whatever token vocabulary the site uses.
const BRAND = "#1a4b2e";
const PHONE = "844-967-5247";
const PHONE_HREF = "tel:+18449675247";
const QUOTE_ROUTE = "/quote";

export function FloatingQuoteBar() {
  const barRef = useRef<HTMLDivElement>(null);

  // Reserve the bar's own height at the end of the page so no in-flow control can sit under it.
  // Measured rather than hard-coded: the bar wraps to two lines on narrow viewports.
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const apply = () => {
      document.body.style.paddingBottom =
        `calc(${el.offsetHeight}px + env(safe-area-inset-bottom, 0px))`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
      document.body.style.paddingBottom = "";
    };
  }, []);
  return (
    <div ref={barRef} style={{ pointerEvents: "none", position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 9998, background: "#ffffff",
                  borderTop: `3px solid ${BRAND}`, boxShadow: "0 -4px 18px rgba(0,0,0,0.14)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 16px", display: "flex", flexWrap: "wrap",
                    alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <p style={{ margin: 0, fontSize: 14, color: "#1f2937", lineHeight: 1.45 }}>
          <strong>Our agents are working on quotes now.</strong>{" "}Submit online to get in the queue faster — or call{" "}
          <a href={PHONE_HREF} style={{ pointerEvents: "auto", color: BRAND, fontWeight: 700, whiteSpace: "nowrap" }}>{PHONE}</a>.
        </p>
        <Link href={QUOTE_ROUTE}
          style={{ pointerEvents: "auto", background: BRAND, color: "#fff", padding: "10px 20px", borderRadius: 999,
                   fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", textDecoration: "none" }}>
          Request a Quote &rarr;
        </Link>
      </div>
    </div>
  );
}

export function QuotePopup() {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { if (sessionStorage.getItem("quote-popup-dismissed")) return; } catch { return; }
    const t = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    try { sessionStorage.setItem("quote-popup-dismissed", "1"); } catch {}
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;
    const sel = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const items = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>(sel) ?? []);
    items()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { dismiss(); return; }
      if (e.key !== "Tab") return;
      const f = items(); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="quote-popup-title"
         style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center",
                  justifyContent: "center", padding: 16 }}>
      <div onClick={dismiss} aria-hidden="true"
           style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
      <div ref={panelRef} style={{ position: "relative", width: "100%", maxWidth: 440, background: "#fff",
                                   borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
        <div style={{ background: BRAND, padding: "18px 22px" }}>
          <button onClick={dismiss} aria-label="Close"
                  style={{ position: "absolute", top: 12, right: 12, background: "transparent", border: 0,
                           color: "rgba(255,255,255,0.85)", fontSize: 22, lineHeight: 1, cursor: "pointer" }}>
            &times;
          </button>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                      color: "rgba(255,255,255,0.85)" }}>A note from our team</p>
          <h2 id="quote-popup-title" style={{ margin: "6px 0 0", fontSize: 20, lineHeight: 1.25, color: "#fff", fontWeight: 800 }}>
            Our agents are actively working on quotes right now
          </h2>
        </div>
        <div style={{ padding: "20px 22px 22px" }}>
          <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6, color: "#374151" }}>By submitting your information online, our AI software gathers everything we need to prepare your quote accurately — so our agents can work more efficiently and get back to you faster.</p>
          <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6, color: "#374151" }}>
            If you'd prefer to speak with someone please call us at{" "}
            <a href={PHONE_HREF} style={{ pointerEvents: "auto", color: BRAND, fontWeight: 700, whiteSpace: "nowrap" }}>{PHONE}</a>
          </p>
          <p style={{ margin: "0 0 18px", fontSize: 14, lineHeight: 1.6, color: "#374151" }}>
            Please submit whatever you can &mdash; every detail you give us saves both of us time.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href={QUOTE_ROUTE} onClick={dismiss}
              style={{ flex: "1 1 180px", textAlign: "center", background: BRAND, color: "#fff",
                       padding: "12px 18px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Submit a Quote Request
            </Link>
            <button onClick={dismiss}
              style={{ flex: "1 1 120px", background: "#fff", color: "#374151", border: "1px solid #d1d5db",
                       padding: "12px 18px", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
