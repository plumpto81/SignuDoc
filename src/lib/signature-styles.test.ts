import assert from "node:assert/strict";
import test from "node:test";

import { signingFieldSubmissionSchema } from "./schemas/field.ts";
import {
  DEFAULT_SIGNATURE_STYLE,
  resolveSignatureStyle,
  signatureFrameId,
  signatureStyleIds,
} from "./signature-styles.ts";

const typed = {
  fieldId: "field-1",
  inputMethod: "typed",
  type: "signature",
  value: "Ada Lovelace",
} as const;

test("there are four styles, Great Vibes first and by default", () => {
  assert.equal(signatureStyleIds.length, 4);
  assert.equal(signatureStyleIds[0], "great-vibes");
  assert.equal(DEFAULT_SIGNATURE_STYLE, "great-vibes");
});

test("a typed signature takes a style from the list and nothing else", () => {
  for (const style of signatureStyleIds) {
    const parsed = signingFieldSubmissionSchema.parse({ ...typed, style });

    assert.equal("style" in parsed && parsed.style, style);
  }

  assert.equal(
    signingFieldSubmissionSchema.safeParse({ ...typed, style: "comic-sans" })
      .success,
    false,
  );
  assert.equal(
    signingFieldSubmissionSchema.safeParse({ ...typed, style: "" }).success,
    false,
  );
  // Older clients send none.
  assert.ok(signingFieldSubmissionSchema.safeParse(typed).success);
});

test("a stored style that is missing or unknown is drawn in the default", () => {
  assert.equal(resolveSignatureStyle("sacramento"), "sacramento");
  assert.equal(resolveSignatureStyle(null), DEFAULT_SIGNATURE_STYLE);
  assert.equal(resolveSignatureStyle(undefined), DEFAULT_SIGNATURE_STYLE);
  assert.equal(resolveSignatureStyle("retired-style"), DEFAULT_SIGNATURE_STYLE);
});

test("the frame id is the first 15 hex digits of the signer id", () => {
  assert.equal(
    signatureFrameId("3f2a9c1e-7b4d-4e8a-9c0f-1a2b3c4d5e6f"),
    "3F2A9C1E7B4D4E8\u2026",
  );
  assert.equal(signatureFrameId("---"), "");
});
