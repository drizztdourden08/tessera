/* @layer renderer-components @kind util */
const writeClipboard = async (text: string): Promise<void> => {
  await navigator.clipboard.writeText(text);
};

export { writeClipboard };
