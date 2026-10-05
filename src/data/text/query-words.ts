/* @layer renderer-components @kind logic */
import { foldText } from './fold-text';
import { SPACES } from './text.constants';

const queryWords = (query: string): string[] => foldText(query).split(SPACES).filter((word) => word !== '');

export { queryWords };
