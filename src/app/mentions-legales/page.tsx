import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Mentions légales',
    description: `Mentions légales du site ${siteConfig.name} : éditeur, informations professionnelles, hébergeur, propriété intellectuelle et responsabilité.`,
    path: '/mentions-legales',
    noindex: true,
  }),
  robots: { index: false, follow: true },
};

/** Affiche une valeur, ou un repère « [à compléter] » si elle est vide. */
function Value({ value, placeholder }: { value: string; placeholder: string }) {
  if (value) return <>{value}</>;
  return <span className="italic text-ink-800/50">[{placeholder}]</span>;
}

export default function LegalPage() {
  const { legal, contact, publisher } = siteConfig;

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
            <div className="prose-content max-w-none">
              <p className="text-sm text-ink-800/60">Dernière mise à jour : {legal.lastUpdated}</p>
              <p>
                Conformément à l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance
                dans l’économie numérique, voici les informations relatives à l’édition et à
                l’hébergement du site {siteConfig.url.replace(/^https?:\/\//, '')}.
              </p>

              <h2>Éditeur du site</h2>
              <p>
                Ce site, exploité sous le nom commercial «&nbsp;{siteConfig.name}&nbsp;», est édité
                par :
                <br />
                <strong>
                  <a href={publisher.url} target="_blank" rel="nofollow noopener noreferrer">
                    {publisher.name}
                  </a>
                </strong>{' '}
                (marque de {publisher.parentEntity}).
              </p>
              <p>Responsable de la publication : {publisher.publicationDirector}.</p>

              <h2>Exploitant du service de taxi</h2>
              <p>
                Le service de taxi présenté sur ce site est assuré par :
                <br />
                <strong>{legal.legalName}</strong>
                <br />
                {legal.legalForm} au capital de {legal.capital}
                <br />
                Siège social : {legal.headquarters}
                <br />
                Téléphone : <a href={contact.phoneHref}>{contact.phone}</a>
                <br />
                E-mail : <a href={contact.emailHref}>{contact.email}</a>
                {legal.operatorName ? (
                  <>
                    <br />
                    Représentant légal : {legal.operatorName}
                  </>
                ) : null}
              </p>

              <h2>Informations professionnelles</h2>
              <ul>
                <li>Immatriculation : {legal.rcs}</li>
                <li>SIREN : {legal.siren}</li>
                <li>
                  SIRET : <Value value={legal.siret} placeholder="SIRET complet — 14 chiffres" />
                </li>
                <li>Identifiant européen (EUID) : {legal.euid}</li>
                <li>Date d’immatriculation : {legal.registrationDate}</li>
                <li>
                  N° de TVA intracommunautaire :{' '}
                  <Value value={legal.vatNumber} placeholder="à compléter si assujetti" />
                </li>
                <li>
                  Activité : transport public particulier de personnes par taxi, exercé à{' '}
                  {legal.stationZone}, dans l’Ouest parisien et en Île-de-France
                </li>
                <li>
                  Autorisation de stationnement (taxi) : n°{' '}
                  <Value value={legal.licenseNumber} placeholder="numéro" />, délivrée par{' '}
                  <Value value={legal.adsAuthority} placeholder="commune ou autorité" /> le{' '}
                  <Value value={legal.adsDate} placeholder="date" /> — zone de stationnement :{' '}
                  {legal.stationZone}
                </li>
              </ul>
              <p className="text-sm text-ink-800/65">
                Activité réglementée par le code des transports (livre Ier, titre III, chapitre
                Ier). Les tarifs des courses sont fixés par arrêté préfectoral et le prix final est
                celui affiché au taximètre.
              </p>

              <h2>Médiation de la consommation</h2>
              <p>
                Conformément aux articles L.611-1 et suivants du code de la consommation, en cas de
                litige non résolu avec notre service, vous pouvez recourir gratuitement à un
                médiateur de la consommation :
                <br />
                <Value value={legal.mediatorName} placeholder="Nom du médiateur" />
                <br />
                Adresse : <Value value={legal.mediatorAddress} placeholder="adresse" />
                <br />
                Site internet : <Value value={legal.mediatorUrl} placeholder="URL" />
              </p>
              <p>
                Vous pouvez également utiliser la plateforme européenne de règlement en ligne des
                litiges, accessible à l’adresse{' '}
                <a href="https://ec.europa.eu/consumers/odr" rel="noopener noreferrer nofollow">
                  ec.europa.eu/consumers/odr
                </a>
                .
              </p>

              <h2>Hébergement</h2>
              <p>
                Ce site est hébergé par :
                <br />
                <strong>Vercel Inc.</strong>
                <br />
                440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
                <br />
                Site internet :{' '}
                <a href="https://vercel.com" rel="noopener noreferrer nofollow">
                  vercel.com
                </a>
              </p>

              <h2>Propriété intellectuelle</h2>
              <p>
                L’ensemble des contenus présents sur ce site (textes, visuels, logos, éléments
                graphiques, structure) est protégé par le droit de la propriété intellectuelle et
                appartient à {legal.legalName} ou fait l’objet d’une autorisation d’utilisation.
              </p>
              <p>
                Toute reproduction, représentation, modification ou adaptation, totale ou partielle,
                sans autorisation écrite préalable de l’éditeur, est interdite et peut constituer une
                contrefaçon sanctionnée par le code de la propriété intellectuelle.
              </p>

              <h2>Responsabilité</h2>
              <p>
                Les informations figurant sur ce site sont fournies à titre indicatif. Les durées de
                trajet, tarifs et disponibilités dépendent de chaque demande et ne constituent pas un
                engagement contractuel. Seul le prix affiché au taximètre à l’issue de la course fait
                foi, dans la limite des tarifs réglementaires.
              </p>
              <p>
                Nous nous efforçons de maintenir des informations exactes et à jour, mais ne pouvons
                garantir l’absence d’erreur ou d’omission, ni la disponibilité permanente du site.
                L’éditeur ne saurait être tenu responsable d’une interruption du site, d’un
                dysfonctionnement technique ou d’un usage inapproprié des informations qui y figurent.
              </p>

              <h2>Liens hypertextes</h2>
              <p>
                Ce site peut contenir des liens vers des sites tiers. L’éditeur n’exerce aucun
                contrôle sur ces sites et décline toute responsabilité quant à leur contenu. Tout
                lien vers ce site doit faire l’objet d’une autorisation préalable de l’éditeur.
              </p>

              <h2>Données personnelles</h2>
              <p>
                Le traitement de vos données est décrit dans notre{' '}
                <a href="/politique-confidentialite">politique de confidentialité</a>, et les
                cookies dans notre <a href="/politique-cookies">politique de cookies</a>.
              </p>
              <p>
                Conformément au règlement (UE) 2016/679 (RGPD) et à la loi «&nbsp;Informatique et
                Libertés&nbsp;», vous disposez de droits d’accès, de rectification, d’effacement,
                d’opposition, de limitation et de portabilité sur vos données. Vous pouvez les
                exercer en écrivant à <a href={contact.emailHref}>{contact.email}</a>. Vous pouvez
                aussi introduire une réclamation auprès de la CNIL (
                <a href="https://www.cnil.fr" rel="noopener noreferrer nofollow">
                  cnil.fr
                </a>
                ).
              </p>

              <h2>Droit applicable et juridiction</h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige, et
                à défaut de résolution amiable ou de médiation, les tribunaux français seront seuls
                compétents, sous réserve des règles impératives applicables aux consommateurs.
              </p>

              <h2>Contact</h2>
              <p>
                Pour toute question concernant ce site :{' '}
                <a href={contact.emailHref}>{contact.email}</a> ou{' '}
                <a href={contact.phoneHref}>{contact.phone}</a>.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
