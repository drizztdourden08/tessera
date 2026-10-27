/* @layer stories @kind component */
import { useState } from 'react';
import { Flex, Tag } from '../../../src/primitives';

const NAMES = ['Rooms', 'Agents', 'Notes'];

const TagNeutralRow = () => {
  const [picked, setPicked] = useState<readonly string[]>(['Rooms']);
  const toggle = (name: string) => setPicked((now) => (now.includes(name) ? now.filter((n) => n !== name) : [...now, name]));
  return (
    <Flex gap="md" align="center" wrap>
      {NAMES.map((name) => (
        <Tag key={name} pill selectedTone="neutral" selected={picked.includes(name)} onSelect={() => toggle(name)}>{name}</Tag>
      ))}
      <Tag pill outlined icon="robot" selectedTone="neutral" selected={picked.includes('Bots')} onSelect={() => toggle('Bots')}>Bots</Tag>
    </Flex>
  );
};

export { TagNeutralRow };
