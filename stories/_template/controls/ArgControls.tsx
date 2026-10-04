/* @layer stories @kind component */
import type { StoryLiteArgs } from '@storylite/storylite';
import { Box, Button, Icon, Text } from '../../../src/primitives';
import { argGroups } from './arg-groups';
import { ArgGroup } from './ArgGroup';
import type { PlaygroundArgTypes } from './playground.type';
import { sameValue } from './same-value';
import '../story-heading.css';
import './arg-controls.css';

interface ArgControlsProps {
  argTypes: PlaygroundArgTypes;
  args: StoryLiteArgs;
  defaults: StoryLiteArgs;
  onChange: (name: string, value: unknown) => void;
  onReset: () => void;
}

const ArgControls = (props: ArgControlsProps) => {
  const { argTypes, args, defaults, onChange, onReset } = props;
  const groups = argGroups(argTypes, args);
  if (groups.length === 0) return null;
  const changed = groups.flatMap((group) => group.rows).filter((row) => !sameValue(args[row.name], defaults[row.name])).length;
  return (
    <Box as="section" className="arg-controls" aria-labelledby="arg-controls-title">
      <Box className="arg-controls__head">
        <Text id="arg-controls-title" className="story-heading">Parameters</Text>
        <Button variant="ghost" size="sm" icon={<Icon name="rotate-ccw" size={14} />} disabled={changed === 0} onClick={onReset}>
          Reset
        </Button>
      </Box>
      <Box className="arg-controls__groups">
        {groups.map((group) => (
          <ArgGroup key={group.title} group={group} args={args} defaults={defaults} onChange={onChange} onReset={(name) => onChange(name, defaults[name])} />
        ))}
      </Box>
    </Box>
  );
};

export { ArgControls };
