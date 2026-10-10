import Link from "next/link";
import { SITE, SERVICES, NAV_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-ink text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-900 to-brand-ink" />
      <div className="absolute top-0 inset-x-0 border-t border-brand-bright/20" />
      <div className="absolute inset-0 bg-grid-dark" />

      <div className="relative container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand to-brand-bright flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">SI</span>
              </div>
              <span className="font-heading font-extrabold text-white text-lg">
                SSV<span className="text-cta">Insurance</span>
              </span>
            </div>
            <p className="font-body text-sm text-white/70 leading-relaxed mb-5">
              Specialty insurance for sport side-by-sides and UTVs. Agreed value, accessories
              coverage, and competition options. Licensed in all 50 states since {SITE.founded}.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-wider">Coverage</h3>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="font-body text-sm text-white/60 hover:text-cta transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/quote" className="font-body text-sm text-cta hover:text-cta-soft transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-wider">Get Covered</h3>
            <p className="font-body text-sm text-white/60 mb-4 leading-relaxed">
              Same-day quotes for sport UTVs and side-by-sides. Fill out our quick quote form to get started.
            </p>
            <Link
              href="/quote"
              className="block w-full bg-cta text-white text-center px-4 py-3 rounded-xl font-body font-bold text-sm shadow-cta hover:bg-cta-dark transition-colors mb-3"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} {SITE.name} · A Contractors Choice Agency Brand · NPN #{SITE.npn} · Licensed in all 50 states. Insurance products not available in all states.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-body text-xs text-white/40 hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="font-body text-xs text-white/40 hover:text-white/60 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
