import {
  Plane,
  Briefcase,
  Sparkles,
  Clock,
  ShieldCheck,
  MapPin,
  Star,
  Car,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  Plane,
  Briefcase,
  Sparkles,
  Clock,
  ShieldCheck,
  MapPin,
  Star,
  Car,
};

type IconProps = {
  name: string;
  className?: string;
};

/** Rend une icône lucide à partir de son nom (défini dans les données). */
export function Icon({ name, className }: IconProps) {
  const Cmp = icons[name] ?? Car;
  return <Cmp className={className} aria-hidden strokeWidth={1.5} />;
}
