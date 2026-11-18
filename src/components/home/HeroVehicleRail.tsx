import Image from 'next/image';
import Link from 'next/link';

/** Photos réelles de la BMW break noire présentées dans la colonne du hero. */
const photos = [
  {
    src: '/images/vehicule/profil-g7.webp',
    alt: 'Taxi à Chambourcy : break BMW noir vu de profil, siglé G7',
  },
  {
    src: '/images/vehicule/avant.webp',
    alt: 'Taxi à Chambourcy : face avant du break BMW noir',
  },
  {
    src: '/images/vehicule/interieur.webp',
    alt: 'Taxi à Chambourcy : intérieur spacieux du break BMW, portière ouverte',
  },
];

/**
 * Colonne 20 % du hero (desktop) : les photos du véhicule noir empilées sur
 * toute la hauteur. Chaque vignette mène à la galerie complète (/a-propos).
 */
export function HeroVehicleRail() {
  return (
    <aside className="relative z-10 hidden w-1/5 shrink-0 flex-col gap-2 p-2 lg:flex">
      {photos.map((photo, index) => (
        <Link
          key={photo.src}
          href="/a-propos"
          aria-label={`${photo.alt}, voir la galerie du véhicule`}
          className={`group relative block w-full flex-1 overflow-hidden rounded-[var(--radius-lg)] shadow-card ring-1 transition-all duration-300 ease-premium ${
            index === 0 ? 'ring-2 ring-champagne' : 'ring-champagne/20 hover:ring-champagne/50'
          }`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="20vw"
            className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(8,13,16,0) 55%, rgba(8,13,16,0.4) 100%)' }}
          />
        </Link>
      ))}
    </aside>
  );
}
