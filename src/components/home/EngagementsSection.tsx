import { Leaf, BadgeCheck, Briefcase } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const engagements = [
  {
    icon: Leaf,
    title: 'Véhicule hybride : un transport plus écoresponsable',
    description:
      'Voyagez à bord d’un véhicule hybride moderne, confortable et respectueux de l’environnement. Grâce à une consommation de carburant optimisée et des émissions réduites, profitez d’un trajet agréable tout en privilégiant une mobilité plus responsable.',
  },
  {
    icon: BadgeCheck,
    title: 'Chauffeur artisan taxi français',
    description:
      'Faites confiance à un chauffeur artisan taxi français, indépendant et expérimenté, qui met son savoir-faire au service de votre satisfaction. Ponctualité, discrétion, sécurité et accueil personnalisé sont au cœur de chaque trajet.',
  },
  {
    icon: Briefcase,
    title: 'Taxi G7 : un service Plus dédié aux professionnels',
    description:
      'Bénéficiez de l’expertise d’un chauffeur affilié au réseau G7, proposant un service Plus adapté aux exigences des professionnels. Déplacements d’affaires, transferts vers les gares et aéroports, rendez-vous clients : profitez d’un transport fiable, confortable et soigné, avec une attention particulière portée à votre ponctualité et à votre tranquillité.',
  },
];

export function EngagementsSection() {
  return (
    <section className="bg-ink-900 py-20 text-white sm:py-24">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Notre engagement"
          title="Un service de taxi alliant confort, écologie et professionnalisme"
          description="Découvrez un service de transport qui associe engagement environnemental, savoir-faire français et prestations haut de gamme pour tous vos déplacements personnels et professionnels."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {engagements.map(({ icon: EngagementIcon, title, description }, index) => (
            <Reveal key={title} delay={index * 90}>
              <div className="flex h-full flex-col rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.03] p-7 transition-colors duration-200 hover:border-champagne/40">
                <span className="inline-grid h-12 w-12 place-items-center rounded-full bg-champagne/15 text-champagne">
                  <EngagementIcon className="h-6 w-6" aria-hidden strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-serif text-xl leading-snug text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
