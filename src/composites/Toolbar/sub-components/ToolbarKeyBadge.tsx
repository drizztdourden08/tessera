/* @layer renderer-components @kind component */
import { Shortcut } from '../../../primitives/Shortcut';
import { Span } from '../../../primitives/text-elements';
import { keyBadgeKeys } from '../behavior/key-badge-keys';
import type { ToolbarKeyBadgeProps } from './ToolbarToolDecor.type';
import './ToolbarKeyBadge.css';

const ToolbarKeyBadge = ({ shortcut }: ToolbarKeyBadgeProps) => {
  const keys = keyBadgeKeys(shortcut);
  if (keys === undefined) return null;
  return (
    <Span className="toolbar__key-badge" aria-hidden="true">
      <Shortcut keys={keys} size="xs" />
    </Span>
  );
};

export { ToolbarKeyBadge };
