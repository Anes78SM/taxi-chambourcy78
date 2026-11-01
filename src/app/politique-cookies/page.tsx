import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Politique de cookies',
    description: `Politique de cookies de ${siteConfig.name} : cookies utilisés, Google Maps, consentement et gestion de vos choix.`,
    path: '/politique-cookies',
    noindex: true,
  }),
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  const { legal } = siteConfig;
  const siteHost = siteConfig.url.replace(/^https?:\/\//, '');

  return (
    <>
      <PageHero
        eyebrow="Cookies"
        title="Politique de cookies"
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Politique de cookies', path: '/politique-cookies' },
        ]}
      />
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-prose">
            <div className="prose-content max-w-none">
              <p className="text-sm text-ink-800/60">Dernière mise à jour : {legal.lastUpdated}</p>
              <p>
                Cette page explique quels cookies et traceurs peuvent être déposés lorsque vous
                naviguez sur {siteHost}, à quoi ils servent et comment les accepter ou les refuser.
                Elle complète notre{' '}
                <a href="/politique-confidentialite">politique de confidentialité</a>.
              </p>

              <h2>Qu’est-ce qu’un cookie ?</h2>
              <p>
                Un cookie est un petit fichier enregistré sur votre appareil (ordinateur, téléphone,
                tablette) lors de la visite d’un site. Il peut servir à faire fonctionner le site, à
                mémoriser vos choix ou à mesurer l’audience. Des technologies similaires (stockage
                local, pixels) sont traitées de la même façon.
              </p>

              <h2>Cookies utilisés sur ce site</h2>
              <p>
                Le site n’utilise pas de cookie publicitaire et ne réalise aucun suivi de votre
                navigation à des fins commerciales. Aucun outil de mesure d’audience tiers (type
                Google Analytics) n’est installé.
              </p>
              <table>
                <caption className="sr-only">Traceurs concernés</caption>
                <thead>
                  <tr>
                    <th scope="col">Traceur</th>
                    <th scope="col">Finalité</th>
                    <th scope="col">Consentement</th>
                    <th scope="col">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mémorisation de votre choix d’affichage de la carte</td>
                    <td>
                      Conserver votre accord pour l’affichage de la carte Google Maps, afin de ne pas
                      vous le redemander
                    </td>
                    <td>Non requis (lié à votre choix)</td>
                    <td>Stockage local, jusqu’à effacement</td>
                  </tr>
                  <tr>
                    <td>Google Maps (Google)</td>
                    <td>Afficher une carte et faciliter la localisation de votre prise en charge</td>
                    <td>Requis</td>
                    <td>Selon Google, au maximum 13 mois</td>
                  </tr>
                  <tr>
                    <td>Cloudflare Turnstile (Cloudflare)</td>
                    <td>
                      Vérifier que le formulaire de réservation est rempli par une personne
                      (protection anti-spam du formulaire)
                    </td>
                    <td>Non requis (strictement nécessaire à la sécurité)</td>
                    <td>Cookie technique de courte durée</td>
                  </tr>
                </tbody>
              </table>
              <p>
                Les journaux techniques (adresse IP, date et heure de connexion) collectés par
                l’hébergeur pour assurer la sécurité et le fonctionnement du site ne sont pas des
                cookies : ils sont décrits dans la{' '}
                <a href="/politique-confidentialite">politique de confidentialité</a>.
              </p>

              <h2>Google Maps</h2>
              <p>
                La carte Google Maps est fournie par Google Ireland Limited (Gordon House, Barrow
                Street, Dublin 4, Irlande), avec Google LLC (États-Unis). Sur notre site, elle{' '}
                <strong>ne se charge qu’après un clic de votre part</strong> (bouton «&nbsp;Afficher
                la carte&nbsp;»). Lorsque vous l’affichez, Google peut déposer des cookies et recevoir
                des informations telles que votre adresse IP et des données de navigation. Pour en
                savoir plus :{' '}
                <a href="https://policies.google.com/privacy" rel="noopener noreferrer nofollow">
                  politique de confidentialité de Google
                </a>
                .
              </p>
              <p>
                Si vous n’affichez pas la carte, aucun cookie Google n’est déposé. Vous pouvez
                toujours nous contacter et réserver par téléphone ou par e-mail.
              </p>

              <h2>Cloudflare Turnstile (anti-spam)</h2>
              <p>
                Le formulaire de réservation est protégé par Cloudflare Turnstile, un dispositif
                anti-spam fourni par Cloudflare, Inc. (États-Unis). Il vérifie que le formulaire est
                rempli par une personne et non par un programme automatisé. À ce titre, il peut
                déposer un cookie technique de courte durée et traiter des données techniques de
                votre navigateur.
              </p>
              <p>
                Ce dispositif est <strong>strictement nécessaire à la sécurité</strong> du service
                que vous demandez (l’envoi de votre réservation) : il est donc exempté de
                consentement. Turnstile est conçu pour préserver la vie privée et n’est pas utilisé à
                des fins publicitaires ou de suivi. Pour en savoir plus :{' '}
                <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener noreferrer nofollow">
                  politique de confidentialité de Cloudflare
                </a>
                .
              </p>

              <h2>Comment gérer vos choix</h2>
              <ul>
                <li>
                  <strong>Sur le site</strong> : la carte Google Maps ne s’affiche qu’après votre
                  clic. Votre choix est mémorisé sur votre appareil ; pour le réinitialiser, effacez
                  les données du site dans votre navigateur.
                </li>
                <li>
                  <strong>Dans votre navigateur</strong> : vous pouvez bloquer ou supprimer les
                  cookies depuis les paramètres de votre navigateur (Chrome, Firefox, Safari, Edge).
                  Le blocage de tous les cookies peut altérer certaines fonctions du site.
                </li>
              </ul>
              <p>
                Vous pouvez aussi consulter les informations de la CNIL sur les cookies :{' '}
                <a
                  href="https://www.cnil.fr/fr/cookies-et-autres-traceurs"
                  rel="noopener noreferrer nofollow"
                >
                  cnil.fr/fr/cookies-et-autres-traceurs
                </a>
                .
              </p>

              <h2>Modification de cette politique</h2>
              <p>
                Cette politique peut évoluer, par exemple si nous ajoutons un nouvel outil. La date de
                dernière mise à jour figure en haut de la page. Tout nouveau traceur soumis à
                consentement sera présenté avant son dépôt.
              </p>

              <h2>Contact</h2>
              <p>
                Pour toute question :{' '}
                <a href={siteConfig.contact.emailHref}>{siteConfig.contact.email}</a>.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
