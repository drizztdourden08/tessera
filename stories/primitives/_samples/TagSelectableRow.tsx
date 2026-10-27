/* @layer stories @kind component */
import { useState } from 'react';
import { Flex, Tag } from '../../../src/primitives';

const GOALS = ['Defeat Ganon', 'Triforce hunt', 'Pedestal'];

const TagSelectableRow = () => {
  const [picked, setPicked] = useState<readonly string[]>(['Defeat Ganon']);
  const toggle = (goal: string) => setPicked((now) => (now.includes(goal) ? now.filter((g) => g !== goal) : [...now, goal]));
  return (
    <Flex gap="md" align="center" wrap>
      {GOALS.map((goal) => (
        <Tag key={goal} color="primary" selected={picked.includes(goal)} onSelect={() => toggle(goal)}>{goal}</Tag>
      ))}
      <Tag variant="category" color="teal" selected={picked.includes('Teal')} onSelect={() => toggle('Teal')}>Teal</Tag>
    </Flex>
  );
};

export { TagSelectableRow };
