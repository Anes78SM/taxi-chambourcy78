import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { locations } from '@/data/locations';

export function DestinationsSection() {
  return (
    <section id="destinations" className="scroll-mt-24 bg-[#f7f4ef] py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Destinations & zones"
          title="Un service de proximité sur tout l’Ouest parisien"
          description="Au départ de Chambourcy, nous desservons les communes voisines et l’ensemble de l’Île-de-France."
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => (
            <Reveal key={location.slug} delay={(index % 3) * 70}>
              <Link
                href={`/zones/${location.slug}`}
                className="group flex items-center justify-between gap-4 rounded-[var(--radius)] border border-ink-900/10 bg-white px-5 py-4 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-champagne hover:shadow-card"
              >
                <span>
                  <span className="block font-serif text-lg text-ink-900">{location.name}</span>
                  {location.postalCode && (
                    <span className="text-xs text-ink-900/45">{location.postalCode}</span>
                  )}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-ink-900/30 transition-colors group-hover:text-champagne-dark"
                  aria-hidden
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
