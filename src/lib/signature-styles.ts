import { z } from "zod";

// The script styles a typed signature can be drawn in. The signing page shows
// each style with the same font file the finished PDF embeds, so what the
// signer picks is what lands on the document. Adding a style means adding its
// font file under src/assets/fonts, a reader in pdf-fonts.ts and a localFont
// in src/components/signing/signature-fonts.ts.
export const signatureStyleIds = [
  "great-vibes",
  "dancing-script",
  "allura",
  "sacramento",
] as const;

export type SignatureStyleId = (typeof signatureStyleIds)[number];

/** Typed signatures saved before styles existed were drawn in Great Vibes. */
export const DEFAULT_SIGNATURE_STYLE: SignatureStyleId = "great-vibes";

export const signatureStyleLabels: Record<SignatureStyleId, string> = {
  allura: "Allura",
  "dancing-script": "Dancing Script",
  "great-vibes": "Great Vibes",
  sacramento: "Sacramento",
};

export const signatureStyleSchema = z.enum(signatureStyleIds);

export function isSignatureStyleId(value: unknown): value is SignatureStyleId {
  return signatureStyleSchema.safeParse(value).success;
}

/** A stored style, or the default for a missing or unknown one. */
export function resolveSignatureStyle(value: unknown): SignatureStyleId {
  return isSignatureStyleId(value) ? value : DEFAULT_SIGNATURE_STYLE;
}

/** The words at the top of the frame drawn around a signature. */
export const SIGNATURE_FRAME_LABEL = "Signed by:";

/** The short id under a framed signature: the signer id's first 15 hex digits. */
export function signatureFrameId(signerId: string): string {
  const digits = signerId
    .replace(/[^0-9a-f]/gi, "")
    .toUpperCase()
    .slice(0, 15);

  return digits ? `${digits}…` : "";
}
