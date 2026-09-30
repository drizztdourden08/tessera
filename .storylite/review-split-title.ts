/* @layer root-config @kind logic */
const splitTitle = (title: string): [string, string] => {
  const at = title.lastIndexOf('/');
  return [title.slice(0, at), title.slice(at + 1)];
};

export { splitTitle };
