/* @layer stories @kind logic */
import type { BreadcrumbsProps } from '../../../src/composites';

type CrumbHook = 'spring' | 'dropTarget' | 'validate';

type NoteSetter = (note: string) => void;

const NOTES: Readonly<Record<CrumbHook, string>> = {
  spring: 'Drag the text onto the art or heroes segment and hold it there for a moment.',
  dropTarget: 'Drag the text onto a segment; the handlers come from dropTarget.',
  validate: 'Click the empty space at the end and type two slashes in a row, then press Enter.',
};

const hookProps = (feature: CrumbHook, setNote: NoteSetter): Partial<BreadcrumbsProps> => {
  const table: Record<CrumbHook, Partial<BreadcrumbsProps>> = {
    spring: { onDropOn: (id) => setNote(`Dropped on ${id}`) },
    dropTarget: {
      dropTarget: (index, id) => ({
        onDragOver: (event) => event.preventDefault(),
        onDrop: (event) => {
          event.preventDefault();
          setNote(`Segment ${index + 1} (${id}) took the drop`);
        },
        'data-segment-index': String(index),
      }),
    },
    validate: {
      path: 'Mossgrove/art/sprites',
      onPathSubmit: (path) => setNote(`Go to ${path}`),
      validate: (path) => (path.includes('//') ? 'A path cannot hold an empty level.' : null),
    },
  };
  return table[feature];
};

export { hookProps, NOTES };
export type { CrumbHook };
