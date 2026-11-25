-- The script a typed signature or initials was drawn in, picked by the signer
-- from a short list (src/lib/signature-styles.ts). Null for everything else,
-- and for typed signatures saved before there was a choice: those are drawn
-- in Great Vibes, as they always were. The list is checked by the app, so a
-- new style needs no migration.

alter table public.fields
  add column if not exists signature_style text;
