import { siteConfig } from '@/config/site';
import { googleBusiness } from '@/data/reviews';
import { services } from '@/data/services';
import { locations } from '@/data/locations';
import { getAllPosts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

/**
 * Fichier de contexte pour les assistants IA (voir https://llmstxt.org).
 * Résume l'activité et pointe vers les pages clés. Généré à partir de la
 * configuration et des données du site (reflète le domaine réel en production).
 */
export function GET() {
  const posts = getAllPosts();
  const ratingLabel = googleBusiness.rating.toFixed(1).replace('.', ',');

  const lines: string[] = [
    `# ${siteConfig.name}`,
    '',
    `> Service de taxi premium à ${siteConfig.address.city} (${siteConfig.address.postalCode}, ${siteConfig.address.region}) et dans l'Ouest parisien : transferts aéroports (Roissy CDG, Orly, Le Bourget), déplacements professionnels, trajets privés et mise à disposition. Réservation sur demande. Note Google : ${ratingLabel}/5 (${googleBusiness.reviewCount} avis).`,
    '',
    `${siteConfig.name} assure des trajets de porte à porte dans ${siteConfig.serviceArea}. Service ponctuel, discret et soigné, pour les particuliers comme pour les professionnels. Téléphone : ${siteConfig.contact.phone}. Zone de service : ${siteConfig.address.city} et communes voisines des Yvelines.`,
    '',
    '## Services',
    ...services.map(
      (s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}) : ${s.tagline}`,
    ),
    '',
    '## Zones desservies',
    ...locations.map((l) => `- [${l.title}](${absoluteUrl(`/zones/${l.slug}`)})`),
    '',
    '## Blog (conseils pratiques)',
    ...posts.map((p) => `- [${p.frontmatter.title}](${absoluteUrl(`/blog/${p.slug}`)})`),
    '',
    '## Informations',
    `- [Réserver un trajet](${absoluteUrl('/#reservation')})`,
    `- [À propos](${absoluteUrl('/a-propos')})`,
    `- [Contact](${absoluteUrl('/contact')})`,
    `- [Mentions légales](${absoluteUrl('/mentions-legales')})`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
