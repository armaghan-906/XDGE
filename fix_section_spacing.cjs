/**
 * fix_section_spacing.cjs
 * Reduces the vertical spacing (top/bottom padding) between sections by ~50%
 * to match the DLS reference site (~3 inches between sections vs current ~6 inches).
 *
 * Only targets the SECTION-LEVEL vertical padding values — leaves horizontal
 * padding, internal component gaps, and small element spacing untouched.
 */

const fs = require('fs');
const path = require('path');

const SECTIONS_DIR = path.join(__dirname, 'src', 'components', 'sections');

// ── Mapping of old → new padding values ──────────────────────────────────────
// These are the section-level vertical spacing clamp() values found in inline styles.
// We reduce the vertical (top/bottom) values by ~50%, keeping horizontal values unchanged.

const replacements = [
  // ─── PRIMARY SECTION PADDING (the biggest offender: 180px–320px) ───
  // Most content sections use this. Reducing from ~180–320px to ~90–160px.
  {
    find: "clamp(180px, 22vw, 320px) clamp(20px, 4vw, 40px)",
    replace: "clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)",
  },
  {
    find: "clamp(180px, 22vw, 320px) clamp(20px, 4vw, 56px)",
    replace: "clamp(90px, 11vw, 160px) clamp(20px, 4vw, 56px)",
  },
  // Sections with asymmetric bottom padding (Culture, Insights)
  {
    find: "clamp(180px, 22vw, 320px) clamp(20px, 4vw, 40px) clamp(56px, 8vw, 100px)",
    replace: "clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px) clamp(32px, 4vw, 56px)",
  },
  // WhoWeServe — explicit 3-value with bottom also large
  {
    find: "clamp(180px, 22vw, 320px) clamp(20px, 4vw, 40px) clamp(180px, 22vw, 320px)",
    replace: "clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px) clamp(90px, 11vw, 160px)",
  },

  // ─── HERO PAGE BOTTOM PADDING (160px–240px) ───
  // Hero sections have top padding for nav + bottom padding before next section.
  // Keep top padding (96px for nav clearance), reduce bottom.
  {
    find: "clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(160px, 18vw, 240px)",
    replace: "clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(80px, 9vw, 120px)",
  },
  // ExperienceHero has smaller bottom
  {
    find: "clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(56px, 7vw, 88px)",
    replace: "clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(32px, 4vw, 48px)",
  },

  // ─── CAROUSEL / FULL-WIDTH PADDING (160px–240px vertical) ───
  {
    find: "clamp(160px, 18vw, 240px) 0",
    replace: "clamp(80px, 9vw, 120px) 0",
  },

  // ─── MEDIUM SECTIONS (80px–160px) — DiscoveryMeeting, ApplyClosing ───
  {
    find: "clamp(80px, 12vw, 160px) clamp(20px, 4vw, 40px)",
    replace: "clamp(48px, 6vw, 80px) clamp(20px, 4vw, 40px)",
  },

  // ─── PROGRAMME TIERS (96px–180px) ───
  {
    find: "clamp(96px, 14vw, 180px) clamp(20px, 4vw, 40px)",
    replace: "clamp(56px, 7vw, 96px) clamp(20px, 4vw, 40px)",
  },

  // ─── CONTACT / APPLY FORM top padding (96px–160px) ───
  {
    find: "clamp(96px, 14vw, 160px) clamp(20px, 4vw, 40px)",
    replace: "clamp(56px, 7vw, 80px) clamp(20px, 4vw, 40px)",
  },

  // ─── ABOUT HERO bottom padding (separate from shared hero pattern) ───
  // Already covered by the hero pattern above.

  // ─── THE REALITY smaller padding ───
  {
    find: "clamp(44px, 7vw, 84px) clamp(20px, 4vw, 40px)",
    replace: "clamp(28px, 4vw, 48px) clamp(20px, 4vw, 40px)",
  },

  // ─── LARGE MARGIN VALUES (ProgrammeTiers margin) ───
  {
    find: "margin: 'clamp(96px, 14vw, 180px) 0'",
    replace: "margin: 'clamp(56px, 7vw, 96px) 0'",
  },

  // ─── INTERNAL SECTION large marginTop ───
  // WhatYouWillExperience bottom block
  {
    find: "marginTop: 'clamp(80px, 12vw, 160px)'",
    replace: "marginTop: 'clamp(40px, 6vw, 80px)'",
  },
];

// ── CSS-specific replacements ───────────────────────────────────────────────
const cssReplacements = [
  // ProvenOutcomes override in index.css
  // No change needed — it's already at 5% which is reasonable
];

let totalFilesChanged = 0;
let totalReplacementsMade = 0;

// Process all JSX files in sections directory
const files = fs.readdirSync(SECTIONS_DIR).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(SECTIONS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  let fileReplacements = 0;

  for (const { find, replace } of replacements) {
    const count = content.split(find).length - 1;
    if (count > 0) {
      content = content.split(find).join(replace);
      fileReplacements += count;
    }
  }

  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✓ ${file} — ${fileReplacements} replacement(s)`);
    totalFilesChanged++;
    totalReplacementsMade += fileReplacements;
  }
}

console.log(`\n✅ Done! ${totalReplacementsMade} replacements across ${totalFilesChanged} files.`);
