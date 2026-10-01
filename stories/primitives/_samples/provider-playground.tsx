/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { Box, Text, TesseraProvider } from '../../../src/primitives';
import { overridesFor } from './provider-overrides';
import { PART_NOTES } from './provider-parts.constants';
import type { ProviderParts } from './provider-parts.constants';
import { ProviderReportContext } from './provider-report-context';
import { ClipboardDemo, CrashDemo, EmptyDemo, IconDemo, ImageDemo, LinkDemo, PartSection, StringsDemo } from './provider-sections';
import { ProviderShowcase } from './provider-showcase';

const ProviderPlayground = (props: { parts: ProviderParts }) => {
  const { parts } = props;
  const [line, setLine] = useState('Nothing yet. Copy something or follow a link.');
  const overrides = useMemo(() => overridesFor(parts, setLine), [parts]);

  return (
    <ProviderReportContext value={setLine}>
      <TesseraProvider overrides={overrides}>
        <Box className="story-column">
          <Text variant="caption">Last app call: {line}</Text>
          <PartSection title="Spinner" note={PART_NOTES.spinner}><ProviderShowcase /></PartSection>
          <PartSection title="Clipboard writer" note={PART_NOTES.writeText}><ClipboardDemo /></PartSection>
          <PartSection title="Link component" note={PART_NOTES.link}><LinkDemo /></PartSection>
          <PartSection title="Image placeholder" note={PART_NOTES.imagePlaceholder}><ImageDemo /></PartSection>
          <PartSection title="Wording" note={PART_NOTES.strings}><StringsDemo /></PartSection>
          <PartSection title="Crash screen" note={PART_NOTES.errorFallback}><CrashDemo /></PartSection>
          <PartSection title="Empty art" note={PART_NOTES.emptyArt}><EmptyDemo /></PartSection>
          <PartSection title="Icon set" note={PART_NOTES.icons}><IconDemo /></PartSection>
        </Box>
      </TesseraProvider>
    </ProviderReportContext>
  );
};

export { ProviderPlayground };
