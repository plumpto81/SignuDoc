import localFont from "next/font/local";

import {
  resolveSignatureStyle,
  type SignatureStyleId,
} from "@/lib/signature-styles";

// The same files the finished PDF embeds (src/lib/services/pdf-fonts.ts), so
// a typed signature looks on screen as it will on the document.
const allura = localFont({
  display: "block",
  fallback: ["cursive"],
  src: "../../assets/fonts/Allura-Regular.ttf",
});
const dancingScript = localFont({
  display: "block",
  fallback: ["cursive"],
  src: "../../assets/fonts/DancingScript-Variable.ttf",
});
const greatVibes = localFont({
  display: "block",
  fallback: ["cursive"],
  src: "../../assets/fonts/GreatVibes-Regular.ttf",
});
const sacramento = localFont({
  display: "block",
  fallback: ["cursive"],
  src: "../../assets/fonts/Sacramento-Regular.ttf",
});

const fontFamilies: Record<SignatureStyleId, string> = {
  allura: allura.style.fontFamily,
  "dancing-script": dancingScript.style.fontFamily,
  "great-vibes": greatVibes.style.fontFamily,
  sacramento: sacramento.style.fontFamily,
};

/** The CSS font-family for a signature style; unknown ones get the default. */
export function signatureFontFamily(style: unknown): string {
  return fontFamilies[resolveSignatureStyle(style)];
}
