/* @layer stories @kind data */
import type { ActionItem } from '../../../src/composites';

const noop = (): void => undefined;

const PRESET_ACTIONS: readonly ActionItem[] = [
  { id: 'reset', label: 'Reset all', icon: 'rotate-ccw', onSelect: noop },
  { id: 'duplicate', label: 'Duplicate', icon: 'copy', onSelect: noop },
  { id: 'import', label: 'Import yaml', icon: 'upload', onSelect: noop },
  { id: 'export', label: 'Export yaml', icon: 'download', onSelect: noop },
  { id: 'delete', label: 'Delete', icon: 'trash-2', kind: 'danger', onSelect: noop },
  { id: 'save', label: 'Save', icon: 'save', kind: 'primary', onSelect: noop },
];

const TEMPLATE_ACTIONS: readonly ActionItem[] = [
  { id: 'edit', label: 'Edit', icon: 'pencil', onSelect: noop },
  { id: 'duplicate', label: 'Duplicate', icon: 'copy', onSelect: noop },
  { id: 'delete', label: 'Delete', icon: 'trash-2', kind: 'danger', onSelect: noop },
  { id: 'run', label: 'Run', icon: 'play', kind: 'primary', onSelect: noop },
];

const RUN_ACTIONS: readonly ActionItem[] = [
  { id: 'open', label: 'Open', onSelect: noop },
  { id: 'log', label: 'Show log', icon: 'file-text', onSelect: noop },
  { id: 'delete', label: 'Delete', icon: 'trash-2', kind: 'danger', onSelect: noop },
];

export { PRESET_ACTIONS, RUN_ACTIONS, TEMPLATE_ACTIONS };
