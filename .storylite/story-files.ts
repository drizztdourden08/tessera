/* @layer root-config @kind logic */
import { walkFiles } from './walk-files';

const storyFiles = (storiesDir: string): string[] => walkFiles(storiesDir).filter((f) => f.endsWith('.stories.tsx'));

export { storyFiles };
