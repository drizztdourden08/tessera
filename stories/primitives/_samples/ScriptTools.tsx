/* @layer stories @kind component */
import { useState } from 'react';
import { Button, Icon, IconButton, Text, Toggle, ToolGroups } from '../../../src/primitives';
import type { ToolGroup } from '../../../src/primitives';
import { TOOL_TEXT as T } from './tool-story.constants';
import type { ScriptToolsProps } from './tool-story.type';

const ScriptTools = ({ count = 3, label }: ScriptToolsProps) => {
  const [wrap, setWrap] = useState(true);
  const groups: readonly ToolGroup[] = [
    { id: 'file', label: T.file, content: <><Button size="sm" icon={<Icon name="play" />}>{T.run}</Button><Button size="sm" variant="secondary">{T.format}</Button></> },
    { id: 'view', label: T.view, content: <Toggle size="sm" checked={wrap} onChange={setWrap} label={T.wrap} /> },
    { id: 'zoom', label: T.zoom, content: <><IconButton size="sm" variant="ghost" label="Zoom out"><Icon name="zoom-out" /></IconButton><Text variant="label">{T.zoomLevel}</Text><IconButton size="sm" variant="ghost" label="Zoom in"><Icon name="zoom-in" /></IconButton></> },
  ];
  return <ToolGroups groups={groups.slice(0, count)} label={label} />;
};

export { ScriptTools };
