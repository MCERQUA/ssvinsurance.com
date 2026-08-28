import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { FadeIn } from "@/components/animations/FadeIn";

export function CTABand() {
  return (
    <section className="relative overflow-hidden bg-brand section-pad-lg">
      {/* Layered dark depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand to-brand-ink" />
      <div className="absolute -top-32 -right-24 w-[40rem] h-[40rem] rounded-full bg-brand-bright/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-[40rem] h-[40rem] rounded-full bg-black/25 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dark" />

      <div className="relative container-xl text-center">
        <FadeIn>
          <p className="eyebrow text-brand-300 mb-4">Ready to Ride Protected?</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mb-5 max-w-3xl mx-auto">
            Get Your Side-by-Side Covered — Same-Day Quotes Available
          </h2>
          <p className="font-body text-white/80 text-lg mb-9 max-w-2xl mx-auto">
            Agreed value, full accessories coverage, and competition options for Polaris RZR,
            Can-Am Maverick, Yamaha YXZ, and more. Over 20 years protecting sport UTV owners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 bg-cta text-white px-8 py-4 rounded-xl font-body font-bold text-base shadow-cta hover:bg-cta-dark hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Get Your Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
