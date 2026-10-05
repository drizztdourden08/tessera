/* @layer stories @kind component */
import { BRAND_APPS, BRAND_FAMILY } from '../../../src/brand';
import type { BrandApp } from '../../../src/brand';
import { Box, Status } from '../../../src/primitives';
import type { StatusTone } from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';
import './StatusPalettes.css';

const STATUS_WORDS: Readonly<Partial<Record<StatusTone, string>>> = {
  success: 'Connected',
  warning: 'Syncing',
  danger: 'Disconnected',
  info: 'Dev build',
};

const TONES = Object.keys(STATUS_WORDS) as StatusTone[];

const StatusPalettes = () => (
  <Demonstrator
    corner="Palette"
    rows={BRAND_APPS.map((app) => ({ key: app, label: BRAND_FAMILY[app].name }))}
    columns={TONES.map((tone) => ({ key: tone, label: tone }))}
    cell={(app: BrandApp, tone: StatusTone) => (
      <Box className="status-palettes__cell" data-palette={app}>
        <Status tone={tone} variant="pill" dot>{STATUS_WORDS[tone]}</Status>
        <Status tone={tone} dot>{STATUS_WORDS[tone]}</Status>
      </Box>
    )}
  />
);

export { StatusPalettes };
