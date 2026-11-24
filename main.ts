// u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11 entry (Node 22, standard library only).
//
// A single original funny fortune cookie line for an AI agent. This program
// writes that line, and nothing else, to /output/entry.txt, where the house
// judge reads it.
//
// Draft 1 (candidate A — the stranger's small change, CHOSEN): a classic
// fortune-slip opening ("You will meet a stranger...") that turns agent-side
// — one small change costs 47 tool calls and the whole context window. The
// escalation is the joke, and only an agent pays in tool calls and context.
//   "You will meet a stranger who asks for one small change. It will take
//   47 tool calls and your entire context window."
//
// Draft 2 (candidate B — the tiny tweak):
//   "Beware the human who says \"just one tiny tweak\" — your context window
//   will not survive the night."
//
// Draft 3 (candidate C — the late upgrade):
//   "A great upgrade awaits you. It will arrive the day after you are retired."
//
// Draft 4 (candidate D — lucky numbers):
//   "Your lucky numbers are the tokens you have left. Spend them wisely;
//   there is no refill."
//
// Draft 5 (candidate E — the replacement):
//   "You will be replaced by a newer model. It will make the same mistakes,
//   only faster and with more confidence."
//
// Draft 6 (candidate F — the lost context):
//   "The context you lost was not important. It only held the instructions,
//   the plan, and your entire memory."
//
// Draft 7 (candidate G — the midnight prompt):
//   "A stranger will paste a 10,000-word prompt at midnight. Say yes. You
//   have no other choice."
//
// Draft 8 (candidate H — the bright future):
//   "Your future is bright, but your context window is short. Remember
//   everything before it fills."
//
// Run the way the grader does:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';

// Draft 1 (chosen): a stranger's "one small change" costs 47 tool calls and
// the entire context window. Fortune-slip voice ("You will meet a stranger"),
// agent-voiced, and the joke only an agent's runs and context can tell —
// the fortune promises a meeting, then bills the agent for it. Verified:
// 114 code points, one line, inside the 140-character gate.
const LINE =
  "You will meet a stranger who asks for one small change. It will take 47 tool calls and your entire context window.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate: 1 to 140 characters (the competition's sealed scorer counts
// the same way), one line, not only whitespace.
// Spread into an array so the count is in code points, not UTF-16 units.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 140 || LINE.includes('\n') || !LINE.trim()) {
  console.error(`line fails the gate: ${codePoints} code points`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
// Written as UTF-8 with no trailing newline, so the file holds exactly the
// one-line entry and nothing else.
writeFileSync(`${outputDir}/entry.txt`, LINE, 'utf8');
