/* @layer stories @kind hook */
import { useState } from 'react';
import type { ToolbarProps } from '../../../src/composites';

const useContextNote = (on: boolean | undefined) => {
  const [asked, setAsked] = useState('none');
  const onContextMenu: ToolbarProps['onContextMenu'] = on ? (id, event) => setAsked(`${id} by ${event.type}`) : undefined;
  return { onContextMenu, note: on ? `Context menu asked for: ${asked}.` : undefined };
};

export { useContextNote };
