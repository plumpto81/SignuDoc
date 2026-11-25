import assert from "node:assert/strict";
import test from "node:test";

import {
  attachesCertificateToEmails,
  buildCompletionAttachments,
} from "./completion-attachments.ts";

const files = {
  fileNameStem: "Lease",
  recipientCertificate: new Uint8Array([2]),
  signedPdf: new Uint8Array([1]),
};

test("completion emails attach only the signed PDF by default", () => {
  assert.deepEqual(
    buildCompletionAttachments(files, {}).map((file) => file.filename),
    ["Lease - signed.pdf"],
  );
  assert.equal(attachesCertificateToEmails({}), false);
});

test("EMAIL_CERTIFICATE_ATTACHMENT=true attaches the certificate too", () => {
  const attachments = buildCompletionAttachments(files, {
    EMAIL_CERTIFICATE_ATTACHMENT: "true",
  });

  assert.deepEqual(
    attachments.map((file) => file.filename),
    ["Lease - signed.pdf", "Lease - certificate.pdf"],
  );
  assert.equal(attachments[1]!.content, files.recipientCertificate);
  assert.equal(
    attachesCertificateToEmails({ EMAIL_CERTIFICATE_ATTACHMENT: " TRUE " }),
    true,
  );
});

test("any other value leaves the certificate out", () => {
  for (const value of ["1", "yes", "false", "", "on"]) {
    assert.equal(
      attachesCertificateToEmails({ EMAIL_CERTIFICATE_ATTACHMENT: value }),
      false,
      value,
    );
  }
});
