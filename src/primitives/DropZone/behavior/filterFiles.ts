/* @layer renderer-components @kind util */
const filterFiles = (files: File[], accept: readonly string[] | undefined): File[] => {
  if (!accept || accept.length === 0) return files;
  return files.filter((f) =>
    accept.some((ext) => f.name.toLowerCase().endsWith(ext.toLowerCase())),
  );
};

export { filterFiles };
