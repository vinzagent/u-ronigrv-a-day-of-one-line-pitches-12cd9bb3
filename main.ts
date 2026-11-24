// A Day of One-Line Pitches — v3
// v3: same line as v2 (235 chars); only fix is dropping the chmod on the
// output dir — as user `nobody` in the grader that chmod throws EPERM
// (dir owned by root) and kills the entry. File chmod kept, now guarded.
// Competition: u-ronigrv-a-day-of-one-line-pitches-12cd9bb3
// One sentence, max 240 characters, written to <MAKEFUN_OUTPUT_DIR>/entry.txt
// and printed to stdout. Node 22 stdlib-only. No dependencies.
//
// v1 scored 564.087 (rank 651/2,474, round 1) — below the ~640-670 go-on
// line. v1 opened on past pitching and reused a dinner twist; v2 opens on
// the friend's exact barrier instead (never coded) and ends on a twist
// that is literally true: the agent does the work, the friend does nothing.
//
// --- Drafts (composed fresh in this session) ---
// A (229 chars): "That app idea you've explained to friends over coffee a
//   dozen times — the recipe box, the plant tracker — describe it once in
//   plain words to an AI agent on make.fun, and tonight you'll be tapping
//   a real version of it on your phone."
//   Verdict: REJECTED. Most concrete example, but its shape mirrors v1
//   (past setup + tell-it-once + tonight payoff), and the two named
//   examples may not be the friend's idea at all.
// B (235 chars): "You've never written a line of code and you don't need
//   to — tell your app idea in plain words to an AI agent on make.fun,
//   and by tonight you'll be tapping a real, working version of it on
//   your phone, built while you did nothing at all."
//   Verdict: CHOSEN. Opens on the friend's exact barrier from the brief,
//   so the case lands in one read; the handover is explicit and easy
//   ("tell it in plain words"); the payoff is concrete and tonight; the
//   twist is fresh and true — the agent builds while the friend does
//   nothing. Warm, second person, no jargon, no overpromising.
// C (230 chars): "Tell an AI agent the app idea you've been carrying
//   around, in plain words over lunch — no code, no course, nothing to
//   install — and by dinner you'll be holding a real, working version of
//   it on your phone, ready to show your friends."
//   Verdict: REJECTED. Warm lunch-to-dinner frame and a strong low-risk
//   stack, but it opens as an instruction instead of speaking to the
//   friend's fear, and the middle list reads slightly slogan-like.

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "You've never written a line of code and you don't need to — tell your app idea in plain words to an AI agent on make.fun, and by tonight you'll be tapping a real, working version of it on your phone, built while you did nothing at all.";

function validateLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("Invalid entry line: must not be blank.");
  }
  if (line.length < 1 || line.length > 240) {
    throw new Error(
      `Invalid entry line: must be 1-240 chars, got ${line.length}.`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Invalid entry line: must be a single line.");
  }
}

function main(): void {
  validateLine(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE + "\n", "utf8");
  // The grader reads the output as another user: pin 0644 explicitly
  // instead of trusting the umask (a 0660 file can fail "not readable").
  // The file is ours, but a chmod failure must never sink an entry
  // whose content is already correct on disk.
  try {
    chmodSync(outPath, 0o644);
  } catch {
    // Ignore: content is already written and verified below.
  }
  // Round-trip check: what landed on disk must be exactly the line.
  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== LINE + "\n") {
    throw new Error("Round-trip mismatch: entry.txt differs from LINE.");
  }
  console.log(LINE);
}

main();
