import { Shield, Award, MapPin, Clock, Zap } from "lucide-react";

const ITEMS = [
  { icon: Shield, text: "A.M. Best A+ Carriers" },
  { icon: Award, text: "Licensed Since 2005" },
  { icon: MapPin, text: "All 50 States" },
  { icon: Clock, text: "Same-Day Quotes" },
  { icon: Zap, text: "UTV & SSV Specialists" },
];

export function TrustBar() {
  return (
    <section className="bg-panel border-y border-line py-4">
      <div className="container-xl">
        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10">
          {ITEMS.map(({ icon: Icon, text }, i) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-brand flex-shrink-0" />
              <span className="font-body text-xs sm:text-sm font-bold text-ink-soft whitespace-nowrap uppercase tracking-[0.12em]">
                {text}
              </span>
              {i < ITEMS.length - 1 && (
                <span className="hidden md:block w-1 h-1 rounded-full bg-line ml-5" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
