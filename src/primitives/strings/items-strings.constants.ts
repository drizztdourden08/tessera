/* @layer renderer-components @kind data */
const ITEM_STRINGS = {
  more: 'More',
  asksFirst: (label: string) => `${label}...`,
  confirmQuestion: (label: string) => `${label}?`,
  confirmAgain: (label: string) => `Click again to ${label.replace(/^\p{Lu}(?=\p{Ll})/u, (first) => first.toLowerCase())}`,
  fixBeforeSaving: (count: number) => (count === 1 ? '1 thing to fix before saving' : `${count} things to fix before saving`),
  andMore: (count: number) => `and ${count} more`,
  checks: 'Checks',
  checkPassed: 'passed',
  checkAdvice: 'advice',
  checkFailed: 'failed',
  checkChecking: 'checking',
  checkSkipped: 'skipped',
  checkCount: (count: number, word: string) => `${count} ${word}`,
  files: 'Files',
  noFiles: 'No files yet.',
  revealFile: (name: string) => `Show ${name} in its folder`,
};

export { ITEM_STRINGS };
