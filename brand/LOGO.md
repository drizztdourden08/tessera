<!-- @layer docs @kind doc -->
# The family logos

Every mark in the family lives in the design system, so an app shows its own logo from the same package it takes its components from:

```tsx
import { BrandMark, BrandWordmark, Mascot } from '@drizztdourden08/tessera/brand';

<BrandMark app="archipelia" size="lg" variant="app-icon" />
<Mascot brand="rotp" variant="hookshop" scale={4} />
<BrandWordmark app="rotp" />
<PixelWordmark text="Hello" colors={['#ffe26e', '#ffd639', '#fcbb28', '#ffa200']} />
```

The path data is in `src/brand/marks/`, the names, colours and descriptions in `src/brand/family.constants.ts`. The SVG files in this folder (`tessera.svg`, `rotp.svg`, `archipelia.svg`, `brock.svg`) are the same marks for use outside code. Every app has a wordmark set in the pixel alphabet (`PixelWordmark`): the brand data holds only its text and four gradient colours, and `brand/*-wordmark.svg` are the same wordmarks as files. Uppercase letters draw at capital size and lowercase smaller, so Relic of the Past is `RELIC of the PAST`. The alphabet's letters for RELIC OF THE PAST come from that wordmark's artwork; the others are drawn in the same stroke. The gallery shows the whole family on the **Brand / Brand** page, and each part on its own on the **Logo**, **WordMark**, **Combined** and **Mascot** pages. The brand gradients are on **Colours / Gradients**.

## Brand gradients

Each brand has one gradient, drawn behind its mark on a splash window or a hero panel. It is the `gradient` field of the brand data, `brandGradientCss(gradient)` as a CSS string, and the `--brand-<app>-gradient` token. `pnpm tokens` writes the tokens and `tokens.json` from the brand data, so the three never differ. Each one is chosen so its own mark reads on it: a test holds every stop at 3:1 or more against the mark.

| Brand | Stops, at 160 degrees | Why |
|---|---|---|
| Tessera | `#3d3d42`, `#232327`, `#0e0e12` | Dark greys into the splash ground, under light grey tiles |
| Relic of the Past | `#3a2e14`, `#1e1810`, `#12100e` | Its gold sunk into its near black tile |
| Archipelia | `#ece6ff`, `#e2d8ff`, `#c1a8ff` | Its tile into its wordmark lilacs, under a dark purple mark |
| Brock | `#ffc66e`, `#ffb341`, `#ff9416` | Its wordmark oranges, light enough for the dark ink mark |

## App icons

The brand data says how each app shows as an app icon, in its `appIcon` field. Tessera has none: it is a package, not an app. Relic of the Past and Brock are `straight`: the mark alone, with no tile or container. Archipelia is `tile`: its mark on its rounded tile. `<BrandMark variant="app-icon" />` draws what the data says, and draws the mark for a brand with no app icon.

## Icon files

`pnpm icons` writes every file below from the brand data, so the files never differ from the components. It clears each brand's output folders first, so a redrawn mark never leaves a stale file behind.

- `brand/<app>.svg`: the mark as a file.
- `brand/<app>/mark/mark-<size>.png`: the mark on a transparent square, at 16, 24, 32, 48, 64, 128, 256 and 512 pixels. A brand with no app icon, Tessera, also gets `mark.ico` holding 16 to 256; it is the gallery favicon.
- `brand/<app>/icon/`, for an app only: the app icon as `icon.svg`, `png/icon-<size>.png` at the same sizes plus `icon-1024.png` for the installer builder, `icon.ico` holding 16 to 256, `maskable-512.png` and the two Android layers. `brand/<app>/splash/` holds the splash. A `tile` app draws the maskable icon and the Android background on its tile colour and the splash on the dark splash ground, with the mark in its dark ground look. A `straight` app draws all of them on transparent ground: the maskable icon and the splash are the mark alone, and the Android background layer is empty.
- `brand/light-rim/` and `brand/dark-rim/`: every file above except the mascot, with a rim and no tile. See Rims below.
- `brand/light-ground/<app>.svg`, `brand/dark-ground/<app>.svg` and `mark/mark-<size>.png` beside each: the mark in its look for the light or the dark gradient. See Light and dark grounds below.
- `brand/<app>/mascot/`, for a brand with a mascot: each variant as `<variant>.svg` and as crisp transparent renders at 1, 2 and 4 times, and the mascot itself as a PNG ladder and `<variant>.ico`.

Every square PNG follows one rule, taken from Relic of the Past. Pixel art that fits at two or more screen pixels per art pixel is scaled by a whole number and centred, so every pixel stays square. Smaller than that, or for a drawn mark, the art is drawn smooth to fit. The sizes live in `src/brand/icon-sizes.constants.ts` and the file names in `src/brand/icon-files.ts`. The gallery's **Logo / Icon files** story shows each brand's own ladder and .ico as generated, in one row, and **Mascot / Icon files** shows each mascot's.

