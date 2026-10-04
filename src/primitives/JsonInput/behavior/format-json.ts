/* @layer renderer-components @kind util */
const formatJson = (value: unknown, indent: number): string => {
  const text = JSON.stringify(value, null, indent) as string | undefined;
  return text ?? '';
};

export { formatJson };
