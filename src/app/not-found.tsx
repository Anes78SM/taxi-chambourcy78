import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ink-900 pt-[88px] text-white">
      <Container className="py-24 text-center">
        <p className="eyebrow text-champagne">Erreur 404</p>
        <h1 className="mt-5 text-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          Page introuvable
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-mist">
          La page que vous recherchez n’existe pas ou a été déplacée. Revenez à l’accueil ou
          réservez directement votre trajet.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">
            Retour à l’accueil
          </Button>
          <Button href="/#reservation" variant="outline" size="lg">
            Réserver un trajet
          </Button>
        </div>
      </Container>
    </section>
  );
}
