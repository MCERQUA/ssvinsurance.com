import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";
import { FadeIn } from "@/components/animations/FadeIn";

const HIGHLIGHTS = [
  "Agreed value — no depreciation",
  "Licensed in all 50 states",
  "Same-day quotes & certificates",
];

export function Hero() {
  return (
    <section className="relative bg-canvas pt-28 pb-16 lg:pb-0 overflow-hidden">
      {/* Depth: soft trail-green bloom + faint ambient dots */}
      <div className="absolute top-0 right-0 w-[42rem] h-[42rem] rounded-full bg-brand/8 blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[34rem] h-[34rem] rounded-full bg-cta/6 blur-3xl pointer-events-none translate-y-1/3" />
      <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" />

      <div className="container-xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          <div className="py-6 lg:py-12">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full pl-2 pr-4 py-1.5 mb-6">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand text-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
                <span className="font-body text-sm font-bold text-brand">
                  UTV &amp; Side-by-Side Insurance Specialists
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="font-heading text-[2.6rem] leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl text-ink font-extrabold tracking-tight mb-6">
                Insurance for{" "}
                <span className="text-trail">Side-by-Sides</span>{" "}
                &amp; Sport UTVs
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="font-body text-lg sm:text-xl text-muted leading-relaxed mb-8 max-w-xl">
                Agreed-value coverage for Polaris RZR, Can-Am Maverick, Yamaha YXZ,
                and all sport builds — including aftermarket accessories, transport
                coverage, and competition use options your standard ATV policy won&rsquo;t touch.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3 mb-9">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 bg-cta text-white px-7 py-3.5 rounded-xl font-body font-bold text-base shadow-cta hover:bg-cta-dark hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2">
                {HIGHLIGHTS.map((h) => (
                  <div key={h} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand flex-shrink-0" />
                    <span className="font-body text-sm font-medium text-ink-soft">{h}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.1} direction="left" className="relative h-[500px] lg:h-[620px] rounded-3xl overflow-hidden shadow-float">
            <Image
              src="/images/hero-ssv.jpg"
              alt="Sport side-by-side UTV on desert trail"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent" />
            {/* Glass quote-teaser card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-card border border-white/60">
              <p className="font-body text-xs text-muted mb-1 uppercase tracking-wide font-bold">Most Popular Coverage</p>
              <p className="font-heading font-bold text-ink text-base mb-1">Agreed Value + Accessories Bundle</p>
              <p className="font-body text-sm text-brand font-bold">Starting from $400/year — same-day binding</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
