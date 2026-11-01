/* @layer tooling-scripts @kind logic */
import { runnerImport } from 'vite';
import { loadBrands } from './load-brands.mjs';
import { DEFAULT_PALETTE } from './tokens.constants.mjs';
import { GROUND_GRADIENTS } from './splash-contrast.constants.mjs';
import { splashMarkContrast } from './splash-mark-contrast.mjs';

const RUNNER = { configFile: false, logLevel: 'silent' };
const GRAPHIC = 3;
const OUTLINE_DRAWN_INTO_THE_ART = { rotp: '#000000' };
const KEPT_AS_DRAWN_WITH_ITS_OUTLINE_UNDER_3 = [{ app: 'rotp', ground: 'dark' }];

const isKept = (app, ground) => KEPT_AS_DRAWN_WITH_ITS_OUTLINE_UNDER_3.some((kept) => kept.app === app && kept.ground === ground);

const shown = (ratio) => ratio.toFixed(2);

const splashMarkCases = async (root, tokensOf) => {
  const [{ family, apps, rim }, look, ink] = await Promise.all([
    loadBrands(root),
    runnerImport('/src/brand/ground-look.ts', { ...RUNNER, root }),
    runnerImport('/src/brand/mark-ink.ts', { ...RUNNER, root }),
  ]);

  const markEdges = (app, ground) => {
    const { paths, outline } = look.module.groundLook(ink.module.markInk(family[app].mark, ground), ground);
    if (outline) return { edge: 'outline', paths: [{ ink: rim.colours[outline] }] };
    const drawn = OUTLINE_DRAWN_INTO_THE_ART[app];
    return drawn && !isKept(app, ground) ? { edge: 'drawn outline', paths: [{ ink: drawn }] } : { edge: 'shape', paths };
  };

  const grounds = apps.flatMap((app) => Object.keys(GROUND_GRADIENTS).map((ground) => {
    const tokens = tokensOf(app === 'tessera' ? DEFAULT_PALETTE : app);
    const { edge, paths } = markEdges(app, ground);
    return { app, ground, edge, shapes: splashMarkContrast(paths, tokens, GROUND_GRADIENTS[ground]) };
  }));

  const drawn = grounds.filter(({ app, ground }) => !isKept(app, ground)).flatMap(({ app, ground, edge, shapes }) =>
    shapes.map((shape, at) => ({
      label: `${app} mark on the ${ground} gradient, ${edge === 'shape' ? `shape ${at + 1}` : edge} in ${shape.ink}`,
      ratio: shape.ratio,
      need: GRAPHIC,
    })));

  const kept = grounds.filter(({ app, ground }) => isKept(app, ground)).map(({ app, ground, shapes }) => {
    const ratios = shapes.map(({ ratio }) => ratio);
    return {
      label: `${app} mark on the ${ground} gradient, kept as drawn (its lowest shape is ${shown(Math.min(...ratios))}:1)`,
      ratio: Math.max(...ratios),
      need: GRAPHIC,
    };
  });

  return [...drawn, ...kept];
};

export { splashMarkCases };
