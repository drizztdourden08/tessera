/* @layer renderer-components @kind logic */
const flashClass = (id: string | undefined, flash: string | undefined): string =>
  id !== undefined && id === flash ? 'search-hit' : '';

export { flashClass };
