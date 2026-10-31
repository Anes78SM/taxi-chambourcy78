import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { BookingForm } from '@/components/booking/BookingForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { siteConfig, hasRealContact } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Contact & réservation',
  description:
    `Contactez ${siteConfig.name} pour organiser votre trajet : transferts aéroports, déplacements professionnels et trajets privés en Île-de-France.`,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="Organisons votre trajet"
        description="Transmettez votre demande via le formulaire. Nous revenons vers vous pour confirmer les modalités et le tarif."
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="font-serif text-2xl text-ink-900">Nous joindre</h2>
              <ul className="mt-8 space-y-6 text-sm">
                <li className="flex gap-4">
                  <Phone className="h-5 w-5 shrink-0 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                  <div>
                    <p className="font-semibold text-ink-900">Téléphone</p>
                    {hasRealContact ? (
                      <a href={siteConfig.contact.phoneHref} className="text-ink-800/75 hover:text-ink-900">
                        {siteConfig.contact.phone}
                      </a>
                    ) : (
                      <p className="text-ink-800/60">Numéro professionnel à configurer.</p>
                    )}
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="h-5 w-5 shrink-0 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                  <div>
                    <p className="font-semibold text-ink-900">E-mail</p>
                    {hasRealContact ? (
                      <a href={siteConfig.contact.emailHref} className="text-ink-800/75 hover:text-ink-900">
                        {siteConfig.contact.email}
                      </a>
                    ) : (
                      <p className="text-ink-800/60">Adresse e-mail à configurer.</p>
                    )}
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin className="h-5 w-5 shrink-0 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                  <div>
                    <p className="font-semibold text-ink-900">Zone de service</p>
                    <p className="text-ink-800/75">
                      {siteConfig.address.city} ({siteConfig.address.postalCode}) · {siteConfig.serviceArea}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock className="h-5 w-5 shrink-0 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                  <div>
                    <p className="font-semibold text-ink-900">Disponibilité</p>
                    <p className="text-ink-800/75">{siteConfig.hours.label}</p>
                    <p className="mt-1 text-xs text-ink-800/55">{siteConfig.hours.note}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 font-serif text-2xl text-ink-900">Demande de trajet</h2>
              <BookingForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
