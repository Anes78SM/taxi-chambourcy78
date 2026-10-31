import type { FaqItem } from '@/types';

/** FAQ générale affichée sur la page d'accueil (alimente aussi le JSON-LD FAQPage). */
export const homeFaq: FaqItem[] = [
  {
    question: 'Comment réserver un taxi à Chambourcy ?',
    answer:
      'Remplissez le formulaire en ligne ou appelez-nous au 06 07 29 66 67, également joignable par WhatsApp. Ensuite, précisez votre départ, votre destination, la date, l’heure et le nombre de passagers et de bagages. Enfin, nous revenons vers vous pour confirmer. Aucune réservation ne part automatiquement.',
  },
  {
    question: 'Quels sont les tarifs des taxis dans les Yvelines en 2026 ?',
    answer:
      'Dans les Yvelines, en 2026 : prise en charge 3,00 €, kilomètre de 1,00 € à 3,00 € selon le tarif A, B, C ou D, heure d’attente 41,56 € et minimum de course 8 €. Par ailleurs, des suppléments réglementés s’ajoutent : 2 € par bagage encombrant et 4 € dès le 5ᵉ passager. Vous trouvez le détail dans notre grille tarifaire.',
  },
  {
    question: 'Quel est le prix d’un taxi pour 10 km à Chambourcy ?',
    answer:
      'Comptez environ 13 € à 23 € pour 10 km de jour, selon que le taxi revient en charge (tarif A) ou à vide (tarif C) : prise en charge 3,00 € + 10 km. De nuit, le dimanche et les jours fériés, la fourchette monte à 18 € – 33 €. L’attente et les suppléments s’ajoutent ; le taximètre fait foi.',
  },
  {
    question: 'Comment calcule-t-on le prix d’une course ?',
    answer:
      'Le taximètre additionne trois éléments : la prise en charge, la distance et le temps d’attente. D’abord, le tarif kilométrique varie selon le jour, l’heure et le retour du taxi. Ensuite, des suppléments réglementés peuvent s’ajouter. Dans tous les cas, le minimum de course reste de 8 €.',
  },
  {
    question: 'Comment connaître le prix de ma course ?',
    answer:
      'Demandez une estimation avant le départ : indiquez votre adresse, votre destination et votre horaire. Nous vous donnons alors une fourchette indicative. Toutefois, le taximètre fixe le prix définitif. En effet, il additionne la prise en charge, la distance et le temps d’attente, sans dépasser les tarifs réglementés.',
  },
  {
    question: 'Faut-il réserver à l’avance ?',
    answer:
      'Oui, surtout pour une gare, un aéroport ou un rendez-vous à heure fixe. Ainsi, vous avez un chauffeur à l’heure convenue, bagages compris. Pour un départ tôt le matin ou tard le soir, anticipez davantage. Une course de dernière minute reste toutefois possible, selon les disponibilités.',
  },
  {
    question: 'Peut-on réserver un taxi pour Orly ou Roissy depuis Chambourcy ?',
    answer:
      'Oui. Nous assurons les transferts vers Paris-Charles-de-Gaulle, Orly et Le Bourget. Réservez à l’avance : précisez votre heure de départ ou votre numéro de vol, ainsi que vos passagers et bagages. Le taximètre calcule ensuite le prix selon le tarif des Yvelines. N’hésitez donc pas à demander une estimation à la réservation.',
  },
  {
    question: 'Proposez-vous un taxi conventionné (transport médical remboursé) ?',
    answer:
      'Non, nous ne réalisons pas de transport conventionné par l’Assurance Maladie. Néanmoins, nous vous conduisons à vos rendez-vous médicaux : consultations, examens ou hôpital de Poissy–Saint-Germain. Dans ce cas, nous facturons la course au tarif réglementé, sans prise en charge CPAM.',
  },
  {
    question: 'Quelles zones desservez-vous ?',
    answer:
      'Depuis Chambourcy, notre service rayonne sur Paris Ouest et l’Île-de-France. Nous desservons notamment Saint-Germain-en-Laye, Poissy, Orgeval, Aigremont, Fourqueux, Mareil-Marly, Le Pecq, Le Vésinet, Marly-le-Roi et Maisons-Laffitte. Votre commune n’y figure pas ? Contactez-nous pour confirmation.',
  },
  {
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer:
      'Vous réglez votre course par carte bancaire (Visa, Mastercard) ou en espèces. Par ailleurs, vous pouvez préciser votre moyen de paiement dès la réservation.',
  },
  {
    question: 'Puis-je voyager avec des bagages ?',
    answer:
      'Oui. Indiquez simplement le nombre de passagers et de bagages lors de votre demande. Ainsi, nous adaptons le véhicule à votre trajet, notamment pour les transferts aéroports. Par ailleurs, un supplément réglementé peut s’appliquer aux bagages encombrants.',
  },
];
