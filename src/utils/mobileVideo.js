/**
 * mobileVideo — the 640px variant path for a clip.
 *
 * `/assets/videos/hero.mp4` -> `/assets/videos/hero@mobile.mp4`
 *
 * A phone still gets the video, just not a desktop-sized one. Decode cost scales
 * with pixel count, so 640px against the 960-1920px originals is roughly 2-9x less
 * work per frame, and the set drops from 9.2MB to 2.6MB. Same clips, same timing —
 * the retimed 30fps sources are what they are scaled down from.
 */
export const mobileVideo = (src) =>
  src ? src.replace(/\.mp4$/i, '@mobile.mp4') : src;
