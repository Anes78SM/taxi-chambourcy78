import type { Metadata } from 'next';
import Image from 'next/image';
import { ShieldCheck, Gem, Clock, MapPin, UserRound, Landmark } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
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

const vehicleGallery = [
  { src: '/images/vehicule/profil-g7.webp', alt: 'Break BMW noir de profil, siglé G7 — taxi à Chambourcy' },
  { src: '/images/vehicule/avant.webp', alt: 'Break BMW noir, vue avant trois-quarts — taxi à Chambourcy' },
  { src: '/images/vehicule/interieur.webp', alt: 'Habitacle cuir clair de la BMW, portière ouverte — taxi à Chambourcy' },
  {
    src: '/images/vehicule/vehicule-sieges-enfants-arriere.webp',
    alt: 'Places arrière en cuir clair avec siège auto enfant et rehausseur installés — taxi familial à Chambourcy',
  },
  {
    src: '/images/vehicule/vehicule-siege-enfant.webp',
    alt: 'Siège auto enfant et rehausseur à bord du break BMW — taxi avec siège enfant à Chambourcy',
  },
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
                Depuis <strong>octobre 2026</strong>, cette activité est reprise par{' '}
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
                les modalités soient toujours comprises et confirmées : aucune réservation n’est
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
                  src="/images/hero/hero-chauffeur-portrait.webp"
                  alt="Anes Smail, chauffeur de taxi à Chambourcy, en costume devant sa BMW taxi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-ink-800/65">
                Anes Smail, votre chauffeur de taxi à Chambourcy.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* Le véhicule */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <Reveal>
            <p className="eyebrow text-champagne-dark">Le véhicule</p>
            <h2 className="mt-3 max-w-2xl text-h2 text-ink-900">
              Un break BMW spacieux, confortable et familial
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-800/75">
              Un break BMW récent et soigneusement entretenu : finitions premium, habitacle
              spacieux au cuir clair, toit panoramique et coffre généreux pour vos bagages et
              transferts aéroport. Pour voyager en famille, un siège auto enfant ou un rehausseur
              peut être installé sur demande.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vehicleGallery.map((photo, i) => (
              <Reveal key={photo.src} delay={i * 90}>
                <div className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] shadow-card">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
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
          <p className="mt-10 flex items-start gap-2.5 text-sm text-mist">
            <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-champagne" aria-hidden strokeWidth={1.5} />
            <span>
              Entreprise référencée à l’
              <a
                href={siteConfig.officialListing.mairieChambourcyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white underline underline-offset-2 hover:text-champagne"
              >
                annuaire officiel des entreprises de la Ville de Chambourcy
              </a>
              {' '}— une présence locale reconnue par la commune.
            </span>
          </p>
          <p className="mt-4 flex items-center gap-2 text-xs text-mist">
            <ShieldCheck className="h-4 w-4 text-champagne" aria-hidden strokeWidth={1.5} />
            Nous n’affichons aucun avis, note ou garantie non vérifiés.
          </p>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
