import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const cvPath = resolve("public/cv.pdf");
const minimumReasonableSizeBytes = 10_000;

function fail(message: string): never {
	throw new Error(`CV verification failed: ${message}`);
}

function countMatches(content: string, pattern: RegExp): number {
	return [...content.matchAll(pattern)].length;
}

if (!existsSync(cvPath)) {
	fail(`${cvPath} does not exist`);
}

const stats = statSync(cvPath);

if (!stats.isFile()) {
	fail(`${cvPath} is not a file`);
}

if (stats.size < minimumReasonableSizeBytes) {
	fail(
		`${cvPath} is too small (${stats.size} bytes, expected at least ${minimumReasonableSizeBytes})`,
	);
}

const pdf = readFileSync(cvPath);

if (!pdf.subarray(0, 5).equals(Buffer.from("%PDF-"))) {
	fail(`${cvPath} does not start with a valid PDF header`);
}

const pdfText = pdf.toString("latin1");
const hasLetterMediaBox = /\/MediaBox\s*\[\s*0\s+0\s+612\.?0*\s+792\.?0*\s*\]/.test(
	pdfText,
);

if (!hasLetterMediaBox) {
	fail("US Letter MediaBox [0 0 612 792] was not found");
}

const pageCount = countMatches(pdfText, /\/Type\s*\/Page(?!s)\b/g);

if (pageCount !== 1) {
	fail(`expected exactly one /Type /Page object, found ${pageCount}`);
}

console.log(
	`CV verification passed: ${cvPath} (${stats.size} bytes, US Letter, ${pageCount} page)`,
);
