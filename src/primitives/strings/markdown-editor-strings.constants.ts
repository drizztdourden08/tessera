/* @layer renderer-components @kind data */
const MARKDOWN_EDITOR_STRINGS = {
  toolbar: 'Formatting',
  bold: 'Bold',
  italic: 'Italic',
  list: 'Bulleted list',
  numberedList: 'Numbered list',
  quote: 'Quote',
  link: 'Link',
  code: 'Inline code',
  codeBlock: 'Code block',
  write: 'Write',
  preview: 'Preview',
  nothingToPreview: 'Nothing to preview',
  withChord: (name: string, chord: string) => `${name} (${chord})`,
};

export { MARKDOWN_EDITOR_STRINGS };
