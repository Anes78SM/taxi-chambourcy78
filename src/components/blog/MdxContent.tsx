import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { slugify, nodeToText } from '@/lib/mdx';

/** Titre avec ancre auto-générée (cohérente avec le sommaire). */
function heading(Tag: 'h2' | 'h3') {
  return function Heading({ children }: { children?: React.ReactNode }) {
    const id = slugify(nodeToText(children));
    return (
      <Tag id={id}>
        <a href={`#${id}`} className="anchor-link">
          {children}
        </a>
      </Tag>
    );
  };
}

/** Lien : utilise next/link pour la navigation interne. */
function Anchor({ href = '', children }: { href?: string; children?: React.ReactNode }) {
  const isInternal = href.startsWith('/') && !href.startsWith('//');
  if (isInternal) {
    return <Link href={href}>{children}</Link>;
  }
  const external = href.startsWith('http');
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}

const components = {
  h2: heading('h2'),
  h3: heading('h3'),
  a: Anchor,
};

/** Rend le contenu MDX d'un article dans le style éditorial du site. */
export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-content">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
