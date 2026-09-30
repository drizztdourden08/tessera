/* @layer renderer-components @kind logic */
import type { DragSubject } from './drag.type';

const isOwnEmptyingPane = (leafKey: string, subject: DragSubject): boolean =>
  leafKey === subject.fromKey && (subject.isMain || subject.loneWidget);

export { isOwnEmptyingPane };
