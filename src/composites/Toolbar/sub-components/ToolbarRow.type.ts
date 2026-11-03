/* @layer renderer-components @kind types */
import type { ComponentProps, ReactNode } from 'react';
import type { Button } from '../../../primitives/Button';
import type { ToolbarItemBase, ToolbarSize } from '../Toolbar.type';

interface ToolbarRowKeysProps {
  shortcut: ToolbarItemBase['shortcut'];
}

interface ToolbarRowTextProps {
  label: string;
  description: string | undefined;
}

interface ToolbarRowProps {
  glyph: ReactNode;
  label: string;
  description: string | undefined;
  shortcut: ToolbarItemBase['shortcut'];
  size: ToolbarSize;
  attributes: ComponentProps<typeof Button>;
}

export type { ToolbarRowKeysProps, ToolbarRowProps, ToolbarRowTextProps };
