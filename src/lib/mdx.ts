export type TocEntry = { id: string; text: string; level: 2 | 3 };

/** Slugify cohérent utilisé à la fois pour les ancres et le sommaire. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // retire les accents
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Extrait un texte lisible à partir de nœuds React (pour générer une ancre). */
export function nodeToText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    // @ts-expect-error — accès générique aux children
    return nodeToText(node.props?.children);
  }
  return '';
}

/** Construit un sommaire à partir des titres markdown (## et ###). */
export function extractToc(markdown: string): TocEntry[] {
  const lines = markdown.split('\n');
  const toc: TocEntry[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.*)$/.exec(line.trim());
    if (match) {
      const level = match[1]!.length as 2 | 3;
      const text = match[2]!.replace(/\s*#+\s*$/, '').trim();
      toc.push({ id: slugify(text), text, level });
    }
  }
  return toc;
}
