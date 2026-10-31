import { Calculator, ShieldCheck, Info } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import {
  pricingYear,
  pricingHighlights,
  pricingComposition,
  nationalCeilings2026,
  pricingSource,
} from '@/data/pricing';

export function PricingSection({ city = 'Chambourcy' }: { city?: string }) {
  return (
    <section id="tarifs" className="scroll-mt-24 bg-cream py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Tarifs"
          title={`Tarif taxi à ${city} en ${pricingYear}`}
          description="Une réglementation encadre le prix d’un taxi, que le taximètre affiche en direct. Concrètement, il additionne trois éléments : une prise en charge, un tarif kilométrique et, parfois, un tarif d’attente. Ce tarif kilométrique varie selon le jour, l’heure et le retour du taxi (en charge ou à vide)."
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

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* Composition d'une course */}
          <Reveal>
            <div className="rounded-[var(--radius)] border border-ink-900/10 bg-white p-7 shadow-card">
              <h3 className="font-serif text-xl text-ink-900">
                Comment se compose une course ?
              </h3>
              <dl className="mt-6 space-y-5">
                {pricingComposition.map((item) => (
                  <div
                    key={item.label}
                    className="border-l-2 border-champagne pl-4"
                  >
                    <dt className="font-semibold text-ink-900">{item.label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink-800/70">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Cadre national (plafonds vérifiés) */}
              <div className="mt-8 rounded-[var(--radius)] border border-ink-900/10 bg-cream/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-800/55">
                  Cadre national {pricingYear} — plafonds (maximums)
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
                  {nationalCeilings2026.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-3">
                      <dt className="text-ink-800/70">{row.label}</dt>
                      <dd className="whitespace-nowrap font-semibold text-ink-900">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-800/55">
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
            </div>
          </Reveal>

          {/* Explications */}
          <div className="space-y-6">
            <Reveal delay={80}>
              <div className="rounded-[var(--radius)] border border-ink-900/10 bg-white p-6">
                <ShieldCheck className="h-6 w-6 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-lg text-ink-900">Un prix encadré</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-800/70">
                  Le taximètre additionne la prise en charge, la distance et le temps d’attente.
                  Toutefois, il reste dans la limite des tarifs réglementés. Par ailleurs, des
                  suppléments peuvent s’ajouter, par exemple pour les bagages encombrants.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="rounded-[var(--radius)] border border-champagne/40 bg-champagne/10 p-6">
                <Calculator className="h-6 w-6 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-lg text-ink-900">Obtenir une estimation</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-800/70">
                  Indiquez votre adresse, votre destination et votre horaire. Nous vous
                  communiquons alors une fourchette indicative. Le taximètre fixe toutefois le prix
                  définitif.
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
