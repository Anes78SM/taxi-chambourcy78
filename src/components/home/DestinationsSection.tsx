import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { locations } from '@/data/locations';

/**
 * Trajets mis en avant — liens internes vers des pages qui existent réellement
 * (zones / services). Les pages Paris / La Défense dédiées n'existant pas,
 * ces trajets pointent vers la page zone « Paris Ouest ».
 */
const featuredRoutes = [
  {
    title: 'Saint-Germain-en-Laye',
    description: 'Centre-ville, gare RER A et lieux de rendez-vous, à toute heure de la journée.',
    href: '/zones/taxi-saint-germain-en-laye',
  },
  {
    title: 'Poissy',
    description: 'Gare (RER A et Transilien), zones d’activité, hôpital et destinations locales.',
    href: '/zones/taxi-poissy',
  },
  {
    title: 'Paris & La Défense',
    description: 'Déplacements professionnels ou privés ; réservation conseillée aux heures de pointe.',
    href: '/zones/taxi-paris-ouest',
  },
  {
    title: 'Aéroports de Paris',
    description: 'Roissy-CDG, Orly et Le Bourget, à l’horaire adapté à votre vol et vos bagages.',
    href: '/services/transfert-aeroport',
  },
];

export function DestinationsSection() {
  return (
    <section id="destinations" className="scroll-mt-24 bg-[#f7f4ef] py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Destinations & zones"
          title="Trajets populaires depuis Chambourcy"
          description="Au départ de Chambourcy, nous couvrons tout l’Ouest parisien et l’Île-de-France. Ainsi, nous desservons les gares, les aéroports, Paris et La Défense."
        />

        {/* Trajets mis en avant (avec liens internes) */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredRoutes.map((route, index) => (
            <Reveal key={route.title} delay={(index % 4) * 70}>
              <Link
                href={route.href}
                className="group flex h-full flex-col justify-between gap-5 rounded-[var(--radius)] border border-ink-900/10 bg-white p-6 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-champagne hover:shadow-card"
              >
                <div>
                  <h3 className="font-serif text-lg leading-snug text-ink-900">
                    Taxi Chambourcy&nbsp;– {route.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-800/70">
                    {route.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-champagne-dark">
                  Voir le trajet
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Toutes les communes desservies */}
        <div className="mt-16">
          <h3 className="font-serif text-xl text-ink-900">
            Taxi à Chambourcy et dans les communes voisines
          </h3>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-800/70">
            Nous intervenons à Chambourcy, mais aussi dans les communes proches : Orgeval, Poissy,
            Saint-Germain-en-Laye, Aigremont, Fourqueux ou Mareil-Marly. Par ailleurs, nous
            assurons les départs vers les gares, les aéroports et Paris. Votre commune n’apparaît
            pas dans la liste ? Contactez-nous pour confirmation.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </Container>
    </section>
  );
}
