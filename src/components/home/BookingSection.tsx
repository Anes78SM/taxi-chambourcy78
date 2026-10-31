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

export function BookingSection() {
  return (
    <section id="reservation" className="scroll-mt-24 bg-[#f7f4ef] py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Réservation"
              title="Réservez votre trajet"
              description="Une prise en charge simple et rapide, sur demande. Transmettez votre trajet : nous revenons vers vous pour confirmer les modalités et le tarif."
            />
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
