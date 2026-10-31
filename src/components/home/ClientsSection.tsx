import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { clients } from '@/data/clients';

export function ClientsSection() {
  if (clients.length === 0) return null;

  return (
    <section className="border-y border-ink-900/8 bg-white py-16">
      <Container>
        <Reveal>
          <p className="eyebrow text-center text-champagne-dark">Ils nous font confiance</p>
          <h2 className="mx-auto mt-3 max-w-xl text-center font-serif text-2xl text-ink-900">
            Des professionnels et établissements exigeants nous confient leurs trajets
          </h2>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16"
        >
          {clients.map((client) => {
            const content = client.logo ? (
              // eslint-disable-next-line @next/next/no-img-element -- logos clients (SVG/PNG variés), sans optimisation next/image
              <img
                src={client.logo}
                alt={client.name}
                className="h-12 w-auto object-contain opacity-70 grayscale transition duration-300 ease-premium hover:opacity-100 hover:grayscale-0 sm:h-14"
              />
            ) : (
              <span className="font-serif text-xl tracking-wide text-ink-900/55 transition-colors duration-300 hover:text-ink-900 sm:text-2xl">
                {client.name}
              </span>
            );

            return client.url ? (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={client.name}
              >
                {content}
              </a>
            ) : (
              <span key={client.name}>{content}</span>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
