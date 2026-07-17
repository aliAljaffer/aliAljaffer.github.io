const WORDS_PER_MINUTE = 200;

// Code isn't read at prose pace, so fenced blocks are stripped before
// the word count that the estimate is based on.
export function estimateReadingMinutes(markdown: string): number {
  const withoutCodeFences = markdown.replace(/```[\s\S]*?```/g, "");
  const wordCount = withoutCodeFences
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
