import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import type { FaqItem } from '@/types';

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="scroll-mt-24 bg-cream py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Tout savoir avant de réserver"
            description="Une question sur nos services ou votre trajet ? Les réponses aux demandes les plus courantes."
          />
          <FAQAccordion items={items} />
        </div>
      </Container>
    </section>
  );
}
