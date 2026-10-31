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
      ? 'Commander un taxi à Chambourcy (78) prend quelques minutes. D’abord, choisissez une course immédiate ou un départ programmé. Ensuite, nous organisons la prise en charge à l’adresse de votre choix : domicile, bureau, hôtel, clinique ou rendez-vous. Ce service couvre Chambourcy, mais aussi les communes voisines comme Orgeval, Poissy, Saint-Germain-en-Laye, Aigremont, Fourqueux ou Mareil-Marly.'
      : `Commander un taxi à ${city} (78) prend quelques minutes. D’abord, choisissez une course immédiate ou un départ programmé. Ensuite, nous organisons la prise en charge à l’adresse de votre choix : domicile, bureau, hôtel, clinique ou rendez-vous. Ce service couvre ${city} et les communes voisines de l’Ouest parisien.`;

  return (
    <section id="reservation" className="scroll-mt-24 bg-[#f7f4ef] py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Réservation"
              title={`Réserver un taxi à ${city} (78)`}
              description={description}
            />
            <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-800/70">
              De plus, nous vous communiquons une estimation du prix dès la réservation. En effet,
              les tarifs des taxis suivent une réglementation stricte dans les Yvelines. Le
              taximètre affiche donc le montant final. Enfin, vous recevez une confirmation par
              e-mail avant le départ.
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
          <BookingForm />
        </div>
      </Container>
    </section>
  );
}
