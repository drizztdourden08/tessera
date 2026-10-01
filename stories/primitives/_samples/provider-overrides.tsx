/* @layer stories @kind logic */
import { Logo } from '../../../src/brand';
import type { TesseraOverrides } from '../../../src/primitives';
import { AppCrashScreen, AppImagePlaceholder, AppLink } from './provider-app-parts';
import { APP_ICONS } from './provider-app-icons.constants';
import { APP_STRINGS } from './provider-app-strings.constants';
import type { ProviderParts } from './provider-parts.constants';
import { MosaicSpinner } from './MosaicSpinner';

const overridesFor = (parts: ProviderParts, report: (line: string) => void): TesseraOverrides => ({
  spinner: parts.spinner ? MosaicSpinner : undefined,
  writeText: parts.writeText ? (text) => report(`App clipboard got: ${text}`) : undefined,
  link: parts.link ? AppLink : undefined,
  imagePlaceholder: parts.imagePlaceholder ? AppImagePlaceholder : undefined,
  strings: parts.strings ? APP_STRINGS : undefined,
  errorFallback: parts.errorFallback ? AppCrashScreen : undefined,
  emptyArt: parts.emptyArt ? <Logo brand="rotp" size="lg" /> : undefined,
  icons: parts.icons ? APP_ICONS : undefined,
});

export { overridesFor };
