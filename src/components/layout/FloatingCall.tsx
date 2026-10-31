import { Phone } from 'lucide-react';
import { siteConfig, hasRealContact } from '@/config/site';

/** Bouton flottant d'appel, affiché sur mobile/tablette (au-dessus du bouton WhatsApp). */
export function FloatingCall() {
  if (!hasRealContact) return null;

  return (
    <a
      href={siteConfig.contact.phoneHref}
      aria-label={`Appeler le ${siteConfig.contact.phone}`}
      className="group fixed bottom-[5.75rem] right-5 z-40 flex items-center rounded-full bg-champagne text-ink-900 shadow-lg shadow-black/25 ring-1 ring-black/5 transition-colors duration-300 ease-premium hover:bg-champagne-light lg:hidden"
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center">
        <Phone className="h-6 w-6" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 ease-premium group-hover:max-w-[150px] group-hover:pr-5 group-hover:opacity-100">
        Appelez-nous
      </span>
    </a>
  );
}
