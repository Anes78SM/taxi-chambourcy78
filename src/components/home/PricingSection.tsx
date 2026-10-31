import { Calculator, ReceiptText, Info } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import {
  pricingYear,
  pricingHighlights,
  pricingRows,
  pricingComposition,
  pricingSource,
} from '@/data/pricing';

export function PricingSection({ city = 'Chambourcy' }: { city?: string }) {
  return (
    <section id="tarifs" className="scroll-mt-24 bg-cream py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Tarifs"
          title={`Tarif taxi à ${city} en ${pricingYear}`}
          description="Anes applique les tarifs réglementés des taxis des Yvelines. Le prix combine une prise en charge, un tarif kilométrique (A, B, C ou D selon le jour, l’heure et le retour en charge ou à vide) et, parfois, un tarif d’attente. Le minimum de course est de 8 €. Au final, le taximètre affiche le montant exact."
        />

        {/* Chiffres clés */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {pricingHighlights.map((item, index) => (
            <Reveal key={item.label} delay={index * 80}>
              <div className="rounded-[var(--radius)] border border-ink-900/10 bg-white p-6 text-center shadow-sm">
                <p className="font-serif text-3xl text-ink-900">{item.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-800/55">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          {/* Grille tarifaire */}
          <Reveal>
            <div className="overflow-hidden rounded-[var(--radius)] border border-ink-900/10 bg-white shadow-card">
              <div className="flex items-center gap-2.5 border-b border-ink-900/10 bg-ink-900 px-6 py-4">
                <ReceiptText className="h-5 w-5 text-champagne" aria-hidden strokeWidth={1.5} />
                <h3 className="font-serif text-lg text-white">
                  Grille tarifaire {pricingYear} (TTC)
                </h3>
              </div>
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">
                  Tarifs réglementés des taxis des Yvelines pour {pricingYear}
                </caption>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-ink-900/8 last:border-0 even:bg-cream/50"
                    >
                      <th scope="row" className="px-6 py-3.5 text-left font-normal text-ink-800/85">
                        {row.label}
                      </th>
                      <td className="whitespace-nowrap px-6 py-3.5 text-right font-semibold text-ink-900">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-ink-800/55">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>
                {pricingSource}{' '}
                <a
                  href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053228231"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="font-medium text-champagne-dark underline underline-offset-2 hover:text-ink-900"
                >
                  Consulter les tarifs officiels
                </a>
                .
              </span>
            </p>
          </Reveal>

          {/* Explications */}
          <div className="space-y-6">
            <Reveal delay={80}>
              <div className="rounded-[var(--radius)] border border-ink-900/10 bg-white p-6">
                <ReceiptText className="h-6 w-6 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-lg text-ink-900">
                  Comment se compose une course ?
                </h3>
                <dl className="mt-4 space-y-4">
                  {pricingComposition.map((item) => (
                    <div key={item.label} className="border-l-2 border-champagne pl-4">
                      <dt className="text-sm font-semibold text-ink-900">{item.label}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink-800/70">{item.detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="rounded-[var(--radius)] border border-champagne/40 bg-champagne/10 p-6">
                <Calculator className="h-6 w-6 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-lg text-ink-900">Obtenir une estimation</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-800/70">
                  Indiquez votre adresse, votre destination et votre horaire. Nous vous communiquons
                  alors une fourchette indicative. Le taximètre fixe toutefois le prix définitif.
                </p>
                <Button href="#reservation" size="sm" className="mt-5">
                  Demander une estimation
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
