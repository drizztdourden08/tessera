/* @layer stories @kind logic */
import type { StoryLiteArgs } from '@storylite/storylite';
import { PLAYGROUND_GROUPS } from './arg-controls.constants';
import { kindOf } from './control-kind';
import { optionsOf } from './options-of';
import type { ArgGroupRows, PlaygroundArgTypes } from './playground.type';

const argGroups = (argTypes: PlaygroundArgTypes, args: StoryLiteArgs): ArgGroupRows[] => {
  const groups: ArgGroupRows[] = [];
  for (const [name, argType] of Object.entries(argTypes)) {
    if (!argType) continue;
    const options = optionsOf(argType, args);
    const kind = kindOf(argType, args[name], options);
    if (!kind) continue;
    const row = { name, argType, kind, options };
    const group = groups.find((each) => each.title === argType.group);
    if (group) group.rows.push(row);
    else groups.push({ title: argType.group, rows: [row] });
  }
  return groups.sort((a, b) => PLAYGROUND_GROUPS.indexOf(a.title) - PLAYGROUND_GROUPS.indexOf(b.title));
};

export { argGroups };
