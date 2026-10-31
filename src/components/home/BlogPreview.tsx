import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { BlogCard } from '@/components/blog/BlogCard';
import { Reveal } from '@/components/ui/Reveal';
import type { BlogPost } from '@/types';

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-[#f7f4ef] py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Le journal"
            title="Conseils et actualités"
            description="Nos articles pour préparer vos trajets et mieux connaître nos services."
          />
          <Button href="/blog" variant="ghost" className="shrink-0">
            Tous les articles →
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <Reveal key={post.slug} delay={index * 90}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
