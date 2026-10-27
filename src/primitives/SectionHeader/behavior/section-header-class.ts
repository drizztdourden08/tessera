/* @layer renderer-components @kind util */
import type { SectionHeaderSize } from '../SectionHeader.type';

const sectionHeaderClass = (size: SectionHeaderSize, wrap: boolean, className: string): string =>
  ['section-header', size === 'lg' && 'section-header--lg', wrap && 'section-header--wrap', className].filter(Boolean).join(' ');

export { sectionHeaderClass };
