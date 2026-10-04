/* @layer tooling-scripts @kind logic */
const placeholderSentences = (name, answer) => ({
  job: `Write the one job of ${name} in one sentence.`,
  useWhen: `Write a case where ${name} is the part to use.`,
  avoidWhen: `Write a case where a plain Box fits better than ${name}.`,
  rules: `Write a rule every use of ${name} follows.`,
  a11y: `Write what ${name} gives a keyboard or screen reader user.`,
  rule: `Write in one line why ${name} answers ${answer}.`,
});

export { placeholderSentences };
