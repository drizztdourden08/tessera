/* @layer renderer-components @kind util */
const filePath = (file: File, resolvePath: ((file: File) => string | null | undefined) | undefined): string => {
  const own = (file as File & { path?: unknown }).path;
  const found = [resolvePath?.(file), own, file.webkitRelativePath].find((path): path is string => typeof path === 'string' && path !== '');
  return found ?? file.name;
};

export { filePath };