## Rims

A dark mark such as Brock's nearly disappears on a dark title bar or taskbar, and a light one on a light surface. Every logo takes a rim for that: a thin outline in a light or a dark colour that follows the silhouette, holes included. It is a stroke on the mark's own paths, drawn behind the mark, so it stays crisp at 16 pixels.

```tsx
<BrandMark app="brock" size="sm" rim="light" />
<Logo brand="archipelia" rim="light" />
<Logo.Combined brand="brock" rim="light" />
<Logo.Wordmark brand="archipelia" rim="dark" />
```

`rim` is `'none'` (the default), `'light'` or `'dark'`, on `BrandMark`, `Logo`, `Logo.Combined`, `Logo.Wordmark`, `BrandWordmark` and `PixelWordmark`. In code the rim sits outside the mark's box and never shrinks the mark. With `variant="app-icon"` on a tile app the rim outlines the tile; a rim is meant for the mark alone, so use `variant="mark"`. There is no automatic rim: every Tessera theme is dark, so it would always pick light, and only the app knows when a mark sits on a light panel.

| Token | Value | Use |
|---|---|---|
| `--brand-rim-light` | `#ececf0` | The light rim, for dark surfaces |
| `--brand-rim-dark` | `#0e0e12` | The dark rim, for light surfaces, the splash ground colour |
| `--brand-rim-sm` | 1 px | Marks at `sm` and `md`, the `sm` wordmark |
| `--brand-rim-md` | 1.5 px | Marks at `lg`, the `md` wordmark |
| `--brand-rim-lg` | 2 px | The `lg` wordmark |
| `--brand-rim-xl` | 3 px | Marks at `xl` |

The colours live in `src/brand/rim.constants.ts` (`BRAND_RIM`) and `pnpm tokens` writes them into `src/tokens/brand.css` and `splash-tokens.css`. The files follow the same data: the rim is a fortieth of the drawn art's side (`ratio`), never under 1 pixel (`minPx`), and a whole art pixel for pixel art.

### Rimmed files

`pnpm icons` writes every brand's files again with each rim, in two trees beside the brand folders that copy their layout:

- `brand/light-rim/` and `brand/dark-rim/`, each holding `<app>.svg` and `<app>/` with the same `icon/`, `mark/` and `splash/` files and names as `brand/<app>/`.
- A rimmed set is always the mark without a tile, whatever the app's `appIcon`: Archipelia's rimmed icon, `.ico`, splash and Android layers are its bare mark with the rim, on a transparent ground. Mascots have no rimmed files.
- Each PNG of the ladder is drawn for its size, so the 16 pixel file has a whole 1 pixel rim and the mark shrinks a little to make room for it.

An app that reads `brand/<app>/` switches to the rimmed set by reading `brand/light-rim/<app>/` instead; `../<app>.svg` then resolves to the rimmed mark too. The original files do not change.

## Light and dark grounds

A mark stands on one of two gradients of its palette: the light pair, `--c-gradient-light-*`, or the dark pair of the splash, `--c-gradient-dark-*`. Each mark names its look for each ground in its data, `grounds`: which colours it draws in and the outline around it. The shape never changes.

| Brand | On the light gradient | On the dark gradient |
|---|---|---|
| Tessera | As drawn, with a black outline | As drawn, with a white outline |
| Relic of the Past | As drawn: its own black outline is its edge | As drawn, the same mark |
| Archipelia | As drawn, with no outline | Its second colours: the ring and its dots turn lilac, `#b9a3ff`; the large purple dot stays |
| Brock | As drawn, with a black outline | As drawn, the charcoal stone, with a white outline |

```tsx
<BrandMark app="brock" ground="dark" />
<Logo brand="tessera" ground="light" />
```

`ground` is `'light'` or `'dark'`, on `BrandMark`, `Logo` and `Logo.Combined`; left out, the mark is drawn as drawn with no outline. Inside `Splash` every mark takes `'dark'` by itself; a `ground` prop still wins. A path sets its second colour in `onDark`, beside `ink`; only Archipelia has one, its lilac ring. `grounds.<ground>.inks` set to `'onDark'` draws the second colours on that ground. Brock has one set of colours, its charcoal stone, on both gradients: only its outline changes, black on the light gradient and white on the dark. `grounds.<ground>.outline`, `'light'` or `'dark'`, outlines the mark in the rim colour: half the width of the `rim` prop's, never under 1 pixel. A `rim` prop keeps its own width and wins. An app icon on its tile keeps its colours, since the tile is its ground.

