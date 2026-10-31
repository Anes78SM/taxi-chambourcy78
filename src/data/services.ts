import type { Service } from '@/types';

export const services: Service[] = [
  {
    slug: 'transfert-aeroport',
    name: 'Transferts aéroports',
    title: 'Transferts aéroports au départ de Chambourcy',
    tagline: 'Roissy CDG, Orly et Le Bourget en toute sérénité',
    cardDescription:
      'Roissy-Charles-de-Gaulle, Orly, Le Bourget et Beauvais. Une prise en charge organisée pour voyager l’esprit libre.',
    icon: 'Plane',
    image: '/images/services/airport.webp',
    imageAlt: 'Taxi à Chambourcy : break BMW bleu nuit, coffre ouvert, prêt pour un transfert aéroport',
    intro: [
      'Le transfert vers l’aéroport est un moment sensible : il conditionne la sérénité de tout un voyage. Nous organisons votre prise en charge à l’avance, avec une adresse de départ précise et une heure calculée en tenant compte du trajet et des marges d’enregistrement habituelles.',
      'Au retour, le principe est le même : vous indiquez votre vol, nous convenons ensemble du point de rendez-vous, et vous retrouvez un véhicule confortable sans attente inutile à la sortie de l’avion.',
    ],
    benefits: [
      {
        title: 'Départ anticipé et planifié',
        description:
          'Une heure de prise en charge définie ensemble selon votre vol et votre adresse, pour éviter le stress de dernière minute.',
      },
      {
        title: 'Confort pour les longs trajets',
        description:
          'Un véhicule soigné et un espace adapté pour vos bagages, idéal avant ou après un vol fatigant.',
      },
      {
        title: 'Trajet direct',
        description:
          'Une course privée de porte à porte, sans détour ni partage, pour arriver à l’heure que vous avez choisie.',
      },
    ],
    practical: [
      'Réservation conseillée à l’avance, en particulier pour les vols tôt le matin.',
      'Précisez votre numéro de vol pour les retours : le point de rendez-vous est convenu ensemble.',
      'Le temps de trajet dépend du trafic ; les durées ne sont jamais garanties et sont estimées lors de la demande.',
    ],
    destinations: [
      'Aéroport de Paris-Charles-de-Gaulle (Roissy CDG)',
      'Aéroport de Paris-Orly',
      'Aéroport de Paris-Le Bourget',
      'Aéroport de Beauvais-Tillé (sur demande)',
    ],
    faq: [
      {
        question: 'À quelle heure dois-je prévoir mon départ pour l’aéroport ?',
        answer:
          'Nous définissons l’heure de prise en charge ensemble, en fonction de votre adresse, de votre aéroport de départ et des marges d’enregistrement habituelles. Le trajet dépend du trafic, c’est pourquoi nous prévoyons toujours une marge raisonnable.',
      },
      {
        question: 'Comment se passe le retour d’aéroport ?',
        answer:
          'Vous nous transmettez votre numéro de vol et votre horaire d’arrivée. Nous convenons d’un point de rendez-vous précis à votre sortie, afin de limiter l’attente.',
      },
      {
        question: 'Puis-je voyager avec plusieurs bagages ?',
        answer:
          'Oui. Indiquez le nombre de passagers et de bagages lors de votre demande afin que le véhicule soit adapté à votre trajet.',
      },
    ],
  },
  {
    slug: 'taxi-professionnel',
    name: 'Taxi professionnel',
    title: 'Taxi pour vos déplacements professionnels',
    tagline: 'Un transport discret et ponctuel pour vos rendez-vous d’affaires',
    cardDescription:
      'Rendez-vous, gares et déplacements d’affaires. Un service discret et soigné pour vos trajets professionnels.',
    icon: 'Briefcase',
    image: '/images/services/business.webp',
    imageAlt: 'Intérieur lumineux et soigné d’un break BMW premium',
    intro: [
      'Pour vos rendez-vous et déplacements d’affaires, la régularité et la discrétion comptent autant que le confort. Nous proposons un transport pensé pour les professionnels : un cadre calme pour préparer une réunion, passer un appel ou simplement souffler entre deux étapes.',
      'Les trajets récurrents peuvent être organisés à l’avance afin de fluidifier votre agenda, depuis Chambourcy et les communes voisines vers Paris, les quartiers d’affaires et les principales gares.',
    ],
    benefits: [
      {
        title: 'Discrétion',
        description:
          'Un service sobre et respectueux de votre confidentialité, adapté aux déplacements sensibles.',
      },
      {
        title: 'Ponctualité',
        description:
          'Une prise en charge planifiée, pour des rendez-vous abordés sereinement.',
      },
      {
        title: 'Cadre de travail',
        description:
          'Un habitacle calme et confortable pour avancer entre deux réunions.',
      },
    ],
    practical: [
      'Trajets ponctuels ou récurrents organisés selon votre agenda.',
      'Possibilité de convenir d’un point de prise en charge fixe (bureau, domicile, gare).',
      'Facturation et modalités précisées lors de la demande.',
    ],
    destinations: [
      'La Défense et les quartiers d’affaires parisiens',
      'Gares parisiennes (Saint-Lazare, Montparnasse, Gare du Nord…)',
      'Centres de congrès et hôtels d’affaires',
      'Paris Ouest et Île-de-France',
    ],
    faq: [
      {
        question: 'Puis-je réserver des trajets réguliers ?',
        answer:
          'Oui. Les déplacements récurrents (même trajet, horaires fixes) peuvent être organisés à l’avance afin de simplifier votre organisation. Les modalités sont convenues ensemble.',
      },
      {
        question: 'Le service est-il adapté à un déplacement confidentiel ?',
        answer:
          'La discrétion fait partie de notre approche. Le service est sobre et respectueux de votre confidentialité.',
      },
    ],
  },
  {
    slug: 'trajets-prives',
    name: 'Trajets privés',
    title: 'Trajets privés et occasions particulières',
    tagline: 'Soirées, restaurants, événements : voyagez à votre rythme',
    cardDescription:
      'Soirées, shopping, restaurants et événements. Un trajet privé pour profiter pleinement du moment.',
    icon: 'Sparkles',
    image: '/images/services/private.webp',
    imageAlt: 'Break BMW bleu nuit, portière ouverte, pour vos trajets privés',
    intro: [
      'Certaines occasions méritent un transport à la hauteur du moment. Pour une soirée, un dîner, une sortie culturelle ou un événement familial, nous assurons un trajet privé qui vous permet de profiter pleinement, sans vous soucier du stationnement ni du retour.',
      'Vous choisissez vos horaires, nous nous occupons du reste, dans un véhicule confortable et un service attentionné.',
    ],
    benefits: [
      {
        title: 'Liberté',
        description:
          'Pas de stationnement à chercher, pas de contrainte au retour : vous profitez du moment.',
      },
      {
        title: 'Confort',
        description:
          'Un véhicule soigné pour une sortie agréable, de jour comme de nuit.',
      },
      {
        title: 'Souplesse',
        description:
          'Des horaires définis selon vos envies, aller simple ou aller-retour.',
      },
    ],
    practical: [
      'Réservation anticipée recommandée pour les soirées et week-ends.',
      'Aller simple ou aller-retour, selon votre programme.',
      'Trajets privés dans Chambourcy, Paris Ouest et l’ensemble de l’Île-de-France.',
    ],
    destinations: [
      'Restaurants et établissements parisiens',
      'Théâtres, salles de spectacle et musées',
      'Événements familiaux et réceptions',
      'Sorties shopping (Paris, centres commerciaux)',
    ],
    faq: [
      {
        question: 'Puis-je réserver un aller-retour pour une soirée ?',
        answer:
          'Oui. Vous indiquez vos horaires souhaités pour l’aller et le retour, et nous organisons le trajet en conséquence.',
      },
      {
        question: 'Le service est-il disponible en soirée ?',
        answer:
          'Le service fonctionne sur réservation. Pour les soirées, une réservation anticipée est recommandée afin de garantir la disponibilité.',
      },
    ],
  },
  {
    slug: 'mise-a-disposition',
    name: 'Mise à disposition',
    title: 'Mise à disposition avec chauffeur',
    tagline: 'À l’heure, à la demi-journée ou à la journée, selon vos besoins',
    cardDescription:
      'À l’heure, à la demi-journée ou sur plusieurs rendez-vous. Un véhicule et un chauffeur dédiés à votre programme.',
    icon: 'Clock',
    image: '/images/services/disposal.webp',
    imageAlt: 'Break BMW bleu nuit à disposition, stationné devant un portail',
    intro: [
      'Lorsque votre journée comporte plusieurs étapes, la mise à disposition est la solution la plus souple. Un véhicule et un chauffeur restent dédiés à votre programme : rendez-vous successifs, visites, événement sur une journée ou déplacement comportant des temps d’attente.',
      'Vous définissez les grandes lignes de votre journée, nous adaptons le déroulé au fil de vos besoins.',
    ],
    benefits: [
      {
        title: 'Un véhicule dédié',
        description:
          'Le chauffeur vous accompagne tout au long de votre programme, avec les temps d’attente inclus.',
      },
      {
        title: 'Flexibilité',
        description:
          'Le déroulé s’ajuste en cours de journée si votre emploi du temps évolue.',
      },
      {
        title: 'Simplicité',
        description:
          'Un seul interlocuteur pour l’ensemble de vos trajets de la journée.',
      },
    ],
    practical: [
      'Formules à l’heure, à la demi-journée ou à la journée.',
      'Idéal pour les journées à rendez-vous multiples ou les événements.',
      'Durée et modalités définies lors de la demande ; aucun tarif n’est annoncé sans échange préalable.',
    ],
    destinations: [
      'Journées de rendez-vous professionnels',
      'Événements et cérémonies',
      'Visites et itinéraires à étapes multiples',
      'Déplacements en Île-de-France',
    ],
    faq: [
      {
        question: 'Comment fonctionne la mise à disposition ?',
        answer:
          'Un véhicule et un chauffeur restent dédiés à votre programme pour la durée convenue (heure, demi-journée ou journée), temps d’attente inclus. Vous nous communiquez les grandes lignes de votre journée.',
      },
      {
        question: 'Puis-je modifier mon programme en cours de journée ?',
        answer:
          'Oui, dans la limite de la durée réservée. La souplesse est l’intérêt principal de cette formule.',
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
