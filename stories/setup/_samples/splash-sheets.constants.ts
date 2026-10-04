/* @layer stories @kind data */
const SHEETS = import.meta.glob<string>(['../../../splash-tokens.css', '../../../splash.css'], { eager: true, query: '?raw', import: 'default' });

const SPLASH_STYLES = [SHEETS['../../../splash-tokens.css'] ?? '', SHEETS['../../../splash.css'] ?? ''].join('\n');

export { SPLASH_STYLES };
