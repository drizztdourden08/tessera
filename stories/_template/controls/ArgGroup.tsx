/* @layer stories @kind component */
import { Box, Text } from '../../../src/primitives';
import { ArgField } from './ArgField';
import type { ArgGroupRows } from './playground.type';
import { sameValue } from './same-value';

interface ArgGroupProps {
  group: ArgGroupRows;
  args: Readonly<Record<string, unknown>>;
  defaults: Readonly<Record<string, unknown>>;
  onChange: (name: string, value: unknown) => void;
  onReset: (name: string) => void;
}

const ArgGroup = (props: ArgGroupProps) => {
  const { group, args, defaults, onChange, onReset } = props;
  return (
    <Box as="fieldset" className="arg-group">
      <Text as="legend" className="arg-group__title">{group.title}</Text>
      <Box className="arg-group__fields">
        {group.rows.map((row) => (
          <ArgField
            key={row.name}
            row={row}
            args={args}
            modified={!sameValue(args[row.name], defaults[row.name])}
            onChange={onChange}
            onReset={onReset}
          />
        ))}
      </Box>
    </Box>
  );
};

export { ArgGroup };
