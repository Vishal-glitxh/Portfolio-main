import { useEffect, useState } from "react";

export const lightweightQuery = "(max-width: 1024px), (pointer: coarse), (prefers-reduced-motion: reduce)";
export const isLightweightLayout = () => window.matchMedia(lightweightQuery).matches;
export function useLightweightLayout() {
  const [lightweight, setLightweight] = useState(isLightweightLayout);
  useEffect(() => {
    const media = window.matchMedia(lightweightQuery);
    const update = () => setLightweight(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return lightweight;
}
