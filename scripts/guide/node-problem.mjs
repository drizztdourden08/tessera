/* @layer tooling-scripts @kind logic */
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const nodeProblem = (node, where) => {
  if (node === null) return undefined;
  if (!isObject(node) || typeof node.question !== 'string' || !isObject(node.answers)) {
    return `${where} is neither null nor a { question, answers } node`;
  }
  return Object.entries(node.answers).map(([answer, next]) => nodeProblem(next, `${where} > ${answer}`)).find(Boolean);
};

export { nodeProblem };
