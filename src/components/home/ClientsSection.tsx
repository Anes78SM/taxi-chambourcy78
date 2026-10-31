import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { clients } from '@/data/clients';

export function ClientsSection() {
  if (clients.length === 0) return null;

  return (
    <section className="border-y border-ink-900/8 bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="eyebrow text-center text-champagne-dark">Ils nous font confiance</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center font-serif text-2xl text-ink-900">
            Des entreprises et établissements exigeants nous confient leurs trajets
          </h2>
        </Reveal>

        <Reveal
          delay={120}
          className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
        >
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex min-h-[92px] items-center justify-center rounded-[var(--radius-lg)] border border-ink-900/8 bg-white px-5 py-6 transition-colors duration-300 ease-premium hover:border-champagne/40"
            >
              {client.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- logos clients (formats variés), sans optimisation next/image
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  className="max-h-9 w-auto max-w-[140px] object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
                />
              ) : (
                <span className="text-center font-serif text-lg text-ink-900/60">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
