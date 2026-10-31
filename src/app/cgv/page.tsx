import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Conditions générales de vente',
    description: `Conditions générales de vente de ${siteConfig.name} : réservation, tarifs réglementés, annulation, attente, paiement et litiges.`,
    path: '/cgv',
    noindex: true,
  }),
  robots: { index: false, follow: true },
};

function Value({ value, placeholder }: { value: string; placeholder: string }) {
  if (value) return <>{value}</>;
  return <span className="italic text-ink-800/50">[{placeholder}]</span>;
}

export default function CgvPage() {
  const { legal, contact } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Conditions"
        title="Conditions générales de vente"
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Conditions générales de vente', path: '/cgv' },
        ]}
      />
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-prose">
            <div className="prose-content max-w-none">
              <p className="text-sm text-ink-800/60">Dernière mise à jour : {legal.lastUpdated}</p>

              <h2>1. Objet et vendeur</h2>
              <p>
                Les présentes conditions générales de vente (CGV) régissent les prestations de
                transport public particulier de personnes par taxi proposées sous le nom commercial
                «&nbsp;{siteConfig.name}&nbsp;» par {legal.legalName}, {legal.legalForm.toLowerCase()}{' '}
                au capital de {legal.capital}, {legal.rcs}, dont le siège social est situé{' '}
                {legal.headquarters} (le «&nbsp;Transporteur&nbsp;»).
              </p>
              <p>
                Toute réservation implique l’acceptation des présentes CGV par le client. Les mentions
                légales du site précisent l’identité et les autorisations du Transporteur.
              </p>

              <h2>2. Réservation</h2>
              <p>
                La réservation s’effectue par téléphone au{' '}
                <a href={contact.phoneHref}>{contact.phone}</a>, par e-mail à{' '}
                <a href={contact.emailHref}>{contact.email}</a>, via le formulaire en ligne ou par
                WhatsApp. Le client indique l’adresse de départ, la destination, la date et l’heure
                souhaitées, le nombre de passagers et de bagages, ainsi que ses besoins particuliers.
              </p>
              <p>
                La réservation est confirmée par le Transporteur, qui recontacte le client pour
                valider les modalités et le tarif. Les courses de dernière minute sont acceptées sous
                réserve de disponibilité. Le Transporteur peut refuser une demande qu’il ne peut pas
                honorer et en informe alors le client dans les meilleurs délais.
              </p>

              <h2>3. Tarifs</h2>
              <p>
                Les tarifs des taxis sont réglementés : ils sont fixés par arrêté pour la prise en
                charge, le tarif kilométrique (tarifs A, B, C ou D selon le jour, l’heure et le retour
                en charge ou à vide) et le tarif horaire d’attente. Ce sont des tarifs maximums. Le
                prix de la course est celui affiché au taximètre à l’arrivée, dans la limite des
                tarifs en vigueur.
              </p>
              <p>
                Le minimum de course est de 8,00 €. Les suppléments réglementaires applicables sont,
                sauf évolution de la réglementation : 2,00 € par bagage encombrant et 4,00 € par
                passager à partir du cinquième.
              </p>
              <p>
                Une estimation du prix peut être donnée avant la course. Elle est indicative et ne
                constitue pas un prix ferme : la circulation, l’itinéraire emprunté et le temps
                d’attente peuvent la modifier.
              </p>

              <h2>4. Paiement</h2>
              <p>
                Le paiement s’effectue à l’issue de la course, par carte bancaire (Visa, Mastercard)
                ou en espèces. Une facture est délivrée sur demande ; les clients professionnels
                peuvent demander une facture à leur raison sociale. Le client est invité à signaler le
                moyen de paiement choisi lors de la réservation.
              </p>

              <h2>5. Annulation et modification</h2>
              <p>
                Le client peut annuler ou modifier sa réservation sans frais tant que le chauffeur
                n’est pas parti pour la prise en charge. Il est invité à prévenir le Transporteur par
                téléphone dès que possible.
              </p>
              <p>
                Si le chauffeur s’est déjà déplacé ou est arrivé à l’adresse convenue sans que le
                client se présente ni réponde, le Transporteur peut facturer le temps d’attente au
                tarif horaire réglementaire, ainsi que les frais d’approche autorisés par la
                réglementation applicable.
              </p>
              <p>
                Le Transporteur peut annuler une course en cas de force majeure, d’indisponibilité du
                véhicule ou du chauffeur, ou de conditions de sécurité insuffisantes. Il en informe le
                client dans les meilleurs délais et ne facture alors aucun frais.
              </p>

              <h2>6. Retard et attente</h2>
              <p>
                Le chauffeur se présente à l’heure convenue. Il ne peut garantir l’heure d’arrivée en
                cas d’événements indépendants de sa volonté (circulation, intempéries, incident). Pour
                une gare ou un aéroport, le client indique l’heure de son train ou de son vol ; le
                chauffeur adapte la prise en charge à l’horaire communiqué.
              </p>
              <p>
                Tout temps d’attente demandé par le client ou causé par son retard est facturé au
                tarif horaire réglementaire.
              </p>

              <h2>7. Conditions de transport</h2>
              <ul>
                <li>
                  Le nombre de passagers ne peut pas dépasser la capacité du véhicule ; le client
                  indique à la réservation le nombre de passagers et de bagages ;
                </li>
                <li>
                  le port de la ceinture de sécurité est obligatoire ; le chauffeur peut refuser une
                  personne ou un comportement mettant en danger la sécurité ;
                </li>
                <li>
                  il est interdit de fumer dans le véhicule ; la dégradation ou la souillure du
                  véhicule peut donner lieu à une facturation des frais de remise en état ;
                </li>
                <li>
                  les animaux sont admis, dans des conditions à convenir lors de la réservation (par
                  exemple en caisse de transport) ;
                </li>
                <li>
                  les besoins particuliers (siège enfant, fauteuil roulant pliant, assistance) sont à
                  signaler à la réservation afin que le Transporteur confirme sa capacité à y
                  répondre.
                </li>
              </ul>

              <h2>8. Transport médical</h2>
              <p>
                Le Transporteur ne réalise pas de transport conventionné par l’Assurance Maladie. Il
                peut néanmoins assurer vos trajets vers vos rendez-vous médicaux ; la course est alors
                facturée au tarif réglementé, sans prise en charge CPAM.
              </p>

              <h2>9. Droit de rétractation</h2>
              <p>
                Conformément à l’article L.221-28 du code de la consommation, le droit de rétractation
                ne s’applique pas aux prestations de transport de personnes devant être fournies à une
                date ou selon une périodicité déterminée.
              </p>

              <h2>10. Responsabilité</h2>
              <p>
                Le Transporteur est tenu d’une obligation de moyens pour la prise en charge et le
                transport du client, dans les conditions prévues par le code des transports et sa
                police d’assurance professionnelle. Il ne peut être tenu responsable des retards dus à
                des événements extérieurs, ni de la perte ou de la détérioration d’objets que le
                client laisse dans le véhicule, sauf faute prouvée de sa part. Les objets oubliés sont
                conservés <Value value="" placeholder="durée à préciser" /> et restitués sur demande.
              </p>
              <p>
                Les bagages restent sous la surveillance du client, sauf disposition contraire. Le
                client est responsable des dommages qu’il cause au véhicule.
              </p>

              <h2>11. Réclamations et médiation</h2>
              <p>
                Toute réclamation peut être adressée à{' '}
                <a href={contact.emailHref}>{contact.email}</a> ou par téléphone au{' '}
                <a href={contact.phoneHref}>{contact.phone}</a>. À défaut de réponse satisfaisante, le
                client consommateur peut recourir gratuitement au médiateur de la consommation
                suivant :{' '}
                <Value value={legal.mediatorName} placeholder="nom du médiateur" />
                {legal.mediatorAddress ? `, ${legal.mediatorAddress}` : ''}
                {legal.mediatorUrl ? ` (${legal.mediatorUrl})` : ''}.
              </p>

              <h2>12. Données personnelles</h2>
              <p>
                Les données personnelles du client sont traitées conformément à notre{' '}
                <a href="/politique-confidentialite">politique de confidentialité</a>.
              </p>

              <h2>13. Droit applicable et litiges</h2>
              <p>
                Les présentes CGV sont soumises au droit français. En cas de litige, et à défaut de
                résolution amiable ou de médiation, les tribunaux compétents sont ceux désignés par
                les règles légales applicables, le client consommateur bénéficiant des dispositions
                impératives de protection qui lui sont reconnues.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
