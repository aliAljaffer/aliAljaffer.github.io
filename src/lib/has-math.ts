/**
 * Whether a document needs the KaTeX renderer, which is ~290KB and so is loaded
 * only for documents that use it. Mirrors what remark-math itself would match:
 * fenced blocks and inline code are skipped, and an escaped \$ is not a
 * delimiter. A false positive only costs one extra chunk, so this errs toward
 * matching.
 */
export function hasMath(markdown: string): boolean {
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const prose = line.replace(/`[^`]*`/g, "");
    if (/(^|[^\\])\$[^$\n]+?(?<!\\)\$/.test(prose)) return true;
  }
  return false;
}
