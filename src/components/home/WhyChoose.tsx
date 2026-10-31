import { UserRound, Gem, Clock, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const pillars = [
  {
    icon: UserRound,
    title: 'Accueil personnalisé',
    description: 'Anes vous accueille et adapte chaque trajet à vos préférences.',
  },
  {
    icon: Gem,
    title: 'Confort et discrétion',
    description: 'Véhicule BMW spacieux, bouteille d’eau offerte et trajets discrets, pour voyager au calme.',
  },
  {
    icon: Clock,
    title: 'Organisation soignée',
    description: 'Réservez à l’avance : votre chauffeur vous attend à l’heure, bagages compris.',
  },
  {
    icon: MapPin,
    title: 'Connaissance locale',
    description: 'Chambourcy, Paris Ouest et l’ensemble de l’Île-de-France.',
  },
];

export function WhyChoose() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Pourquoi nous choisir"
          title="Une exigence constante, du premier contact à destination"
        />
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: PillarIcon, title, description }, index) => (
            <Reveal key={title} delay={index * 80}>
              <div className="border-t border-ink-900/15 pt-6">
                <PillarIcon className="h-7 w-7 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-xl text-ink-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-800/70">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
