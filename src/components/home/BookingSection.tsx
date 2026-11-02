import { Plane, Briefcase, CalendarClock, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BookingForm } from '@/components/booking/BookingForm';

const types = [
  { icon: Plane, label: 'Transferts aéroports' },
  { icon: Briefcase, label: 'Déplacements professionnels' },
  { icon: CalendarClock, label: 'Mise à disposition' },
  { icon: Sparkles, label: 'Trajets privés' },
];

export function BookingSection({ city = 'Chambourcy' }: { city?: string }) {
  const description =
    city === 'Chambourcy'
      ? 'Réserver un taxi à Chambourcy (78) ne prend que quelques minutes. Choisissez une course immédiate ou un départ programmé : nous venons vous chercher à l’adresse de votre choix, que ce soit votre domicile, votre bureau, un hôtel, une clinique ou un lieu de rendez-vous. Notre service couvre Chambourcy et les communes voisines : Orgeval, Poissy, Saint-Germain-en-Laye, Aigremont, Fourqueux et Mareil-Marly.'
      : `Réserver un taxi à ${city} (78) ne prend que quelques minutes. Choisissez une course immédiate ou un départ programmé : nous venons vous chercher à l’adresse de votre choix, que ce soit votre domicile, votre bureau, un hôtel, une clinique ou un lieu de rendez-vous. Notre service couvre ${city} et les communes voisines de l’Ouest parisien.`;

  return (
    <section className="bg-[#f7f4ef] py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Réservation"
              title={`Réserver un taxi à ${city} (78)`}
              description={description}
              stacked
            />
            <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-800/70">
              Vous recevez une estimation du prix dès la réservation : les tarifs sont réglementés
              dans les Yvelines et le taximètre affiche le montant exact. Une confirmation vous est
              ensuite envoyée par e-mail avant le départ.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {types.map(({ icon: TypeIcon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-ink-800/80">
                  <TypeIcon className="h-5 w-5 shrink-0 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div id="reservation" className="scroll-mt-28">
            <BookingForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
