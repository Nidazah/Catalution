import {
  Award,
  BarChart3,
  Boxes,
  Briefcase,
  CircleDot,
  Compass,
  Handshake,
  Layers,
  Lightbulb,
  Repeat2,
  Rocket,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

// Single source of truth for the icons that can be attached to a service
// (homepage service tiles, /admin/content Services items, and the
// /admin/services module). Keys are the same lowercase, no-dash slugs
// already stored in the database (e.g. "waves", "circledot") so existing
// data keeps working — new options just extend the set.
export const SERVICE_ICONS: { value: string; label: string; Icon: LucideIcon }[] = [
  { value: "waves", label: "Waves", Icon: Waves },
  { value: "boxes", label: "Boxes", Icon: Boxes },
  { value: "users", label: "Users", Icon: Users },
  { value: "sparkles", label: "Sparkles", Icon: Sparkles },
  { value: "circledot", label: "Circle dot", Icon: CircleDot },
  { value: "repeat", label: "Repeat", Icon: Repeat2 },
  { value: "zap", label: "Zap", Icon: Zap },
  { value: "target", label: "Target", Icon: Target },
  { value: "rocket", label: "Rocket", Icon: Rocket },
  { value: "shield", label: "Shield", Icon: Shield },
  { value: "trendingup", label: "Trending up", Icon: TrendingUp },
  { value: "handshake", label: "Handshake", Icon: Handshake },
  { value: "lightbulb", label: "Lightbulb", Icon: Lightbulb },
  { value: "award", label: "Award", Icon: Award },
  { value: "briefcase", label: "Briefcase", Icon: Briefcase },
  { value: "barchart", label: "Bar chart", Icon: BarChart3 },
  { value: "compass", label: "Compass", Icon: Compass },
  { value: "layers", label: "Layers", Icon: Layers },
];

const SERVICE_ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
  SERVICE_ICONS.map(({ value, Icon }) => [value, Icon]),
);

/** Look up a service icon by its stored slug, falling back to Sparkles for unknown/empty values. */
export function getServiceIcon(name?: string | null): LucideIcon {
  if (!name) return Sparkles;
  return SERVICE_ICON_MAP[name.toLowerCase().trim()] ?? Sparkles;
}
