/* @layer renderer-components @kind types */
import type { ComponentProps, ReactNode } from 'react';
import type { Button } from '../../../primitives/Button';
import type { IconButtonSize } from '../../../primitives/IconButton/IconButton.type';
import type { ToolbarItemBase } from '../Toolbar.type';

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
  size: IconButtonSize;
  attributes: ComponentProps<typeof Button>;
}

export type { ToolbarRowKeysProps, ToolbarRowProps, ToolbarRowTextProps };
