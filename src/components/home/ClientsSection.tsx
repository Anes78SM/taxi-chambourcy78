import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Marquee } from '@/components/ui/Marquee';
import { clients } from '@/data/clients';

export function ClientsSection() {
  if (clients.length === 0) return null;

  return (
    <section className="border-y border-ink-900/8 bg-white py-14 sm:py-16">
      <Container>
        <Reveal>
          <p className="eyebrow text-center text-champagne-dark">Ils nous font confiance</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center font-serif text-2xl text-ink-900">
            Des entreprises et établissements exigeants nous confient leurs trajets
          </h2>
        </Reveal>
      </Container>

      <Marquee
        className="mt-10"
        durationSec={45}
        gap="3.5rem"
        ariaLabel="Logos des entreprises clientes"
      >
        {clients.map((client) => (
          <div key={client.name} className="flex shrink-0 items-center">
            {client.logo ? (
              // eslint-disable-next-line @next/next/no-img-element -- logos clients (formats variés)
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                className="h-8 w-auto max-w-[150px] object-contain opacity-85 transition-opacity duration-300 hover:opacity-100 sm:h-10"
              />
            ) : (
              <span className="whitespace-nowrap font-serif text-xl text-ink-900/55">
                {client.name}
              </span>
            )}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
