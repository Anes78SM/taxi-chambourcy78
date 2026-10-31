import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { BookingSection } from '@/components/home/BookingSection';
import { HowToBookSection } from '@/components/home/HowToBookSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { WhyChoose } from '@/components/home/WhyChoose';
import { ClientsSection } from '@/components/home/ClientsSection';
import { DestinationsSection } from '@/components/home/DestinationsSection';
import { PricingSection } from '@/components/home/PricingSection';
import { AboutSection } from '@/components/home/AboutSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { BlogPreview } from '@/components/home/BlogPreview';
import { FaqSection } from '@/components/home/FaqSection';
import { CTASection } from '@/components/home/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllPosts } from '@/lib/blog';
import { homeFaq } from '@/data/faq';
import { faqSchema } from '@/lib/seo';

// Title + meta description propres à l'accueil (mot-clé « taxi à Chambourcy » en début).
export const metadata: Metadata = {
  title: {
    absolute: 'Taxi à Chambourcy (78) — Réservation, tarifs & transport 7j/7',
  },
  description:
    'Taxi à Chambourcy (78) : réservation 7j/7, transferts gares et aéroports, tarifs réglementés 2026. Réservez à l’avance ou pour une course immédiate.',
};

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />
      <Hero />
      <ClientsSection />
      <BookingSection />
      <HowToBookSection />
      <ServicesSection />
      <WhyChoose />
      <DestinationsSection />
      <PricingSection />
      <AboutSection />
      <ReviewsSection />
      <BlogPreview posts={posts} />
      <FaqSection items={homeFaq} />
      <CTASection />
    </>
  );
}
