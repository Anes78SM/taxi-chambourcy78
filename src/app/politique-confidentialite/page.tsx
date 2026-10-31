import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et traitement des données personnelles de Chambourcy Executive Taxi.',
  path: '/politique-confidentialite',
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Confidentialité"
        title="Politique de confidentialité"
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Politique de confidentialité', path: '/politique-confidentialite' },
        ]}
      />
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-prose">
            <div className="mb-10 rounded-[var(--radius)] border border-dashed border-ink-900/25 bg-white/60 p-5 text-sm text-ink-800/70">
              ⚠️ Modèle indicatif à adapter avec un professionnel avant publication, en fonction du
              traitement réel des données et de la réglementation en vigueur (RGPD).
            </div>

            <div className="prose-content max-w-none">
              <p>
                La présente politique décrit la manière dont {siteConfig.name} traite les données
                que vous transmettez via ce site, notamment par le formulaire de réservation.
              </p>

              <h2>Données collectées</h2>
              <p>
                Le formulaire de réservation vous invite à renseigner : lieu de départ, destination,
                date, heure, nombre de passagers, nom, téléphone, e-mail et informations
                complémentaires. Ces données servent uniquement à traiter votre demande de trajet.
              </p>

              <h2>Absence d’enregistrement sur le site</h2>
              <p>
                Ce site ne dispose d’aucune base de données. Les informations saisies dans le
                formulaire ne sont pas stockées sur le site : elles sont intégrées à un e-mail que
                vous choisissez d’envoyer depuis votre propre messagerie. Le traitement de cet
                e-mail relève ensuite de votre messagerie et de l’entreprise destinataire.
              </p>

              <h2>Finalité et base légale</h2>
              <p>
                Vos données sont utilisées dans le seul but de répondre à votre demande de trajet et
                de vous recontacter. Leur traitement repose sur votre consentement, recueilli lors de
                l’envoi de votre demande.
              </p>

              <h2>Durée de conservation</h2>
              <p>
                Les échanges relatifs à votre demande sont conservés le temps nécessaire à son
                traitement, puis selon les obligations applicables à l’entreprise. Cette durée doit
                être précisée par l’exploitant.
              </p>

              <h2>Vos droits</h2>
              <p>
                Conformément à la réglementation, vous disposez d’un droit d’accès, de rectification,
                d’effacement, de limitation et d’opposition sur vos données. Pour les exercer,
                contactez l’entreprise aux coordonnées indiquées sur la page{' '}
                <a href="/contact">Contact</a>.
              </p>

              <h2>Cookies</h2>
              <p>
                Ce site n’utilise pas de cookies de suivi publicitaire. Si des outils de mesure
                d’audience ou tiers venaient à être ajoutés, cette politique devra être mise à jour
                en conséquence.
              </p>

              <h2>Réclamation</h2>
              <p>
                Vous pouvez introduire une réclamation auprès de la CNIL (
                <a href="https://www.cnil.fr">www.cnil.fr</a>) si vous estimez que le traitement de
                vos données n’est pas conforme à la réglementation.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
