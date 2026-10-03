/* @layer tooling-scripts @kind logic */
const keptAnswers = (node, path, keep) => Object.entries(node.answers).flatMap(([answer, next]) => {
  const here = [...path, answer];
  if (next === null) return keep.has(JSON.stringify(here)) ? [[answer, null]] : [];
  const kept = keptAnswers(next, here, keep);
  return kept.length > 0 ? [[answer, { question: next.question, answers: Object.fromEntries(kept) }]] : [];
});

const pruneTree = (tree, paths) => ({
  question: tree.question,
  answers: Object.fromEntries(keptAnswers(tree, [], new Set(paths.map((path) => JSON.stringify(path))))),
});

export { pruneTree };
