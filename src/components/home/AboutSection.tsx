import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function AboutSection() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-champagne-dark">À propos</p>
            <h2 className="mt-4 text-h2 text-ink-900">
              Un service de confiance à Chambourcy et ses environs
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-800/75">
              <p>
                Pour vos déplacements privés et professionnels, nous soignons d’abord la qualité
                de l’accueil. En effet, l’attention aux détails et la simplicité de réservation
                font toute la différence.
              </p>
              <p>
                Par ailleurs, nous partons de Chambourcy, Saint-Germain-en-Laye, Poissy et des
                communes voisines, vers Paris et les aéroports d’Île-de-France.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/a-propos" variant="dark">
                En savoir plus
              </Button>
              <Button href="/#reservation" variant="ghost">
                Organiser mon trajet →
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] shadow-card">
              <Image
                src="/images/BMW_bleu_aux_details_raffines.webp"
                alt="Taxi à Chambourcy : le break BMW bleu nuit — extérieur, habitacle, poste de conduite et coffre"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
