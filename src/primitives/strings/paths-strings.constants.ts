/* @layer renderer-components @kind data */
const PATH_STRINGS = {
  browse: 'Browse...',
  change: 'Change...',
  clear: 'Clear the path',
  copy: 'Copy the path',
  revealFile: 'Show in folder',
  revealFolder: 'Open the folder',
  noFile: 'No file yet',
  noFolder: 'No folder yet',
  dropFile: 'Drop the file to use it',
  dropFolder: 'Drop the folder to use it',
  notFile: 'That is a folder. Drop a file.',
  notFolder: 'That is a file. Drop a folder.',
  notType: (types: readonly string[]) => `Drop a file that ends in ${types.join(', ')}.`,
};

export { PATH_STRINGS };
