import { Hero } from '@/components/home/Hero';
import { BookingSection } from '@/components/home/BookingSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { WhyChoose } from '@/components/home/WhyChoose';
import { DestinationsSection } from '@/components/home/DestinationsSection';
import { AboutSection } from '@/components/home/AboutSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { BlogPreview } from '@/components/home/BlogPreview';
import { FaqSection } from '@/components/home/FaqSection';
import { CTASection } from '@/components/home/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllPosts } from '@/lib/blog';
import { homeFaq } from '@/data/faq';
import { faqSchema } from '@/lib/seo';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />
      <Hero />
      <BookingSection />
      <ServicesSection />
      <WhyChoose />
      <DestinationsSection />
      <AboutSection />
      <ReviewsSection />
      <BlogPreview posts={posts} />
      <FaqSection items={homeFaq} />
      <CTASection />
    </>
  );
}
