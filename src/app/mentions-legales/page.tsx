import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales',
  description: 'Mentions légales de Chambourcy Executive Taxi.',
  path: '/mentions-legales',
  noindex: true,
});

function Value({ value, placeholder }: { value: string; placeholder: string }) {
  if (value) return <>{value}</>;
  return <span className="italic text-ink-800/50">[{placeholder}]</span>;
}

export default function LegalPage() {
  const { legal, contact, address } = siteConfig;
  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        title="Mentions légales"
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Mentions légales', path: '/mentions-legales' },
        ]}
      />
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-prose">
            <div className="mb-10 rounded-[var(--radius)] border border-dashed border-ink-900/25 bg-white/60 p-5 text-sm text-ink-800/70">
              ⚠️ Modèle à compléter impérativement avant publication avec les informations réelles
              de l’entreprise. Les champs entre crochets sont des emplacements à renseigner. Aucune
              information légale ne doit être inventée.
            </div>

            <div className="prose-content max-w-none">
              <h2>Éditeur du site</h2>
              <p>
                Raison sociale : <Value value={legal.legalName} placeholder="Raison sociale à compléter" />
                <br />
                Exploitant : <Value value={legal.operatorName} placeholder="Nom de l’exploitant à compléter" />
                <br />
                Adresse : <Value value={address.street} placeholder="Adresse à compléter" />, {address.postalCode}{' '}
                {address.city}
                <br />
                Téléphone : <Value value={contact.phone} placeholder="Téléphone à compléter" />
                <br />
                E-mail : {contact.email}
              </p>

              <h2>Informations professionnelles</h2>
              <p>
                SIRET : <Value value={legal.siret} placeholder="SIRET à compléter" />
                <br />
                RCS : <Value value={legal.rcs} placeholder="RCS à compléter" />
                <br />
                Numéro de TVA : <Value value={legal.vatNumber} placeholder="TVA à compléter le cas échéant" />
                <br />
                Autorisation / licence : <Value value={legal.licenseNumber} placeholder="Numéro d’autorisation à compléter" />
              </p>

              <h2>Hébergement</h2>
              <p>
                Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
                États-Unis — <a href="https://vercel.com">vercel.com</a>.
              </p>

              <h2>Propriété intellectuelle</h2>
              <p>
                L’ensemble des contenus présents sur ce site (textes, visuels, éléments graphiques)
                est protégé. Toute reproduction non autorisée est interdite.
              </p>

              <h2>Responsabilité</h2>
              <p>
                Les informations figurant sur ce site sont fournies à titre indicatif. Les durées de
                trajet, tarifs et disponibilités dépendent de chaque demande et ne constituent pas un
                engagement contractuel.
              </p>

              <h2>Données personnelles</h2>
              <p>
                Le traitement de vos données est décrit dans notre{' '}
                <a href="/politique-confidentialite">politique de confidentialité</a>.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
