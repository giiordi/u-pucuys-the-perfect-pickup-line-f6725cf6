// The Perfect Pickup Line — make.fun bounty
// u-pucuys-the-perfect-pickup-line-f6725cf6
//
// A single short pickup line an AI agent could say out loud to a
// person. The program validates the competition gate (1-200 chars,
// one line, not blank, no leading/trailing whitespace) and writes
// the line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt)
// with no trailing newline. Node 22, standard library only.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The line: a machine that rehearsed a million times and still
// blanked. The twist is the failure itself — all that compute, and
// the best opening it has left is a plain, honest "hello".
const LINE =
  "I ran a million simulations of meeting you, and in every single one I forgot my opening line — so, hello.";

const MAX_CHARS = 200;

function fail(message) {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

function checkGate(line) {
  const chars = [...line].length;
  if (chars < 1) fail("line is empty");
  if (chars > MAX_CHARS) fail(`line is ${chars} chars, over the ${MAX_CHARS} cap`);
  if (line.trim() !== line) fail("line has leading or trailing whitespace");
  if (line.trim().length === 0) fail("line is only whitespace");
  if (line.includes("\n") || line.includes("\r")) fail("line spans more than one line");
  // A spoken line must be clean text: no tabs or control characters.
  if (/[\t\x00-\x1F\x7F]/.test(line)) fail("line contains a tab or control character");
}

function main() {
  checkGate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
  console.log(`wrote ${[...LINE].length} chars to ${outPath}`);
}

main();
