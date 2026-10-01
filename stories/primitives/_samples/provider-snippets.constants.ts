/* @layer stories @kind data */
import type { TesseraPart } from '../../../src/primitives';

interface ProviderSnippet {
  define?: string;
  entry: string;
}

const PART_SNIPPETS: Readonly<Record<TesseraPart, ProviderSnippet>> = {
  spinner: {
    define: `const AppSpinner = ({ size, label, className }: SpinnerProps) => (
  <span className={className} data-size={size} role="status" aria-label={label} />
);`,
    entry: 'spinner: AppSpinner',
  },
  writeText: { entry: 'writeText: (text) => clipboard.writeText(text)' },
  link: {
    define: 'const AppLink = ({ href, ...rest }: LinkProps) => <RouterLink to={href} {...rest} />;',
    entry: 'link: AppLink',
  },
  imagePlaceholder: {
    define: 'const AppPlaceholder = ({ status }: ImagePlaceholderProps) => <span className={`art art--${status}`} />;',
    entry: 'imagePlaceholder: AppPlaceholder',
  },
  strings: {
    entry: `strings: {
    common: { cancel: 'Annuler', loading: 'Chargement' },
    fields: { dropFiles: 'Déposez les fichiers ici' },
  }`,
  },
  errorFallback: {
    define: `const AppCrash = ({ error, label, reset }: ErrorFallbackProps) => (
  <section role="alert">
    <h2>{label}</h2>
    <p>{String(error)}</p>
    <button onClick={reset}>Try again</button>
  </section>
);`,
    entry: 'errorFallback: AppCrash',
  },
  emptyArt: { entry: 'emptyArt: <img src="/art/empty.svg" alt="" />' },
  portalDocument: { entry: 'portalDocument: hostWindow.document' },
  icons: {
    define: 'const APP_ICONS: IconSet = { ...ICONS, house: houseDuotone };',
    entry: 'icons: APP_ICONS',
  },
};

const SETUP_IMPORTS = `import { createRoot } from 'react-dom/client';
import { Link as RouterLink } from 'react-router';
import { ICONS, TesseraProvider } from '@drizztdourden08/tessera';
import type { ErrorFallbackProps, ImagePlaceholderProps, IconSet, LinkProps, SpinnerProps, TesseraOverrides } from '@drizztdourden08/tessera';
import houseDuotone from '@iconify-icons/ph/house-duotone';
import { clipboard, hostWindow } from './desktop-bridge';`;

const SETUP_RENDER = `createRoot(root).render(
  <TesseraProvider overrides={OVERRIDES}>
    <App />
  </TesseraProvider>,
);`;

export { PART_SNIPPETS, SETUP_IMPORTS, SETUP_RENDER };
