import mountainbike from "@/images/mountainbike.jpg";
import roadBike from "@/images/roadbike.jpg";
import hybridBike from "@/images/hybridbike.webp";
import kidsBike from "@/images/kidsbike.jpg";

export function getProductImage(imageUrl: string | null | undefined, typeOrName?: string): string {
  if (imageUrl) {
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
    return `http://localhost:5000${imageUrl}`;
  }

  const normalized = (typeOrName || "").toLowerCase();
  if (
    normalized.includes("mountain") ||
    normalized.includes("marlin") ||
    normalized.includes("talon")
  ) {
    return mountainbike.src;
  }
  if (
    normalized.includes("road") ||
    normalized.includes("allez") ||
    normalized.includes("caad")
  ) {
    return roadBike.src;
  }
  if (
    normalized.includes("hybrid") ||
    normalized.includes("fx") ||
    normalized.includes("escape") ||
    normalized.includes("city")
  ) {
    return hybridBike.src;
  }
  if (
    normalized.includes("kids") ||
    normalized.includes("kid") ||
    normalized.includes("precaliber")
  ) {
    return kidsBike.src;
  }

  return hybridBike.src;
}
