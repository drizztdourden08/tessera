/* @layer stories @kind component */
import { Box } from '../../../src/primitives';
import { SPLASH_STYLES } from './splash-sheets.constants';
import type { SplashFrameProps } from './SplashFrame.type';
import './SplashFrame.css';

const pageOf = (body: string, palette: string | undefined): string => `<!DOCTYPE html>
<html lang="en"${palette ? ` data-palette="${palette}"` : ''}>
<head><meta charset="UTF-8"><style>${SPLASH_STYLES}</style></head>
<body class="ts-splash">${body}</body>
</html>`;

const SplashFrame = (props: SplashFrameProps) => {
  const { body, label, palette } = props;
  const frame = { srcDoc: pageOf(body, palette) };
  return <Box as="iframe" className="splash-frame" title={label} {...frame} />;
};

export { SplashFrame };
