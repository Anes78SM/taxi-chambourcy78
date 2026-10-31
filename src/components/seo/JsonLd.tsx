/**
 * Composant réutilisable pour injecter des données structurées JSON-LD.
 * Les données doivent toujours refléter le contenu réellement visible sur la page.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
