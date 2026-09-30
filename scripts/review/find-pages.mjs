/* @layer tooling-scripts @kind logic */
const matches = (title, name) => {
  const wanted = name.toLowerCase();
  const lower = title.toLowerCase();
  return lower === wanted || lower.endsWith(`/${wanted}`);
};

const findPages = (pages, names) =>
  names.map((name) => {
    const found = pages.filter((page) => matches(page.title, name));
    if (found.length === 1) return found[0];
    const hint = found.length === 0 ? 'no page' : `${found.length} pages (${found.map((p) => p.title).join(', ')}); give the full title`;
    throw new Error(`"${name}" matches ${hint}.`);
  });

export { findPages };
