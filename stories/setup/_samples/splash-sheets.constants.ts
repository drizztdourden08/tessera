/* @layer stories @kind data */
const SHEETS = import.meta.glob<string>(['../../../splash-tokens.css', '../../../splash.css'], { eager: true, query: '?raw', import: 'default' });

const FONTS = import.meta.glob<string>(['../../../fonts/inter/inter.css', '../../../fonts/chakra-petch/chakra-petch.css'], { eager: true, query: '?inline', import: 'default' });

const SPLASH_STYLES = [...Object.values(FONTS), SHEETS['../../../splash-tokens.css'] ?? '', SHEETS['../../../splash.css'] ?? ''].join('\n');

export { SPLASH_STYLES };
