/* @layer tooling-scripts @kind logic */
const aiVerdict = (findings, { mode, problem }) => {
  const problems = [
    ...(problem ? [{ kind: 'setting', message: problem, coverage: false }] : []),
    ...findings.filter((f) => !f.coverage),
  ];
  const gapsFail = mode === 'enforce' && findings.some((f) => f.coverage);
  return { problems, failed: problems.length > 0 || gapsFail };
};

export { aiVerdict };
