import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Politique de confidentialité',
    description: `Politique de confidentialité de ${siteConfig.name} : données collectées, finalités, durées de conservation, destinataires et exercice de vos droits.`,
    path: '/politique-confidentialite',
    noindex: true,
  }),
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  const { legal, contact } = siteConfig;
  const siteHost = siteConfig.url.replace(/^https?:\/\//, '');

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
            <div className="prose-content max-w-none">
              <p className="text-sm text-ink-800/60">Dernière mise à jour : {legal.lastUpdated}</p>
              <p>
                Cette politique explique comment «&nbsp;{siteConfig.name}&nbsp;» traite vos données
                personnelles lorsque vous consultez le site {siteHost}, nous contactez ou réservez
                une course. Elle est établie conformément au règlement (UE) 2016/679 (RGPD) et à la
                loi n° 78-17 du 6 janvier 1978 modifiée.
              </p>

              <h2>Responsable du traitement</h2>
              <p>
                <strong>{legal.legalName}</strong>, {legal.legalForm.toLowerCase()} au capital de{' '}
                {legal.capital}, immatriculée sous le numéro {legal.rcs}, dont le siège social est
                situé {legal.headquarters}, exploitée sous le nom commercial «&nbsp;{siteConfig.name}
                &nbsp;».
              </p>
              <p>
                Contact pour toute question relative à vos données :{' '}
                <a href={contact.emailHref}>{contact.email}</a>.
              </p>

              <h2>Données que nous collectons</h2>
              <p>
                Nous collectons uniquement les données nécessaires pour répondre à votre demande et
                réaliser votre course :
              </p>
              <ul>
                <li>
                  <strong>Identité et coordonnées</strong> : nom, prénom, numéro de téléphone,
                  adresse e-mail ;
                </li>
                <li>
                  <strong>Informations de course</strong> : adresse de départ, destination, date et
                  heure, nombre de passagers et de bagages, besoins particuliers que vous nous
                  indiquez (siège enfant, fauteuil pliant, animal) ;
                </li>
                <li>
                  <strong>Informations de paiement et de facturation</strong> : montant de la
                  course, moyen de paiement utilisé, éléments figurant sur la facture (le cas
                  échéant, les coordonnées de votre entreprise) ; nous ne conservons pas votre numéro
                  de carte bancaire ;
                </li>
                <li>
                  <strong>Échanges avec nous</strong> : contenu de vos messages, appels manqués et
                  e-mails ;
                </li>
                <li>
                  <strong>Données techniques</strong> : adresse IP, type de navigateur, pages
                  consultées et horodatage, collectés par l’hébergeur dans les journaux techniques du
                  site.
                </li>
                <li>
                  <strong>Données de localisation (facultatif)</strong> : si vous utilisez le bouton
                  «&nbsp;Ma position&nbsp;» du formulaire, vos coordonnées GPS sont transmises à
                  l’API Base Adresse Nationale afin de retrouver votre adresse de départ. Cette
                  fonction ne s’active qu’à votre demande.
                </li>
              </ul>
              <p>
                Nous ne vous demandons pas de données sensibles. Si vous nous en communiquez
                spontanément (par exemple une information de santé liée à un besoin de mobilité), nous
                ne les utilisons que pour organiser votre trajet.
              </p>

              <h2>Pourquoi nous utilisons vos données</h2>
              <table>
                <caption className="sr-only">Finalités, bases légales et durées de conservation</caption>
                <thead>
                  <tr>
                    <th scope="col">Finalité</th>
                    <th scope="col">Base légale</th>
                    <th scope="col">Durée de conservation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Répondre à vos demandes de renseignement, de devis ou de réservation</td>
                    <td>Mesures précontractuelles prises à votre demande</td>
                    <td>3 ans à compter du dernier contact</td>
                  </tr>
                  <tr>
                    <td>Organiser et réaliser votre course, confirmer ou modifier la prise en charge</td>
                    <td>Exécution du contrat</td>
                    <td>Durée de la prestation, puis 3 ans après le dernier contact</td>
                  </tr>
                  <tr>
                    <td>Établir les factures, tenir la comptabilité, répondre aux obligations fiscales</td>
                    <td>Obligation légale</td>
                    <td>10 ans à compter de la clôture de l’exercice</td>
                  </tr>
                  <tr>
                    <td>Gérer les réclamations et les litiges</td>
                    <td>Intérêt légitime (défense de nos droits)</td>
                    <td>Durée du litige, puis délai de prescription applicable</td>
                  </tr>
                  <tr>
                    <td>Assurer la sécurité et le bon fonctionnement du site</td>
                    <td>Intérêt légitime</td>
                    <td>Durée définie par l’hébergeur, limitée au nécessaire</td>
                  </tr>
                  <tr>
                    <td>Afficher une carte Google Maps (notre fiche Google)</td>
                    <td>
                      Consentement (voir la{' '}
                      <a href="/politique-cookies">politique de cookies</a>)
                    </td>
                    <td>Selon la durée des traceurs, au maximum 13 mois</td>
                  </tr>
                </tbody>
              </table>
              <p>
                À l’issue de ces durées, vos données sont supprimées ou anonymisées. Nous n’utilisons
                pas vos données à des fins de prospection commerciale, ni de décision automatisée ou
                de profilage.
              </p>

              <h2>Qui reçoit vos données</h2>
              <p>
                Vos données sont destinées à l’équipe d’{siteConfig.name} (chauffeurs et personnes en
                charge de la réservation). Elles peuvent être communiquées à :
              </p>
              <ul>
                <li>
                  notre <strong>hébergeur</strong>, Vercel Inc. (États-Unis), qui héberge le site ;
                </li>
                <li>
                  notre <strong>fournisseur de messagerie</strong>, Google (Gmail), pour la réception
                  et l’envoi d’e-mails ;
                </li>
                <li>
                  notre <strong>service d’envoi d’e-mails transactionnels</strong> (Resend), lorsque
                  l’envoi automatique de la demande est activé ;
                </li>
                <li>
                  <strong>Cloudflare, Inc.</strong> (États-Unis), qui fournit le dispositif anti-spam
                  «&nbsp;Turnstile&nbsp;» protégeant le formulaire de réservation (données techniques
                  nécessaires à la vérification de sécurité) ;
                </li>
                <li>
                  l’<strong>API Base Adresse Nationale</strong> (service public français,
                  api-adresse.data.gouv.fr), pour proposer des adresses pendant la saisie et, si vous
                  utilisez «&nbsp;Ma position&nbsp;», convertir vos coordonnées en adresse ;
                </li>
                <li>
                  notre <strong>expert-comptable</strong>, pour la facturation et les obligations
                  comptables, le cas échéant ;
                </li>
                <li>Google, lorsque la carte Google Maps est affichée ;</li>
                <li>les autorités administratives ou judiciaires, lorsque la loi l’exige.</li>
              </ul>
              <p>Nous ne vendons pas vos données.</p>

              <h2>Transferts hors de l’Union européenne</h2>
              <p>
                Certains de nos prestataires (Vercel Inc., Google, Cloudflare, Inc.) sont établis aux
                États-Unis ou y traitent des données. Ces transferts sont encadrés par les garanties prévues par le
                RGPD, notamment la décision d’adéquation relative au Data Privacy Framework ou les
                clauses contractuelles types de la Commission européenne.
              </p>

              <h2>Vos droits</h2>
              <p>Vous disposez des droits suivants sur vos données :</p>
              <ul>
                <li>droit d’accès et de copie ;</li>
                <li>droit de rectification ;</li>
                <li>droit à l’effacement ;</li>
                <li>droit à la limitation du traitement ;</li>
                <li>droit d’opposition, notamment pour les traitements fondés sur l’intérêt légitime ;</li>
                <li>droit à la portabilité de vos données ;</li>
                <li>
                  droit de retirer votre consentement à tout moment, sans remettre en cause les
                  traitements déjà réalisés ;
                </li>
                <li>droit de définir des directives relatives au sort de vos données après votre décès.</li>
              </ul>
              <p>
                Pour exercer ces droits, écrivez-nous à{' '}
                <a href={contact.emailHref}>{contact.email}</a> en précisant votre demande. Nous
                pouvons vous demander un justificatif d’identité en cas de doute. Nous répondons dans
                un délai d’un mois.
              </p>
              <p>
                Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés,
                vous pouvez introduire une réclamation auprès de la Commission nationale de
                l’informatique et des libertés (CNIL), 3 place de Fontenoy, TSA 80715, 75334 Paris
                Cedex 07,{' '}
                <a href="https://www.cnil.fr" rel="noopener noreferrer nofollow">
                  cnil.fr
                </a>
                .
              </p>

              <h2>Sécurité</h2>
              <p>
                Nous prenons des mesures techniques et organisationnelles raisonnables pour protéger
                vos données contre la perte, l’accès non autorisé et l’altération : connexion
                sécurisée (HTTPS), accès limité aux personnes qui en ont besoin, comptes protégés.
                Aucune mesure ne garantit toutefois une sécurité absolue.
              </p>

              <h2>Mineurs</h2>
              <p>
                Le site ne s’adresse pas aux enfants de moins de 15 ans. Les réservations pour un
                mineur doivent être faites par un parent ou un représentant légal.
              </p>

              <h2>Cookies et traceurs</h2>
              <p>
                Le site n’utilise ni cookie publicitaire, ni outil de mesure d’audience tiers. La
                carte Google Maps (notre fiche d’établissement) ne se charge qu’après un clic de
                votre part, ce qui conditionne le dépôt éventuel de cookies par Google. Le détail
                figure dans notre <a href="/politique-cookies">politique de cookies</a>.
              </p>

              <h2>Modification de cette politique</h2>
              <p>
                Nous pouvons mettre à jour cette politique pour tenir compte d’évolutions légales ou
                de nos services. La date de dernière mise à jour figure en haut de la page.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
