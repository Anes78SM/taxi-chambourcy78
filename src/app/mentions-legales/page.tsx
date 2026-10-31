import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales',
  description: `Mentions légales de ${siteConfig.name}.`,
  path: '/mentions-legales',
  noindex: true,
});

function Value({ value, placeholder }: { value: string; placeholder: string }) {
  if (value) return <>{value}</>;
  return <span className="italic text-ink-800/50">[{placeholder}]</span>;
}

export default function LegalPage() {
  const { legal, contact } = siteConfig;
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
            <div className="mb-10 rounded-[var(--radius)] border border-ink-900/10 bg-white/60 p-5 text-sm text-ink-800/70">
              Informations de la société éditrice. Le numéro d’autorisation de stationnement (ADS)
              reste à renseigner — il est signalé entre crochets.
            </div>

            <div className="prose-content max-w-none">
              <h2>Éditeur du site</h2>
              <p>
                Ce site, exploité sous le nom commercial «&nbsp;{siteConfig.name}&nbsp;», est édité
                par :
                <br />
                <strong>{legal.legalName}</strong>
                <br />
                {legal.legalForm} au capital de {legal.capital}
                <br />
                Siège social : {legal.headquarters}
                <br />
                Téléphone : {contact.phone}
                <br />
                E-mail : {contact.email}
                {legal.operatorName ? (
                  <>
                    <br />
                    Représentant légal : {legal.operatorName}
                  </>
                ) : null}
              </p>

              <h2>Informations professionnelles</h2>
              <p>
                {legal.rcs}
                <br />
                SIREN : {legal.siren}
                <br />
                Identifiant européen (EUID) : {legal.euid}
                <br />
                Date d’immatriculation : {legal.registrationDate}
                <br />
                SIRET : <Value value={legal.siret} placeholder="SIRET complet à compléter" />
                <br />
                N° de TVA intracommunautaire :{' '}
                <Value value={legal.vatNumber} placeholder="à compléter le cas échéant" />
                <br />
                Autorisation de stationnement (taxi) :{' '}
                <Value value={legal.licenseNumber} placeholder="à compléter" />
                <br />
                Zone de stationnement (commune de rattachement) : {legal.stationZone}
              </p>
              <p className="text-sm text-ink-800/65">
                Activité de taxi exploitée en {siteConfig.serviceArea}.
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
