/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Logo } from '../../../src/brand';
import {
  Button, CodeBlock, DropZone, EmptyState, Flex, Icon, Image, Select, Spinner,
} from '../../../src/primitives';
import type { TesseraOverrides, TesseraPart } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import type { OverviewSection } from '../../_template/OverviewPage';
import { MosaicSpinner } from './MosaicSpinner';
import { APP_ICONS, SHOWN_ICONS } from './provider-app-icons.constants';
import { AppCrashScreen, AppImagePlaceholder } from './provider-app-parts';
import { APP_STRINGS } from './provider-app-strings.constants';
import { CrashDemo } from './provider-crash-demo';
import { PART_TEXT } from './provider-part-text.constants';
import { ProviderPart } from './ProviderPart';

type AppOverrides = (report: (line: string) => void) => TesseraOverrides;

const noop = () => undefined;

const SPINNER_CELLS: Readonly<Record<string, ReactNode>> = {
  'Spinner': <Spinner />,
  'Loading button': <Button variant="primary" loading>Save</Button>,
  'Loading select': <Select options={[]} loading placeholder="Pick a build" aria-label="Build" />,
};

const IMAGE_CELLS: Readonly<Record<string, ReactNode>> = {
  loading: <Image pending alt="Map art" width={120} height={80} />,
  broken: <Image src="data:image/png;base64,AAAA" alt="Boss art" width={120} height={80} />,
  empty: <Image frame alt="Save slot" width={80} />,
};

const section = (part: TesseraPart, app: AppOverrides | undefined, demo: ReactNode, reports = false): OverviewSection => ({
  title: PART_TEXT[part].title,
  node: <ProviderPart part={part} app={app} reports={reports}>{demo}</ProviderPart>,
});

const PROVIDER_SECTIONS: readonly OverviewSection[] = [
  section('spinner', () => ({ spinner: MosaicSpinner }),
    <Demonstrator columns={axis(Object.keys(SPINNER_CELLS))} cell={(_row, name) => SPINNER_CELLS[name]} />),
  section('writeText', (report) => ({ writeText: (text) => report(`The app clipboard got "${text}"`) }),
    <CodeBlock language="text" code="pnpm add @drizztdourden08/tessera" copyable />, true),
  section('imagePlaceholder', () => ({ imagePlaceholder: AppImagePlaceholder }),
    <Demonstrator columns={axis(Object.keys(IMAGE_CELLS))} cell={(_row, name) => IMAGE_CELLS[name]} />),
  section('strings', () => ({ strings: APP_STRINGS }),
    <Flex gap="md" align="start" wrap><Select options={[]} aria-label="Build" /><DropZone onDrop={noop} /></Flex>),
  section('errorFallback', () => ({ errorFallback: AppCrashScreen }), <CrashDemo />),
  section('emptyArt', () => ({ emptyArt: <Logo brand="rotp" size="lg" /> }),
    <EmptyState message="No saves yet." action={<Button size="sm">New save</Button>} />),
  section('portalDocument', undefined, null),
  section('icons', () => ({ icons: APP_ICONS }),
    <Demonstrator columns={axis(SHOWN_ICONS)} cell={(_row, name) => <Icon name={name} size={32} />} />),
];

export { PROVIDER_SECTIONS };