`pnpm icons` writes each look as files, for a static page that shows the mark as an image: `brand/light-ground/<app>.svg` and `brand/dark-ground/<app>.svg`, each with `<app>/mark/mark-<size>.png` at the sizes of the mark ladder, and no `.ico`. The static splash page reads `brand/dark-ground/`.

A test holds each mark at 3:1 or more against each sampled point of both gradients of its palette. With an outline, the outline is the edge that has to reach 3:1, as WCAG allows for a shape with a border; Relic of the Past's own black outline is its edge on the light gradient. Without one, every shape has to. Relic of the Past on the dark gradient is kept as drawn: its black outline is 1.08:1 and its bottom row 2.87:1 there, while its gold and orange fill reads at 4.89:1 to 11.70:1. Archipelia on the light gradient has no outline by the owner's choice: its dark purple ring reads at 5.74:1, and its large purple dot at 2.36:1 is the one shape the test accepts under 3:1. The test still fails if that dot drops under 2.36:1, or if any other shape drops under 3:1.

Brock's stone faces meet with no gap: the body path covers the whole stone outline, less the hole of the b, and every face shares its edges with the faces beside it, so no ground shows between them at any size.

## Mascots

A mascot is built in code from separate SVG pieces and is never kept flattened. Each piece is data (`BrandPiece`: its pixel grid and paths), and a composition function places, turns and clips the pieces into a scene (`BrandSceneData`). `sceneMarkup` writes a scene as SVG markup, and `Mascot` draws a brand's mascot from the brand data. Inside Tessera, `BrandScene` draws a scene inline for `Mascot`, `AnimatedMascot` and the gallery; it is not exported.

Relic of the Past's mascot is Sentri: body, visor, eyes and two pods, in `src/brand/sentri/`. Its Hookshop variant has Sentri pull a shop bag in with its hookshot. The bag, the stamp (the logo itself), the hookshot's handle, links and head, and the star, sparkle and speed line are in `src/brand/hookshop/`. The rigs (`*-rig.constants.ts`) hold where each piece sits, in the numbers Relic of the Past measured on the art.

Archipelia's mascot is Pelago, an island spirit, in `src/brand/pelago/`: a floating island of faceted purple-grey stone with a violet crystal set in its face for eyes, four islets around it, threads of light that join the islets to the island and to each other, and three pebbles hanging below. It is smooth vector art (`smooth: true`) with flat facets and soft see-through glows, and no filter. Each piece is a list of polygon or oval layers placed in scene units (`facet-piece.ts`), so the same numbers draw the island at 16 and at 512 pixels. The threads are drawn from where the islets sit, so a pose that swings an islet keeps them joined; in a clip, every islet move also turns and stretches its threads (`islet-tracks.ts`). The islets, their sparks and the ring threads are drawn after the island in one group clipped out of the island's upper half (`pelago-depth.constants.ts`), so an islet passing over the top goes behind the island and one passing below goes in front, with no switch in any clip. Its `ambient` animation drifts the pebbles under every clip, and tracks with a `lag` make the islets trail the island.

To give another app a mascot, add its pieces and a composition function under `src/brand/`, and a `mascot` entry with its variants in `family.constants.ts`. The Mascot page and `pnpm icons` pick it up from there.

## The Tessera logo

A capital T laid from mosaic tiles, the tesserae the name comes from. The interactive version is the `InteractiveTessera` component, shown at the top of the gallery's home page and on the **Brand / InteractiveTessera** page. Each coloured tile has its project's logo and name beside it; pointing at either makes the tile glow, and clicking one slides the T aside to show what the project is. A grey tile or the empty space puts it back.

### Why most tiles are grey

Tessera has no colour of its own. Every project sets its own palette and Tessera takes it, so its own tiles are neutral greys in three steps.

### Why three tiles are coloured

Each coloured tile is one project built with Tessera, filled with that project's own colour. There are three today:

| Tile | Project | Colour | Why that tile |
|---|---|---|---|
| Top left of the bar | Relic of the Past | Gold `#c8a84e`, its primary | Where the T starts and where reading starts: Tessera was first built for it. |
| Middle of the stem | Archipelia | Purple `#7c4dff`, from its logo | The first app built on Brock and Tessera from day one, carried by what is below it. |
| Low in the stem | Brock | Orange `#f0862b`, its accent | The base the apps stand on. |

These three were already the coloured tiles of the render the mark was traced from, so the shape did not change: only their colours and their meaning did.

### Adding a project

Pick one grey tile, give it the new project's colour, and add a row here saying why that tile. Never recolour or move an existing project's tile. In `src/brand/marks/tessera.ts`, set that tile's `group` to the new app and its `ink` to the app's colour; add the app to `BrandApp`, to `BRAND_FAMILY` and give it a mark file of its own.
