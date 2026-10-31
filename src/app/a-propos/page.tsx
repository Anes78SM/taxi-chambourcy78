import type { Metadata } from 'next';
import Image from 'next/image';
import { ShieldCheck, Gem, Clock, MapPin, UserRound } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { CTASection } from '@/components/home/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'À propos',
  description:
    `${siteConfig.name} : un service de transport premium à Chambourcy, pensé autour du confort, de la ponctualité et de la discrétion.`,
  path: '/a-propos',
});

const commitments = [
  { icon: UserRound, title: 'Accueil personnalisé', text: 'Une prise en charge adaptée à chaque trajet et à vos préférences.' },
  { icon: Gem, title: 'Confort et discrétion', text: 'Un service soigné, respectueux de votre confidentialité.' },
  { icon: Clock, title: 'Ponctualité', text: 'Une organisation anticipée pour aborder vos trajets sereinement.' },
  { icon: MapPin, title: 'Connaissance locale', text: 'Chambourcy, Paris Ouest et l’ensemble de l’Île-de-France.' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'À propos', path: '/a-propos' },
        ])}
      />
      <PageHero
        eyebrow="À propos"
        title="Un service de transport premium à Chambourcy"
        description="Nous mettons la qualité d’accueil, l’attention aux détails et la simplicité de réservation au cœur de chaque trajet."
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'À propos', path: '/a-propos' },
        ]}
      />

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <div className="prose-content max-w-none">
              <h2>Une reprise dans la continuité</h2>
              <p>
                {siteConfig.name} s’inscrit dans la continuité d’une activité de taxi reconnue à
                Chambourcy et dans les Yvelines, appréciée de longue date pour sa ponctualité, son
                sérieux et sa discrétion.
              </p>
              <p>
                Depuis <strong>septembre 2026</strong>, cette activité est reprise par{' '}
                <strong>Anes Smail</strong>, qui a racheté la licence de taxi de l’ancien
                propriétaire, parti à la retraite.
              </p>
              <p>
                Chauffeur de taxi indépendant depuis plus de quatre ans dans les Yvelines, Anes
                connaît parfaitement Chambourcy, l’Ouest parisien et les accès vers Paris et les
                aéroports. Il poursuit le service avec la même exigence : un transport premium,
                humain et fiable, du particulier au professionnel.
              </p>

              <h2>Notre approche</h2>
              <p>
                Que ce soit pour un transfert aéroport, un déplacement professionnel ou un trajet
                privé, notre priorité est simple : un transport soigné, ponctuel et discret. Nous
                privilégions une relation directe et un échange clair avant chaque trajet, afin que
                les modalités soient toujours comprises et confirmées — aucune réservation n’est
                validée automatiquement.
              </p>

              <h2>Zones desservies</h2>
              <p>
                Notre service rayonne depuis Chambourcy ({siteConfig.address.postalCode}) sur{' '}
                {siteConfig.serviceArea} : Saint-Germain-en-Laye, Poissy, Orgeval, Le Pecq, Le
                Vésinet, Marly-le-Roi, Maisons-Laffitte et les communes voisines, vers Paris et les
                principaux aéroports.
              </p>
            </div>

            <figure className="lg:sticky lg:top-28">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)] shadow-card">
                <Image
                  src="/images/hero/hero-chauffeur.webp"
                  alt="Anes Smail, chauffeur de taxi à Chambourcy, devant sa BMW taxi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[62%_center]"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-ink-800/65">
                Anes Smail, votre chauffeur de taxi à Chambourcy.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* Engagements */}
      <section className="bg-ink-900 py-20 text-white sm:py-24">
        <Container>
          <h2 className="text-h2">Nos engagements</h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map(({ icon: CommitIcon, title, text }) => (
              <div key={title} className="border-t border-white/15 pt-6">
                <CommitIcon className="h-7 w-7 text-champagne" aria-hidden strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-xl text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 flex items-center gap-2 text-xs text-mist">
            <ShieldCheck className="h-4 w-4 text-champagne" aria-hidden strokeWidth={1.5} />
            Nous n’affichons aucun avis, note ou garantie non vérifiés.
          </p>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
