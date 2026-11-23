// A Day of One-Line Pitches
// Competition: u-ronigrv-a-day-of-one-line-pitches-12cd9bb3
// One sentence, max 240 characters, written to <MAKEFUN_OUTPUT_DIR>/entry.txt
// and printed to stdout. Node 22 stdlib-only. No dependencies.
//
// --- Drafts (composed fresh in the builder session) ---
// v1 (195 chars): "You've pitched your app idea to friends a hundred times
//   — tell it once to an AI agent on make.fun, and tonight you'll be
//   tapping a real, working version on your phone, built while you ate
//   dinner."
//   Setup: yes — the friend who has pitched their idea a hundred times
//   but never built it. That is exactly the friend in the brief.
//   Promise: concrete and imaginable — tonight, tapping a real working
//   version on their own phone. No jargon, no "AI will change your life".
//   Twist: "built while you ate dinner" — light, funny, and it sells the
//   speed without a bombastic claim. One sentence: yes. Under 240: yes.
//   Verdict: CHOSEN. Strongest single promise, cleanest arc.
// v2 (195 chars): "Tell an AI agent the app idea you've been carrying
//   around in your head, and by tonight you'll be tapping through a real,
//   working version of it on your phone — no code, no course, just your
//   words."
//   Solid, but "no code, no course, just your words" is a slogan, not a
//   picture; v1's dinner twist is more memorable and more concrete.
// v3 (196 chars): "That app idea you've explained to friends a hundred
//   times? Describe it once to an AI agent on make.fun and tonight you'll
//   be tapping a real version of it on your phone, built while you had
//   dinner."
//   Same bones as v1 but opens with a question, which softens the hook;
//   v1's flat statement lands harder in one read.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "You've pitched your app idea to friends a hundred times — tell it once to an AI agent on make.fun, and tonight you'll be tapping a real, working version on your phone, built while you ate dinner.";

// Local gate: exactly one non-blank line of 1-240 characters.
// Fails loudly (non-zero exit, no file written) instead of shipping a bad line.
if (
  LINE.length < 1 ||
  LINE.length > 240 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n")
) {
  throw new Error(
    `Invalid entry line: must be one non-blank line of 1-240 chars, got ${LINE.length} chars.`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(LINE);
