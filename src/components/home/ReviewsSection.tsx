import { Star, ExternalLink, PenLine } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Marquee } from '@/components/ui/Marquee';
import { reviews, googleBusiness } from '@/data/reviews';
import { GoogleMapEmbed } from '@/components/home/GoogleMapEmbed';
import { formatDate, cn } from '@/lib/utils';

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  const value = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className={cn('flex gap-0.5', className)} role="img" aria-label={`Note : ${value} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn('h-4 w-4', i < value ? 'fill-[#e9b43e] text-[#e9b43e]' : 'text-white/25')}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  if (reviews.length === 0) return null;

  const ratingLabel = googleBusiness.rating.toFixed(1).replace('.', ',');
  const hasLink = googleBusiness.url !== '';

  return (
    <section id="avis" className="scroll-mt-24 overflow-hidden bg-ink-800 py-20 text-white sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Avis clients"
            title="Ce que disent nos clients"
            description="Anes a repris en 2026 l’activité de taxi de Romuald, salué ci-dessous par ses fidèles clients. Tous ces avis sont authentiques, publiés sur notre fiche Google."
            tone="light"
          />
          {hasLink ? (
            <a
              href={googleBusiness.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 py-1 text-sm text-mist transition-colors hover:text-cream"
            >
              <Stars rating={googleBusiness.rating} />
              <span>
                {ratingLabel}/5 · {googleBusiness.reviewCount} avis sur Google
              </span>
              <ExternalLink className="h-4 w-4 text-champagne" aria-hidden />
            </a>
          ) : (
            <div className="flex items-center gap-3 text-sm text-mist">
              <Stars rating={googleBusiness.rating} />
              <span>
                {ratingLabel}/5 · {googleBusiness.reviewCount} avis Google
              </span>
            </div>
          )}
        </div>
      </Container>

      {/* Avis en bandeau défilant */}
      <Marquee className="mt-12" durationSec={70} gap="1.25rem" ariaLabel="Avis clients Google">
        {reviews.map((review, index) => (
          <figure
            key={`${review.author}-${index}`}
            className="flex w-[290px] shrink-0 flex-col rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-6 sm:w-[330px]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-grid h-10 w-10 place-items-center rounded-full bg-champagne/15 text-sm font-semibold text-champagne">
                {initials(review.author)}
              </span>
              <div>
                <figcaption className="text-sm font-semibold text-white">{review.author}</figcaption>
                <span className="text-xs text-mist">
                  {review.date ? formatDate(review.date) : (review.relativeTime ?? 'Avis Google')}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Stars rating={review.rating} />
            </div>
            <blockquote className="mt-4 line-clamp-5 flex-1 text-sm leading-relaxed text-cream/85">
              “{review.text}”
            </blockquote>
            <span className="mt-5 text-[0.7rem] uppercase tracking-wide text-mist">
              Avis publié sur Google
            </span>
          </figure>
        ))}
      </Marquee>

      {/* Fiche Google en direct : carte Maps + note + CTA */}
      <Container>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch">
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-white/10">
            <GoogleMapEmbed className="h-full min-h-[300px] w-full" />
          </div>

          <div className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-8 text-center">
            <p className="eyebrow text-champagne">Note Google</p>
            <p className="mt-3 font-serif text-5xl leading-none text-white">
              {ratingLabel}
              <span className="text-2xl text-mist">/5</span>
            </p>
            <Stars rating={googleBusiness.rating} className="mt-4 justify-center" />
            <p className="mt-2 text-sm text-mist">{googleBusiness.reviewCount} avis sur Google</p>
            {hasLink && (
              <a
                href={googleBusiness.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius)] border border-champagne bg-champagne px-5 py-3 text-xs font-semibold text-ink-900 transition-colors hover:bg-champagne-light"
              >
                <PenLine className="h-4 w-4" aria-hidden />
                Voir / laisser un avis
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
