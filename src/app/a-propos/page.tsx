import type { Metadata } from 'next';
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
          <div className="prose-content mx-auto max-w-prose">
            <h2>Notre approche</h2>
            <p>
              {siteConfig.name} propose un service de taxi premium au départ de Chambourcy et des
              communes voisines. Notre priorité est simple : vous offrir un transport soigné,
              ponctuel et discret, que ce soit pour un transfert aéroport, un déplacement
              professionnel ou un trajet privé.
            </p>
            <p>
              Nous privilégions une relation directe et un échange clair avant chaque trajet, afin
              que les modalités soient toujours comprises et confirmées. Aucune réservation n’est
              validée automatiquement : vous êtes recontacté pour valider les détails de votre
              demande.
            </p>

            <h2>Zones desservies</h2>
            <p>
              Notre service rayonne depuis Chambourcy ({siteConfig.address.postalCode}) sur{' '}
              {siteConfig.serviceArea} : Saint-Germain-en-Laye, Poissy, Orgeval, Le Pecq, Le
              Vésinet, Marly-le-Roi, Maisons-Laffitte et les communes voisines, vers Paris et les
              principaux aéroports.
            </p>
          </div>

          {/* Bloc informations à compléter — E-E-A-T */}
          <div className="mx-auto mt-14 max-w-prose rounded-[var(--radius-lg)] border border-dashed border-ink-900/25 bg-white/60 p-6">
            <p className="eyebrow text-champagne-dark">Informations à compléter</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-800/70">
              Pour renforcer la confiance et respecter les bonnes pratiques éditoriales, cette page
              doit être complétée, avant publication, avec les informations réelles de l’entreprise :
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-800/75">
              <li>• Identité de l’exploitant et expérience réelle</li>
              <li>• Présentation du véhicule réellement exploité (avec photos authentiques)</li>
              <li>• Engagements de service vérifiables</li>
              <li>• Coordonnées professionnelles et informations légales (voir mentions légales)</li>
            </ul>
            <p className="mt-4 text-xs text-ink-800/55">
              Ces éléments ne doivent jamais être inventés : seules des informations vérifiées
              doivent figurer sur le site.
            </p>
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
