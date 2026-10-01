/* @layer stories @kind data */
const PROVIDER_SETUP_CODE = `import { createRoot } from 'react-dom/client';
import { Link as RouterLink } from 'react-router';
import { ICONS, TesseraProvider } from '@drizztdourden08/tessera';
import type { ErrorFallbackProps, ImagePlaceholderProps, IconSet, LinkProps, SpinnerProps, TesseraOverrides } from '@drizztdourden08/tessera';
import houseDuotone from '@iconify-icons/ph/house-duotone';
import { clipboard, hostWindow } from './desktop-bridge';

const AppSpinner = ({ size, label, className }: SpinnerProps) => (
  <span className={className} data-size={size} role="status" aria-label={label} />
);

const AppLink = ({ href, ...rest }: LinkProps) => <RouterLink to={href} {...rest} />;

const AppPlaceholder = ({ status }: ImagePlaceholderProps) => <span className={\`art art--\${status}\`} />;

const AppCrash = ({ error, label, reset }: ErrorFallbackProps) => (
  <section role="alert">
    <h2>{label}</h2>
    <p>{String(error)}</p>
    <button onClick={reset}>Try again</button>
  </section>
);

const APP_ICONS: IconSet = { ...ICONS, house: houseDuotone };

const OVERRIDES: TesseraOverrides = {
  spinner: AppSpinner,
  writeText: (text) => clipboard.writeText(text),
  link: AppLink,
  imagePlaceholder: AppPlaceholder,
  strings: {
    common: { cancel: 'Annuler', confirm: 'Confirmer', loading: 'Chargement' },
    panels: { copyDebugInfo: 'Copier les infos de débogage' },
  },
  errorFallback: AppCrash,
  emptyArt: <img src="/art/empty.svg" alt="" />,
  portalDocument: hostWindow.document,
  icons: APP_ICONS,
};

createRoot(root).render(
  <TesseraProvider overrides={OVERRIDES}>
    <App />
  </TesseraProvider>,
);`;

export { PROVIDER_SETUP_CODE };
