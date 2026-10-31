import type { FaqItem } from '@/types';

/** FAQ générale affichée sur la page d'accueil. */
export const homeFaq: FaqItem[] = [
  {
    question: 'Comment réserver un trajet ?',
    answer:
      'Remplissez le formulaire de réservation en ligne en précisant votre trajet, la date, l’heure et le nombre de passagers. Votre demande est préparée pour être transmise au professionnel, qui vous recontacte pour confirmer les modalités. Aucune réservation n’est validée automatiquement.',
  },
  {
    question: 'Proposez-vous des transferts vers les aéroports ?',
    answer:
      'Oui. Nous assurons les transferts vers Roissy-Charles-de-Gaulle, Orly et Le Bourget, au départ de Chambourcy et des communes voisines. L’heure de prise en charge est définie ensemble selon votre vol.',
  },
  {
    question: 'Quelles zones desservez-vous ?',
    answer:
      'Notre service rayonne depuis Chambourcy sur l’ensemble de Paris Ouest et de l’Île-de-France : Saint-Germain-en-Laye, Poissy, Orgeval, Le Pecq, Le Vésinet, Marly-le-Roi, Maisons-Laffitte et les communes voisines.',
  },
  {
    question: 'Faut-il réserver à l’avance ?',
    answer:
      'Le service fonctionne sur réservation. Une réservation anticipée est fortement recommandée pour les départs matinaux, les transferts aéroports et les trajets en soirée, afin de garantir la disponibilité.',
  },
  {
    question: 'Comment connaître le tarif de mon trajet ?',
    answer:
      'Le tarif et les modalités vous sont communiqués directement par le professionnel après réception de votre demande. Aucun prix n’est annoncé automatiquement sur le site.',
  },
  {
    question: 'Puis-je voyager avec des bagages ?',
    answer:
      'Oui. Indiquez le nombre de passagers et de bagages lors de votre demande afin que le véhicule soit adapté à votre trajet, notamment pour les transferts aéroports.',
  },
];
