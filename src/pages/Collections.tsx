import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductArt from "@/components/store/ProductArt";
import { Eyebrow, NovaButton } from "@/components/store/primitives";
import { formatPrice, PRODUCTS } from "@/lib/catalog";

const COLLECTIONS = [
  {
    id: "orbit",
    index: "C-01",
    name: "Orbit",
    season: "FW26",
    blurb:
      "The movement study: Orbit Runner, the Halo sling and the pieces built around a life in motion. Nitrogen soles, magnetic hardware, one-piece knits.",
    slugs: ["orbit-runner-sneakers", "halo-ancillary-pack", "terra-merino-socks"],
  },
  {
    id: "storm",
    index: "C-02",
    name: "Storm",
    season: "FW26",
    blurb:
      "Weather as a design brief. The Aegis shell system and its supporting cast — sealed seams, matte faces and closures you can operate with gloves on.",
    slugs: ["aegis-01-shell-jacket", "meridian-merino-crew", "vector-cap"],
  },
  {
    id: "signal",
    index: "C-03",
    name: "Signal",
    season: "Carry-over",
    blurb:
      "Objects that glow, ring or hum — the technical line. Titanium that keeps time, graphite that throws light, and sound without visible wires.",
    slugs: ["core-indicator-watch", "beacon-ancillary-torch", "pulse-ancillary-speaker"],
  },
  {
    id: "atmos",
    index: "C-04",
    name: "Atmos",
    season: "Permanent",
    blurb:
      "The quiet interior line. Ceramics, scent and the small rituals of a well-tuned room — machined, poured and fired to last.",
    slugs: ["monolith-ceramic-mug", "field-ancillary-candle", "prism-foldable-sunglasses"],
  },
];

export default function Collections() {
  return (
    <main className="bg-background">
      <div className="bg-nova-radial border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <Eyebrow label="Collections" />
          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
            Four lines. One language.
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-7 text-muted-foreground">
            Every NOVA release belongs to a line — a standing idea we keep
            returning to, season after season.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-6 px-6 py-14">
        {COLLECTIONS.map((c, ci) => (
          <section
            key={c.id}
            className="overflow-hidden rounded-lg border border-white/10 bg-card card-sheen"
          >
            <div className={ci % 2 === 1 ? "lg:grid lg:grid-cols-2" : ""}>
              <div className={cn("p-8 md:p-12", ci % 2 === 1 && "lg:order-2")}>
                <div className="flex items-center gap-4">
                  <span className="font-label text-muted-foreground">{c.index}</span>
                  <span className="h-px w-8 bg-border" />
                  <span className="font-label text-electric">{c.season}</span>
                </div>
                <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {c.name}
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
                  {c.blurb}
                </p>
                <NovaButton asChild variant="secondary" className="mt-8">
                  <Link to={`/shop?category=${c.id === "storm" ? "clothing" : c.id === "orbit" ? "sneakers" : c.id === "signal" ? "tech" : "lifestyle"}`}>
                    Shop {c.name}
                    <ArrowRight className="size-4" />
                  </Link>
                </NovaButton>
              </div>
              <div
                className={cn(
                  "grid grid-cols-3 items-center gap-3 p-3 md:gap-4 md:p-5",
                  ci % 2 === 1 && "lg:order-1 lg:border-r lg:border-white/10",
                  ci % 2 === 0 && "lg:border-l lg:border-white/10",
                )}
              >
                {c.slugs.map((slug) => {
                  const p = PRODUCTS.find((x) => x.slug === slug);
                  if (!p) return null;
                  const off = p.discount ?? 0;
                  const discounted = off > 0;
                  return (
                    <Link
                      key={slug}
                      to={`/product/${slug}`}
                      className="group relative block overflow-hidden rounded-lg border border-white/10 bg-[#101016] shadow-[0_20px_44px_-24px_rgba(0,0,0,0.85)] transition-colors duration-300 hover:border-electric/40"
                    >
                      <div className="aspect-[3/4] transition-transform duration-700 group-hover:scale-[1.04]">
                        <ProductArt product={p} className="h-full w-full" />
                      </div>
                      {discounted && (
                        <span className="absolute top-2.5 left-2.5 rounded-full bg-electric px-2 py-0.5 font-label text-[9px] text-[#0B0B10]">
                          {off}% off
                        </span>
                      )}
                      {/* Bottom-up overlay giving each product its own context */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0B10] via-[#0B0B10]/70 to-transparent p-3 pt-12">
                        <p className="truncate text-xs font-medium text-white">{p.name}</p>
                        <div className="mt-1 flex items-baseline gap-2">
                          {discounted ? (
                            <>
                              <span className="text-xs font-semibold tabular-nums text-electric">
                                {formatPrice(p.price * (1 - off / 100))}
                              </span>
                              <span className="text-[10px] tabular-nums text-white/45 line-through">
                                {formatPrice(p.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-xs font-medium tabular-nums text-white/75">
                              {formatPrice(p.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

