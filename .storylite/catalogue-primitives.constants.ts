/* @layer root-config @kind data */
import type { CatalogueTier } from './catalogue.type';

const PRIMITIVES_TIER: CatalogueTier = {
  tier: 'Primitives',
  intro: 'Tier 1: single-purpose, presentational building blocks. Raw HTML lives only here.',
  groups: [
    {
      group: 'Layout',
      entries: [
        { name: 'Box', summary: 'The plain container every other block is built from.' },
        { name: 'Flex', summary: 'A row or column with token gaps and alignment.' },
        { name: 'Stack', summary: 'A vertical Flex, for lists of blocks.' },
        { name: 'Grid', summary: 'A token-spaced CSS grid.' },
        { name: 'Center', summary: 'Centres its content on both axes.' },
        { name: 'Spacer', summary: 'Fixed or flexible empty space.' },
        { name: 'Divider', summary: 'A hairline between sections, either direction.' },
        { name: 'Card', summary: 'A raised surface for one self-contained item.' },
        { name: 'ScrollArea', summary: 'A scroll box with styled bars and scroll syncing.' },
        { name: 'Portal', summary: 'Renders into a top layer and anchors to an element.' },
        { name: 'Floating', summary: 'A panel pinned to the window at a measured place.' },
      ],
    },
    {
      group: 'Display',
      entries: [
        { name: 'Text', summary: 'Body, label, title, subtitle and caption text.' },
        { name: 'SectionHeader', summary: 'A section title with an optional subtitle and action.' },
        { name: 'TermList', summary: 'Terms and their definitions, one per row.' },
        { name: 'StatRow', summary: 'A label and its value on one line.' },
        { name: 'Badge', summary: 'A short status word in a semantic colour.' },
        { name: 'StatusBadge', summary: 'A progress status (draft, review, done) as a chip.' },
        { name: 'EmptyState', summary: 'What to show when a list or panel has nothing yet.' },
        { name: 'Image', summary: 'An image with a fallback when it cannot load.' },
        { name: 'Thumbnail', summary: 'A small framed picture for lists and cards.' },
        { name: 'Video', summary: 'A video element with sensible defaults.' },
        { name: 'Canvas', summary: 'A 2D drawing surface for charts and pixel art.' },
        { name: 'Svg', summary: 'Inline SVG pieces for computed drawings.' },
      ],
    },
    {
      group: 'Actions',
      entries: [
        { name: 'Button', summary: 'Primary, secondary, tertiary, ghost, danger, tile and bare.' },
        { name: 'IconButton', summary: 'A square button that holds only an icon.' },
        { name: 'ButtonRow', summary: 'A row of buttons with consistent spacing.' },
      ],
    },
    {
      group: 'Inputs',
      entries: [
        { name: 'TextInput', summary: 'One line of text.' },
        { name: 'Textarea', summary: 'Several lines of text.' },
        { name: 'NumberInput', summary: 'A number with bounds and a step.' },
        { name: 'Stepper', summary: 'A number with minus and plus buttons.' },
        { name: 'Checkbox', summary: 'One on or off choice with a label.' },
        { name: 'Toggle', summary: 'A switch for a setting that applies at once.' },
        { name: 'ToggleGroup', summary: 'Several independent toggles as one control.' },
        { name: 'RadioGroup', summary: 'One choice out of a few, all visible.' },
        { name: 'SegmentedControl', summary: 'One choice out of a few, as joined buttons.' },
        { name: 'Select', summary: 'One choice out of many, in a dropdown.' },
        { name: 'Slider', summary: 'A value on a continuous range.' },
        { name: 'RangeInput', summary: 'The bare native range input.' },
        { name: 'RangeSlider', summary: 'A low and high value on one track.' },
        { name: 'PositionInput', summary: 'An x and y pair with per-axis bounds.' },
        { name: 'TagInput', summary: 'Free tags with suggestions and validation.' },
        { name: 'TagPicker', summary: 'Tags picked from a fixed, grouped vocabulary.' },
        { name: 'ColorSwatch', summary: 'A colour chip, pickable or read-only.' },
        { name: 'DropZone', summary: 'Drop or browse for a file.' },
        { name: 'Field', summary: 'A label, hint and error around any input.' },
      ],
    },
    {
      group: 'Feedback',
      entries: [
        { name: 'Spinner', summary: 'Work in progress with no known end.' },
        { name: 'ProgressBar', summary: 'Work in progress with a known end, one or two fills.' },
        { name: 'ProgressRing', summary: 'Progress as a ring, for tight spaces.' },
        { name: 'Toast', summary: 'A short message that dismisses itself.' },
        { name: 'Tooltip', summary: 'A hint on hover or focus.' },
      ],
    },
    {
      group: 'Navigation',
      entries: [{ name: 'TabBar', summary: 'Tabs that scroll when they overflow.' }],
    },
  ],
};

export { PRIMITIVES_TIER };
