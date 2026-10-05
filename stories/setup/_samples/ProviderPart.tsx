/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { CodeBlock } from '../../../src/composites';
import { Box, SegmentedControl, TesseraProvider, Text } from '../../../src/primitives';
import { PART_TEXT } from './provider-part-text.constants';
import { ProviderReportContext } from './provider-report-context';
import { providerSnippet } from './provider-snippet';
import { NO_CALL_YET, NO_OVERRIDES, PROVIDER_MODES } from './ProviderPart.constants';
import type { ProviderMode, ProviderPartProps } from './ProviderPart.type';
import './ProviderPart.css';

const ProviderPart = (props: ProviderPartProps) => {
  const { part, app, reports = false, children } = props;
  const [mode, setMode] = useState<ProviderMode>('tessera');
  const [line, setLine] = useState(NO_CALL_YET);
  const overrides = useMemo(() => (mode === 'app' && app ? app(setLine) : NO_OVERRIDES), [mode, app]);

  return (
    <Box className="provider-part">
      <Text as="p" className="provider-part__note">{PART_TEXT[part].note}</Text>
      {app && (
      <Box className="overview__showcase provider-part__stage">
        <SegmentedControl size="sm" aria-label="Version" value={mode} options={PROVIDER_MODES} onChange={setMode} />
        <ProviderReportContext value={setLine}>
          <TesseraProvider overrides={overrides}>{children}</TesseraProvider>
        </ProviderReportContext>
        {reports && <Text variant="caption">Last call: {line}</Text>}
      </Box>
      )}
      <CodeBlock code={providerSnippet([part]).join('\n\n')} language="tsx" copyable />
    </Box>
  );
};

export { ProviderPart };
