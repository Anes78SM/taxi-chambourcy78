import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

type CTASectionProps = {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CTASection({
  title = 'Prêt à réserver votre trajet ?',
  description = 'Transmettez votre demande en quelques instants. Nous revenons vers vous pour confirmer les modalités de votre trajet.',
  primaryHref = '/#reservation',
  primaryLabel = 'Réserver votre trajet',
  secondaryHref = '/contact',
  secondaryLabel = 'Nous contacter',
}: CTASectionProps) {
  return (
    <section className="bg-ink-900 py-20 text-white sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-balance">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mist">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={primaryHref} size="lg">
              {primaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href={secondaryHref} variant="outline" size="lg">
              {secondaryLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
