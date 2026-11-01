/**
 * Composant réutilisable pour injecter des données structurées JSON-LD.
 * Les données doivent toujours refléter le contenu réellement visible sur la page.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  // Échappe « < » pour empêcher toute rupture de balise </script> (durcissement XSS).
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
