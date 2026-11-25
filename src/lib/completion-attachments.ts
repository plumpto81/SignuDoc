import type { EmailAttachment } from "./services/email.ts";
import { type EnvSource, readEnv } from "./utils/env.ts";

/**
 * Whether completion emails carry the certificate PDF as well as the signed
 * document. Off unless EMAIL_CERTIFICATE_ATTACHMENT is "true": the
 * certificate is still stored and linked from the email.
 */
export function attachesCertificateToEmails(
  env: EnvSource = process.env,
): boolean {
  return readEnv(env, "EMAIL_CERTIFICATE_ATTACHMENT")?.toLowerCase() === "true";
}

/** The files attached to a completion email. */
export function buildCompletionAttachments(
  input: {
    fileNameStem: string;
    recipientCertificate: Uint8Array;
    signedPdf: Uint8Array;
  },
  env: EnvSource = process.env,
): EmailAttachment[] {
  return [
    {
      content: input.signedPdf,
      contentType: "application/pdf",
      filename: `${input.fileNameStem} - signed.pdf`,
    },
    ...(attachesCertificateToEmails(env)
      ? [
          {
            content: input.recipientCertificate,
            contentType: "application/pdf",
            filename: `${input.fileNameStem} - certificate.pdf`,
          },
        ]
      : []),
  ];
}
