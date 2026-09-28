<!-- @layer docs @kind doc -->
# The family logos

Every mark in the family lives in the design system, so an app shows its own logo from the same package it takes its components from:

```tsx
import { BrandMark } from '@drizztdourden08/tessera/brand';

<BrandMark app="archipelia" size="lg" tile />
<BrandMark app="rotp" variant="mascot" />
<BrandWordmark app="rotp" />
<PixelWordmark text="Hello" colors={['#ffe26e', '#ffd639', '#fcbb28', '#ffa200']} />
```

The path data is in `src/brand/marks/`, the names, colours and descriptions in `src/brand/family.constants.ts`. The SVG files in this folder (`tessera.svg`, `rotp.svg`, `archipelia.svg`, `brock.svg`) are the same marks for use outside code. Relic of the Past also has a mascot (`rotp-mascot.svg`, snapped to its 35 by 23 pixel grid). Every app has a wordmark set in the pixel alphabet (`PixelWordmark`): the brand data holds only its text and four gradient colours, and `brand/*-wordmark.svg` are the same wordmarks as files. Uppercase letters draw at capital size and lowercase smaller, so Relic of the Past is `RELIC of the PAST`. The alphabet's letters for RELIC OF THE PAST come from that wordmark's artwork; the others are drawn in the same stroke. The gallery shows them all in the **Brand / BrandMark** story.

## The Tessera logo

A capital T laid from mosaic tiles, the tesserae the name comes from. The interactive version is the `TesseraLogo` component, shown at the top of the gallery's home page and in the **Brand / TesseraLogo** story. Each coloured tile has its project's logo and name beside it; pointing at either makes the tile glow, and clicking one slides the T aside to show what the project is. A grey tile or the empty space puts it back.

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
