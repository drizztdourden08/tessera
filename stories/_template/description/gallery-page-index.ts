/* @layer stories @kind logic */
const galleryPageIndex = (files: readonly string[]): ReadonlyMap<string, string | null> => {
  const index = new Map<string, string | null>();
  for (const file of files) {
    const path = file.replace(/^(?:\.\.\/)+/, '').replace(/\.stories\.tsx$/, '');
    const id = `${path.split('/').join('-').toLowerCase()}--overview`;
    const name = path.split('/').pop() ?? path;
    index.set(path, id);
    index.set(name, index.has(name) ? null : id);
  }
  return index;
};

export { galleryPageIndex };
