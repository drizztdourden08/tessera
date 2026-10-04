/* @layer stories @kind component */
import { Card, Paragraph, SectionHeader, Stack, Title } from '../../../src/primitives';
import { RELEASE_NOTES } from './release-notes';

const ReleaseNotes = ({ version }: { version: string }) => (
  <Card>
    <Stack gap="md">
      <SectionHeader title={`What is new in ${version}`} />
      {RELEASE_NOTES.map((group) => (
        <Stack key={group.title} gap="xs">
          <Title level={6}>{group.title}</Title>
          {group.items.map((item) => <Paragraph key={item} tone="dim">{item}</Paragraph>)}
        </Stack>
      ))}
    </Stack>
  </Card>
);

export { ReleaseNotes };
