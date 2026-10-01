/* @layer stories @kind component */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { AboutPanel, ErrorBoundary } from '../../../src/composites';
import {
  Box, Button, CodeBlock, DropZone, EmptyState, Flex, Icon, Image, Select, TagInput, Text, Thumbnail, Toggle,
} from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';
import { axis } from '../../_template/axis';
import { SHOWN_ICONS } from './provider-app-icons.constants';

const NO_TAGS: string[] = [];

const noop = () => undefined;

const PartSection = (props: { title: string; note: string; children: ReactNode }) => (
  <Box className="story-column">
    <Text variant="subtitle">{props.title}</Text>
    <Text variant="caption">{props.note}</Text>
    {props.children}
  </Box>
);

const ClipboardDemo = () => (
  <Flex gap="md" align="start" wrap>
    <CodeBlock language="text" code="pnpm add @drizztdourden08/tessera" copyable wrap />
    <AboutPanel title="Brock Demo" rows={[{ label: 'Version', value: '1.4.0' }]} copyText="Brock Demo 1.4.0, Electron 38" />
  </Flex>
);

const LinkDemo = () => (
  <Flex gap="lg" align="center" wrap>
    <Toggle checked label="Sync saves" description="Keeps saves in step across machines." link="/settings/sync" onChange={noop} />
    <Box href="/guides/provider">Read the setup guide</Box>
  </Flex>
);

const ImageDemo = () => (
  <Flex gap="md" align="start" wrap>
    <Image src="data:image/png;base64,AAAA" alt="Boss art" width={160} />
    <Image pending alt="Map art" width={160} />
    <Thumbnail src={null} alt="Save slot" width={96} />
  </Flex>
);

const StringsDemo = () => (
  <Flex gap="md" align="start" wrap>
    <Select options={[]} aria-label="Build" />
    <TagInput value={NO_TAGS} onChange={noop} />
    <DropZone onDrop={noop} />
  </Flex>
);

const Crashing = (props: { armed: boolean }) => {
  if (props.armed) throw new Error('The sample threw on purpose.');
  return <Text>This section draws fine.</Text>;
};

const CrashDemo = () => {
  const [armed, setArmed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return (
    <Box className="story-column">
      <Button variant="secondary" size="sm" onClick={() => setArmed(true)}>Break this section</Button>
      <ErrorBoundary
        resetKey={attempt}
        onError={() => setArmed(false)}
        action={<Button variant="tertiary" size="sm" onClick={() => setAttempt(attempt + 1)}>Show it again</Button>}
      >
        <Crashing armed={armed} />
      </ErrorBoundary>
    </Box>
  );
};

const EmptyDemo = () => <EmptyState message="No saves yet." action={<Button size="sm">New save</Button>} />;

const IconDemo = () => <Demonstrator columns={axis(SHOWN_ICONS)} cell={(_row, name) => <Icon name={name} size={24} />} />;

export { ClipboardDemo, CrashDemo, EmptyDemo, IconDemo, ImageDemo, LinkDemo, PartSection, StringsDemo };
