import type { Config } from "tailwindcss";

/**
 * SSV INSURANCE — Trail Adventure design system (Worker B/A, CCA batch).
 *
 * Brand direction: deep outdoor trail green (Sonoran desert / off-road terrain),
 * warm amber CTA (pops hard against green), warm off-white canvas.
 * "UTV and side-by-side insurance for sport builds — trustworthy, outdoorsy, expert."
 *
 * Two layers:
 *  1. CCA foundation tokens (shared across every batch site) + SSV niche signature
 *     (deep trail green brand ramp). Used by the premium section components.
 *  2. LEGACY ALIASES (forest-green / ember-orange / warm-white / bark / timber /
 *     muted / border) mapped onto the new palette so any existing page/component
 *     file that still uses the framing template class names re-themes automatically
 *     WITHOUT needing edits — keeps C-owned files safe during parallel work.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── CCA SHARED FOUNDATION (identical across every batch site) ────────
        canvas: "#FBF8F3",   // page background — warm off-white
        card: "#FFFFFF",      // elevated card surface
        panel: "#F3EEE6",     // recessed surface (FAQ rows, sub-panels)
        ink: "#16201C",       // primary text — warm near-black
        "ink-soft": "#3A4540", // secondary heading text
        muted: "#5E6862",     // body / secondary text
        line: "#E7DFD3",      // borders (warm)
        "line-soft": "#F0EAE0", // hairline dividers

        // ── CTA: amber (conversion accent — shared across all sites) ─────────
        cta: {
          DEFAULT: "#E8821A",
          dark: "#C2690B",
          soft: "#FCE7CF",
        },

        // ── BRAND: deep trail green (SSV niche signature) ────────────────────
        // Evokes Sonoran desert trails, off-road terrain, PNW forest riding —
        // the natural habitat of Polaris RZR, Can-Am Maverick, Yamaha YXZ owners.
        // Amber CTA pops hard against this green (complementary contrast).
        brand: {
          DEFAULT: "#1A4B2E",
          bright: "#2E7A4C",  // lighter stop for gradients / glow
          ink: "#0B2215",     // deepest — footer / stat dark sections
          50:  "#E8F5ED",
          100: "#C5E4CE",
          200: "#93C9A4",
          300: "#60AD7B",
          400: "#3E9264",
          500: "#2E7A4C",     // bright
          600: "#226038",
          700: "#1A4B2E",     // DEFAULT
          800: "#113020",
          900: "#0B2215",     // ink
        },

        // ── LEGACY ALIASES (framing template → trail green) ─────────────────
        // Kept so any file still using the old class names renders correctly.
        "forest-green": {
          DEFAULT: "#1A4B2E",  // → brand trail green
          dark: "#113020",
          50: "#E8F5ED",
          light: "#2E7A4C",
        },
        "ember-orange": {
          DEFAULT: "#E8821A",  // → cta amber
          dark: "#C2690B",
          light: "#F0943A",
        },
        "warm-white": "#FBF8F3", // → canvas
        bark: {
          DEFAULT: "#16201C",  // → ink
          light: "#3A4540",
        },
        timber: {
          DEFAULT: "#3A4540",  // → ink-soft
          light: "#5E6862",
        },
        border: "#E7DFD3",      // → line
      },

      fontFamily: {
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },

      boxShadow: {
        soft:       "0 1px 2px rgba(22,32,28,.04)",
        card:       "0 1px 2px rgba(22,32,28,.04), 0 10px 30px -12px rgba(22,32,28,.12)",
        "card-hover": "0 4px 8px rgba(22,32,28,.06), 0 24px 48px -16px rgba(26,75,46,.20)",
        cta:        "0 12px 28px -8px rgba(232,130,26,.45)",
        float:      "0 24px 64px -24px rgba(22,32,28,.30)",
      },
    },
  },
  plugins: [],
};
export default config;
