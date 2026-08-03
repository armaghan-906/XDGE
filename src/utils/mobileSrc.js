/**
 * mobileSrc — the 1000px variant path for an asset.
 *
 * `/assets/foo.webp` -> `/assets/foo@1000.jpg`
 *
 * Generated for every referenced image wider than 1100px. Pair it with a
 * `<picture>` media condition rather than `srcset`: at DPR 3 a 390px phone computes
 * a need of ~1170px and picks the 1600px original anyway, which is the opposite of
 * what is wanted. The saving is in pixels decoded — 1.0MP against 2.56MP — which is
 * the expensive part on a phone, so the JPEG container costs a few bytes and buys
 * back the decode.
 */
export const mobileSrc = (src) =>
  src ? src.replace(/\.(webp|jpe?g)$/i, '@1000.jpg') : src;
