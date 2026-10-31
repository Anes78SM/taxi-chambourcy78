import type { Location } from '@/types';

/**
 * Pages locales. Le contenu décrit le service de transport proposé DEPUIS/VERS ces communes.
 * Il ne doit jamais laisser entendre que l'entreprise dispose d'un établissement physique
 * dans chaque ville : l'activité rayonne depuis Chambourcy et ses environs.
 */
export const locations: Location[] = [
  {
    slug: 'taxi-saint-germain-en-laye',
    name: 'Saint-Germain-en-Laye',
    title: 'Taxi à Saint-Germain-en-Laye',
    postalCode: '78100',
    tagline: 'Transport premium depuis Saint-Germain-en-Laye',
    context: [
      'Saint-Germain-en-Laye, ville d’art et d’histoire des Yvelines, est un pôle majeur de l’Ouest parisien, desservi par le RER A et réputé pour son château, sa forêt et son centre animé.',
      'Voisine immédiate de Chambourcy, la commune concentre de nombreux besoins de transport, tant pour les trajets professionnels que pour les sorties et les transferts aéroports.',
    ],
    needs: [
      'Transferts aéroports au départ du centre ou des quartiers résidentiels.',
      'Déplacements professionnels vers Paris, La Défense et les gares.',
      'Trajets privés vers restaurants, événements et sorties culturelles.',
      'Compléments ou alternatives au RER A pour les trajets avec bagages.',
    ],
    destinations: [
      { label: 'Roissy CDG / Orly', detail: 'Transferts aéroports organisés.' },
      { label: 'La Défense', detail: 'Déplacements d’affaires.' },
      { label: 'Paris intra-muros', detail: 'Trajets privés et professionnels.' },
      { label: 'Chambourcy & communes voisines', detail: 'Liaisons locales.' },
    ],
    practical: [
      'Prise en charge à l’adresse de votre choix à Saint-Germain-en-Laye.',
      'Idéal pour les trajets avec bagages ou en soirée, en complément du RER.',
      'Réservation conseillée pour les horaires de pointe.',
    ],
    faq: [
      {
        question: 'Proposez-vous une alternative au RER A ?',
        answer:
          'Notre service est une solution de porte à porte, particulièrement utile avec des bagages, en soirée ou pour un trajet direct sans correspondance. Il fonctionne sur réservation.',
      },
    ],
  },
  {
    slug: 'taxi-poissy',
    name: 'Poissy',
    title: 'Taxi à Poissy',
    postalCode: '78300',
    tagline: 'Votre taxi premium à Poissy et alentours',
    context: [
      'Poissy, sur les bords de Seine, est une ville dynamique des Yvelines, desservie par le RER A et le réseau de bus, à proximité de Chambourcy et des grands axes routiers.',
      'Ses besoins de transport sont variés : transferts aéroports, trajets professionnels et déplacements privés vers Paris et l’ensemble de l’Ouest francilien.',
    ],
    needs: [
      'Transferts aéroports depuis Poissy et ses quartiers.',
      'Déplacements professionnels vers Paris et les zones d’activité.',
      'Trajets privés et sorties en Île-de-France.',
      'Liaisons vers les gares et les communes voisines.',
    ],
    destinations: [
      { label: 'Roissy CDG', detail: 'Transfert aéroport planifié.' },
      { label: 'Orly', detail: 'Prise en charge directe.' },
      { label: 'Paris / La Défense', detail: 'Trajets professionnels et privés.' },
      { label: 'Chambourcy & Saint-Germain-en-Laye', detail: 'Liaisons locales.' },
    ],
    practical: [
      'Prise en charge à l’adresse de votre choix à Poissy.',
      'Réservation anticipée recommandée pour les transferts aéroports.',
      'Durées estimées lors de la demande, selon le trafic.',
    ],
    faq: [
      {
        question: 'Prenez-vous en charge les trajets depuis Poissy vers l’aéroport ?',
        answer:
          'Oui. Nous organisons les transferts aéroports au départ de Poissy, avec une heure de prise en charge définie selon votre vol et votre adresse.',
      },
    ],
  },
  {
    slug: 'taxi-orgeval',
    name: 'Orgeval',
    title: 'Taxi à Orgeval',
    postalCode: '78630',
    tagline: 'Transport soigné depuis Orgeval',
    context: [
      'Orgeval, commune résidentielle des Yvelines proche de l’A13, est idéalement située pour rejoindre rapidement Paris, l’Ouest parisien et les aéroports.',
      'Son cadre verdoyant et sa proximité avec les grands axes en font un point de départ pratique pour tous vos déplacements.',
    ],
    needs: [
      'Transferts aéroports au départ d’Orgeval.',
      'Déplacements professionnels vers Paris et La Défense.',
      'Trajets privés et sorties.',
      'Liaisons vers les gares et communes voisines.',
    ],
    destinations: [
      { label: 'Roissy CDG / Orly', detail: 'Transferts aéroports.' },
      { label: 'Paris Ouest', detail: 'Déplacements professionnels et privés.' },
      { label: 'La Défense', detail: 'Trajets d’affaires.' },
      { label: 'Chambourcy & Poissy', detail: 'Liaisons locales.' },
    ],
    practical: [
      'Prise en charge à l’adresse de votre choix à Orgeval.',
      'Accès rapide à l’A13 pour les trajets vers Paris et les aéroports.',
      'Service sur réservation.',
    ],
    faq: [
      {
        question: 'Orgeval est-elle bien desservie par votre service ?',
        answer:
          'Oui. Orgeval fait partie de notre zone de rayonnement autour de Chambourcy. La prise en charge se fait à l’adresse de votre choix, sur réservation.',
      },
    ],
  },
  {
    slug: 'taxi-le-pecq',
    name: 'Le Pecq',
    title: 'Taxi au Pecq',
    postalCode: '78230',
    tagline: 'Votre taxi premium au Pecq, au bord de Seine',
    context: [
      'Le Pecq, en bordure de Seine et au pied de Saint-Germain-en-Laye, bénéficie d’un accès direct au RER A et d’une situation centrale dans l’Ouest parisien.',
      'La commune est un point de départ pratique pour les transferts aéroports comme pour les trajets professionnels vers Paris.',
    ],
    needs: [
      'Transferts aéroports depuis Le Pecq.',
      'Déplacements professionnels vers Paris et La Défense.',
      'Trajets privés et sorties.',
      'Compléments au RER A pour les trajets avec bagages.',
    ],
    destinations: [
      { label: 'Roissy CDG / Orly', detail: 'Transferts aéroports organisés.' },
      { label: 'La Défense', detail: 'Déplacements d’affaires.' },
      { label: 'Paris intra-muros', detail: 'Trajets privés et professionnels.' },
      { label: 'Saint-Germain-en-Laye', detail: 'Liaison immédiate.' },
    ],
    practical: [
      'Prise en charge à l’adresse de votre choix au Pecq.',
      'Solution de porte à porte utile avec bagages ou en soirée.',
      'Réservation conseillée aux horaires de pointe.',
    ],
    faq: [
      {
        question: 'Le service est-il adapté aux trajets avec bagages ?',
        answer:
          'Oui. Notre service de porte à porte est particulièrement adapté aux trajets avec bagages, en complément ou en alternative aux transports en commun.',
      },
    ],
  },
  {
    slug: 'taxi-le-vesinet',
    name: 'Le Vésinet',
    title: 'Taxi au Vésinet',
    postalCode: '78110',
    tagline: 'Transport premium au Vésinet',
    context: [
      'Le Vésinet, ville-parc réputée pour ses lacs, ses rivières et son urbanisme paysager, est l’une des communes résidentielles les plus prisées de l’Ouest parisien, desservie par le RER A.',
      'Un cadre élégant qui appelle un service de transport soigné et discret, à l’image de la commune.',
    ],
    needs: [
      'Transferts aéroports au départ du Vésinet.',
      'Déplacements professionnels vers Paris et La Défense.',
      'Trajets privés pour sorties et événements.',
      'Liaisons locales vers Saint-Germain-en-Laye et Chambourcy.',
    ],
    destinations: [
      { label: 'Roissy CDG / Orly', detail: 'Transferts aéroports.' },
      { label: 'La Défense', detail: 'Trajets d’affaires.' },
      { label: 'Paris Ouest', detail: 'Déplacements privés et professionnels.' },
      { label: 'Communes voisines', detail: 'Liaisons locales.' },
    ],
    practical: [
      'Prise en charge à l’adresse de votre choix au Vésinet.',
      'Service discret et soigné, sur réservation.',
      'Durées estimées lors de la demande.',
    ],
    faq: [
      {
        question: 'Proposez-vous un service discret ?',
        answer:
          'La discrétion et le soin apporté au service font partie de notre approche. Le transport fonctionne sur réservation, à l’adresse de votre choix.',
      },
    ],
  },
  {
    slug: 'taxi-marly-le-roi',
    name: 'Marly-le-Roi',
    title: 'Taxi à Marly-le-Roi',
    postalCode: '78160',
    tagline: 'Votre taxi premium à Marly-le-Roi',
    context: [
      'Marly-le-Roi, commune chargée d’histoire aux portes de la forêt domaniale, allie cadre résidentiel et proximité des grands axes de l’Ouest parisien.',
      'Sa situation permet de rejoindre aisément Paris, les aéroports et les communes voisines comme Chambourcy et Saint-Germain-en-Laye.',
    ],
    needs: [
      'Transferts aéroports depuis Marly-le-Roi.',
      'Déplacements professionnels vers Paris et La Défense.',
      'Trajets privés et sorties.',
      'Liaisons vers les gares et communes voisines.',
    ],
    destinations: [
      { label: 'Roissy CDG / Orly', detail: 'Transferts aéroports.' },
      { label: 'Paris / La Défense', detail: 'Trajets professionnels et privés.' },
      { label: 'Saint-Germain-en-Laye', detail: 'Liaison locale.' },
      { label: 'Chambourcy', detail: 'Liaison immédiate.' },
    ],
    practical: [
      'Prise en charge à l’adresse de votre choix à Marly-le-Roi.',
      'Service sur réservation.',
      'Réservation anticipée recommandée pour les départs matinaux.',
    ],
    faq: [
      {
        question: 'Puis-je réserver un trajet tôt le matin ?',
        answer:
          'Oui. Pour les départs matinaux, notamment vers les aéroports, une réservation anticipée est recommandée afin de garantir la disponibilité.',
      },
    ],
  },
  {
    slug: 'taxi-maisons-laffitte',
    name: 'Maisons-Laffitte',
    title: 'Taxi à Maisons-Laffitte',
    postalCode: '78600',
    tagline: 'Transport premium à Maisons-Laffitte',
    context: [
      'Maisons-Laffitte, « cité du cheval » célèbre pour son château et son parc, est une commune élégante de l’Ouest parisien, desservie par le RER A.',
      'Ses habitants et visiteurs y trouvent des besoins de transport variés, des transferts aéroports aux trajets professionnels vers Paris.',
    ],
    needs: [
      'Transferts aéroports au départ de Maisons-Laffitte.',
      'Déplacements professionnels vers Paris et La Défense.',
      'Trajets privés, événements hippiques et sorties.',
      'Liaisons locales vers les communes voisines.',
    ],
    destinations: [
      { label: 'Roissy CDG / Orly', detail: 'Transferts aéroports organisés.' },
      { label: 'La Défense', detail: 'Déplacements d’affaires.' },
      { label: 'Paris intra-muros', detail: 'Trajets privés et professionnels.' },
      { label: 'Chambourcy & Poissy', detail: 'Liaisons locales.' },
    ],
    practical: [
      'Prise en charge à l’adresse de votre choix à Maisons-Laffitte.',
      'Service sur réservation, adapté aux trajets avec bagages.',
      'Durées estimées selon le trafic lors de la demande.',
    ],
    faq: [
      {
        question: 'Desservez-vous Maisons-Laffitte pour les transferts aéroports ?',
        answer:
          'Oui. Nous organisons les transferts aéroports au départ de Maisons-Laffitte, avec une prise en charge de porte à porte sur réservation.',
      },
    ],
  },
  {
    slug: 'taxi-aigremont',
    name: 'Aigremont',
    title: 'Taxi à Aigremont',
    postalCode: '78240',
    tagline: 'Votre taxi premium à Aigremont, au calme des Yvelines',
    context: [
      'Aigremont est un petit village résidentiel des Yvelines, niché dans un écrin boisé entre Chambourcy, Saint-Germain-en-Laye et Mareil-Marly, et partageant le code postal 78240 avec Chambourcy.',
      'Ce cadre paisible, à l’écart des grands axes mais à quelques minutes de l’A14 et de l’A13, appelle un service de transport porte à porte, pratique là où les transports en commun sont peu présents.',
    ],
    needs: [
      'Transferts aéroports au départ d’Aigremont.',
      'Déplacements professionnels vers Paris et La Défense.',
      'Trajets privés et sorties en soirée.',
      'Liaisons vers la gare RER A de Saint-Germain-en-Laye.',
    ],
    destinations: [
      { label: 'Roissy CDG / Orly', detail: 'Transferts aéroports organisés à l’avance.' },
      { label: 'Saint-Germain-en-Laye (RER A)', detail: 'Accès rapide au réseau RER.' },
      { label: 'Paris / La Défense', detail: 'Déplacements professionnels et privés.' },
      { label: 'Chambourcy & communes voisines', detail: 'Liaisons locales immédiates.' },
    ],
    practical: [
      'Prise en charge à l’adresse de votre choix à Aigremont.',
      'Solution adaptée à un village peu desservi par les transports en commun.',
      'Réservation conseillée, surtout pour les départs matinaux.',
    ],
    faq: [
      {
        question: 'Desservez-vous le village d’Aigremont ?',
        answer:
          'Oui. Aigremont fait partie de notre zone immédiate autour de Chambourcy. La prise en charge se fait à l’adresse de votre choix, sur réservation.',
      },
      {
        question: 'Aigremont est-elle bien reliée aux aéroports ?',
        answer:
          'Nous organisons les transferts vers Roissy et Orly au départ d’Aigremont, avec une heure de prise en charge définie selon votre vol et une marge pour le trafic.',
      },
    ],
  },
  {
    slug: 'taxi-fourqueux',
    name: 'Fourqueux',
    title: 'Taxi à Fourqueux',
    postalCode: '78112',
    tagline: 'Transport premium à Fourqueux, aux portes de Saint-Germain',
    context: [
      'Fourqueux, commune déléguée rattachée à Saint-Germain-en-Laye depuis 2019, est un quartier résidentiel verdoyant réputé pour son golf et son cadre paisible, en lisière de la forêt de Saint-Germain.',
      'Sa proximité immédiate avec le centre de Saint-Germain-en-Laye et le RER A en fait un point de départ idéal, en particulier pour les trajets avec bagages ou en dehors des horaires de transports en commun.',
    ],
    needs: [
      'Transferts aéroports au départ de Fourqueux.',
      'Déplacements professionnels vers Paris et La Défense.',
      'Compléments au RER A de Saint-Germain-en-Laye.',
      'Trajets privés, sorties et événements.',
    ],
    destinations: [
      { label: 'Roissy CDG / Orly', detail: 'Transferts aéroports de porte à porte.' },
      { label: 'Saint-Germain-en-Laye centre', detail: 'Liaison immédiate (RER A, commerces).' },
      { label: 'La Défense', detail: 'Déplacements d’affaires.' },
      { label: 'Paris intra-muros', detail: 'Trajets privés et professionnels.' },
    ],
    practical: [
      'Prise en charge à l’adresse de votre choix à Fourqueux.',
      'Idéal avec des bagages ou en soirée, en complément du RER.',
      'Service sur réservation.',
    ],
    faq: [
      {
        question: 'Fourqueux fait-elle partie de Saint-Germain-en-Laye ?',
        answer:
          'Depuis 2019, Fourqueux est une commune déléguée rattachée à Saint-Germain-en-Laye. Nous y assurons la prise en charge à l’adresse de votre choix, sur réservation.',
      },
      {
        question: 'Proposez-vous une alternative au RER depuis Fourqueux ?',
        answer:
          'Oui. Notre service de porte à porte est particulièrement utile avec des bagages, en soirée ou pour un trajet direct sans correspondance.',
      },
    ],
  },
  {
    slug: 'taxi-mareil-marly',
    name: 'Mareil-Marly',
    title: 'Taxi à Mareil-Marly',
    postalCode: '78750',
    tagline: 'Votre taxi premium à Mareil-Marly',
    context: [
      'Mareil-Marly est une commune résidentielle des Yvelines, lovée dans un environnement vallonné et boisé entre Saint-Germain-en-Laye, Marly-le-Roi et L’Étang-la-Ville.',
      'Desservie par la gare de Mareil-Marly sur la ligne L du Transilien, la commune bénéficie d’un cadre calme ; notre service complète ces liaisons par un transport direct, utile pour les aéroports et les horaires décalés.',
    ],
    needs: [
      'Transferts aéroports au départ de Mareil-Marly.',
      'Déplacements professionnels vers Paris et La Défense.',
      'Compléments à la gare et au Transilien (ligne L).',
      'Trajets privés et sorties.',
    ],
    destinations: [
      { label: 'Roissy CDG / Orly', detail: 'Transferts aéroports planifiés.' },
      { label: 'La Défense', detail: 'Déplacements professionnels.' },
      { label: 'Saint-Germain-en-Laye (RER A)', detail: 'Liaison locale et correspondance.' },
      { label: 'Paris / gares parisiennes', detail: 'Trajets directs de porte à porte.' },
    ],
    practical: [
      'Prise en charge à l’adresse de votre choix à Mareil-Marly.',
      'Utile pour les trajets tôt le matin ou tard le soir, hors horaires de train.',
      'Service sur réservation.',
    ],
    faq: [
      {
        question: 'Desservez-vous Mareil-Marly ?',
        answer:
          'Oui. Mareil-Marly fait partie de notre zone autour de Saint-Germain-en-Laye et Marly-le-Roi. La prise en charge se fait à l’adresse de votre choix, sur réservation.',
      },
      {
        question: 'Puis-je réserver un trajet en dehors des horaires de train ?',
        answer:
          'Bien sûr. Notre service est particulièrement adapté aux départs matinaux et aux retours tardifs, lorsque le Transilien circule peu.',
      },
    ],
  },
  {
    slug: 'taxi-paris-ouest',
    name: 'Paris Ouest',
    title: 'Taxi Paris Ouest et Île-de-France',
    postalCode: '',
    tagline: 'Un service premium sur tout l’Ouest parisien',
    context: [
      'Paris Ouest regroupe les communes dynamiques situées entre la capitale et les Yvelines : un secteur résidentiel et économique majeur de l’Île-de-France.',
      'Depuis Chambourcy, nous rayonnons sur l’ensemble de cette zone et au-delà, pour vos trajets professionnels, privés et vos transferts aéroports.',
    ],
    needs: [
      'Transferts vers l’ensemble des aéroports franciliens.',
      'Déplacements professionnels vers Paris, La Défense et les pôles d’affaires.',
      'Trajets privés dans tout l’Ouest parisien.',
      'Liaisons entre communes et vers les gares.',
    ],
    destinations: [
      { label: 'Aéroports franciliens', detail: 'Roissy CDG, Orly, Le Bourget.' },
      { label: 'La Défense', detail: 'Premier quartier d’affaires européen.' },
      { label: 'Paris intra-muros', detail: 'Tous arrondissements.' },
      { label: 'Yvelines & Hauts-de-Seine', detail: 'Liaisons inter-communes.' },
    ],
    practical: [
      'Zone de service : Chambourcy, Paris Ouest et Île-de-France.',
      'Trajets de porte à porte sur réservation.',
      'Modalités et estimations communiquées lors de la demande.',
    ],
    faq: [
      {
        question: 'Quelle est votre zone de service exacte ?',
        answer:
          'Nous rayonnons depuis Chambourcy sur l’ensemble de Paris Ouest et de l’Île-de-France. N’hésitez pas à nous préciser votre trajet lors de votre demande.',
      },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}
