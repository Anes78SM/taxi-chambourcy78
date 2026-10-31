import { Phone, CalendarClock, Zap, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { siteConfig } from '@/config/site';

export function HowToBookSection({ city = 'Chambourcy' }: { city?: string }) {
  const prepare = [
    `L’adresse de départ à ${city}`,
    'La destination',
    'La date et l’heure souhaitées',
    'Le nombre de passagers et de bagages',
    'Vos besoins particuliers (siège enfant, animal…)',
  ];

  return (
    <section id="reserver" className="scroll-mt-24 bg-ink-900 py-20 text-cream sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Réserver"
          title={`Comment commander un taxi à ${city} ?`}
          description="Pour un trajet immédiat comme pour un départ programmé, transmettez-nous vos informations. Ensuite, nous organisons la prise en charge à l’adresse de votre choix. Puis nous revenons vers vous pour confirmer."
          tone="light"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          {/* Ce qu'il faut préparer */}
          <Reveal>
            <div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-7">
              <h3 className="font-serif text-xl text-white">Ce qu’il faut préparer</h3>
              <ul className="mt-5 space-y-3">
                {prepare.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-mist">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                      aria-hidden
                      strokeWidth={2}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#reservation" size="sm">
                  Réserver en ligne
                </Button>
                <Button href={siteConfig.contact.phoneHref} variant="outline" size="sm">
                  <Phone className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                  {siteConfig.contact.phone}
                </Button>
                {siteConfig.contact.whatsapp && (
                  <Button
                    href={siteConfig.contact.whatsappHref}
                    variant="outline"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp
                  </Button>
                )}
              </div>
            </div>
          </Reveal>

          {/* Immédiat vs à l'avance */}
          <div className="grid gap-5">
            <Reveal delay={90}>
              <div className="flex gap-4 rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-6">
                <CalendarClock
                  className="h-7 w-7 shrink-0 text-champagne"
                  aria-hidden
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="font-serif text-lg text-white">Réservation à l’avance</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">
                    Pour un train, un vol ou un rendez-vous à heure fixe, réservez à l’avance.
                    Ainsi, le chauffeur vous attend à l’heure convenue, bagages compris.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={170}>
              <div className="flex gap-4 rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-6">
                <Zap className="h-7 w-7 shrink-0 text-champagne" aria-hidden strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-lg text-white">Course immédiate</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">
                    Pour un départ de dernière minute, appelez-nous directement. Nous vous prenons
                    alors en charge au plus vite, selon les disponibilités.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <p className="text-sm text-mist/80">
                Service disponible <span className="text-champagne">7j/7</span>, sur réservation.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
