/* @layer stories @kind data */
import { GUIDE_LINKS } from './guide-links.constants';
import { LINT_POINTS, TIER_TOPIC, USAGE_TOPIC } from './guide-shared.constants';
import type { Guide } from './guide.type';

const COMPOUNDS_GUIDE: Guide = {
  name: 'Building compounds',
  description: 'A compound draws one of the app\'s concepts, such as a save slot or a player row, from Tessera parts. Data comes in through props and goes out through callbacks. It lives in the app, because it knows the app\'s domain.',
  topics: [
    {
      title: 'What a compound is',
      points: [
        'It draws one app concept: `SaveSlot`, `PlayerRow`, `BuildCard`.',
        'It takes data by props and reports through callbacks. It never reads a store, calls IPC or uses the router.',
        'It is made of Tessera parts and the app\'s other compounds.',
        'A part with no app concept in it belongs in Tessera instead.',
      ],
    },
    TIER_TOPIC,
    {
      title: 'Where files go',
      points: [
        'One folder per compound, in the `parts.compounds` folder of `tessera.config.json`: `src/compounds/<Name>/` by default, `packages/design/src/compounds/<Name>/` in a monorepo.',
        'The same shape as a Tessera component folder. `brock structure --check` rejects any other file at its root.',
        'CSS classes start with the component name, such as `save-slot__meta`.',
      ],
      code: `src/compounds/SaveSlot/
  SaveSlot.tsx            the component
  SaveSlot.css            its styles, tokens only
  SaveSlot.type.ts        its props and other types
  SaveSlot.constants.ts   static data, when it has any
  SaveSlot.usage.ts       what it is for, for people and AI readers
  index.ts                the barrel
  behavior/               hooks and logic, one per file
  sub-components/         children used only here, in the same shape`,
      language: 'text',
    },
    USAGE_TOPIC,
    { title: 'Lint rules', points: LINT_POINTS },
    {
      title: 'Create one',
      points: [
        'Create one with the Tessera CLI: `brock tessera new compound SaveSlot` (`pnpm exec tessera …` outside Brock). It writes the folder above with its usage file, a story when the app uses StoryLite, and lists what to fill in next.',
        `Next: ${GUIDE_LINKS.views}, which hand compounds their data.`,
      ],
    },
  ],
  example: {
    name: 'SaveSlot.tsx',
    code: `import { Button, Card, Flex, Paragraph, Stack, Title } from '@drizztdourden08/tessera';
import type { SaveSlotProps } from './SaveSlot.type';
import './SaveSlot.css';

const SaveSlot = (props: SaveSlotProps) => {
  const { save, onOpen } = props;
  return (
    <Card className="save-slot">
      <Flex justify="between" align="center" gap="md">
        <Stack gap="xs">
          <Title level={3}>{save.name}</Title>
          <Paragraph tone="muted">{save.game}</Paragraph>
        </Stack>
        <Button variant="secondary" onClick={() => onOpen(save.id)}>Open</Button>
      </Flex>
    </Card>
  );
};

export { SaveSlot };`,
  },
};

export { COMPOUNDS_GUIDE };
