import { availability } from "@/lib/availability";

const TONE = {
  warn: "bg-amber-100 text-amber-800",
  info: "bg-blue-100 text-blue-800",
  muted: "bg-gray-200 text-gray-600",
};

export default function AvailabilityBadge({ product, className = "" }) {
  const { badge, tone } = availability(product);
  if (!badge) return null;
  return (
    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${TONE[tone]} ${className}`}>
      {badge}
    </span>
  );
}
