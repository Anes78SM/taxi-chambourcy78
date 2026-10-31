import { WhatsAppIcon, whatsappUrl } from '@/components/ui/WhatsAppIcon';
import { siteConfig } from '@/config/site';

/** Bouton flottant WhatsApp, visible sur toutes les pages. */
export function FloatingWhatsApp() {
  const { whatsapp } = siteConfig.contact;
  if (!whatsapp) return null;

  const href = whatsappUrl(
    whatsapp,
    'Bonjour, je souhaite obtenir des informations pour un trajet en taxi à Chambourcy.',
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 ring-1 ring-black/5 transition-colors duration-300 ease-premium hover:bg-[#1fab57]"
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 ease-premium group-hover:max-w-[170px] group-hover:pr-5 group-hover:opacity-100">
        Écrivez-nous
      </span>
    </a>
  );
}
