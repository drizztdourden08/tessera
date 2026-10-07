/* @layer stories @kind logic */
const errorText = (error: unknown): string => {
  if (error === undefined || error === null || error === '') return '';
  if (error instanceof Error) return error.stack?.includes(error.message) ? error.stack : error.message;
  return typeof error === 'string' ? error : JSON.stringify(error, null, 2);
};

export { errorText };
