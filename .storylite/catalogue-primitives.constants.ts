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
        { name: 'Inline', summary: 'A horizontal Flex, for a row of items side by side.' },
        { name: 'Center', summary: 'A Flex that puts its content in the middle on both axes.' },
        { name: 'Grid', summary: 'A token-spaced CSS grid.' },
        { name: 'Spacer', summary: 'Fixed or flexible empty space.' },
        { name: 'Divider', summary: 'A hairline between sections, either direction.' },
        { name: 'Card', summary: 'A raised surface for one self-contained item.' },
        { name: 'ScrollArea', summary: 'A scroll box with styled bars and scroll syncing.' },
        { name: 'Portal', summary: 'Renders into a shared layer, for overlays not tied to a trigger.' },
        { name: 'Anchored', summary: 'A popup the browser pins to its trigger, with no scroll lag.' },
        { name: 'Overlay', summary: 'A dimmed layer over a panel or the window, with content on top.' },
      ],
    },
    {
      group: 'Display',
      entries: [
        { name: 'SectionHeader', summary: 'A section title with an optional subtitle and action.' },
        { name: 'StatRow', summary: 'A label and its value on one line.' },
        { name: 'Badge', summary: 'A count or a dot, after text or on the corner of an icon.' },
        { name: 'Status', summary: 'A read-only word for the state something is in, as text or a pill, or drawn from a table of states.' },
        { name: 'Tag', summary: 'A value that sorts an item into a group: removable, selectable or plain.' },
        { name: 'EmptyState', summary: 'What to show when a list or panel has nothing yet.' },
        { name: 'Image', summary: 'An image that holds its box, with loading and broken placeholders, plain or in a small frame.' },
        { name: 'Canvas', summary: 'A 2D drawing surface for charts and pixel art.' },
        { name: 'Svg', summary: 'Inline SVG pieces for computed drawings.' },
        { name: 'ScaleLabels', summary: 'Labels and ticks along a scale, from a value rule, pairs or a function.' },
      ],
    },
    {
      group: 'Charts',
      entries: [
        { name: 'Sparkline', summary: 'A small line or area chart of the latest samples, with a threshold band.' },
        { name: 'Gauge', summary: 'A round meter for one value against its limit, coloured by its zone.' },
        { name: 'StackedBar', summary: 'One bar split into the parts of a whole, with tooltips, a legend and an Other part.' },
      ],
    },
    {
      group: 'Actions',
      entries: [
        { name: 'Button', summary: 'Primary, secondary, tertiary, ghost, danger, tile and bare.' },
        { name: 'IconButton', summary: 'A square button that holds only an icon.' },
        { name: 'ButtonRow', summary: 'A row of buttons with consistent spacing.' },
        { name: 'ButtonGroup', summary: 'Buttons joined into one control, with shared borders.' },
        { name: 'Pressable', summary: 'A button with no look, for a clickable surface the caller draws.' },
        { name: 'Link', summary: 'A link to a URL or an app route in the Tessera look, with tones and an external variant.' },
      ],
    },
    {
      group: 'Inputs',
      entries: [
        { name: 'TextInput', summary: 'One line of text, with an optional icon or button at either end.' },
        { name: 'SearchInput', summary: 'A search field with a search icon and a clear button.' },
        { name: 'Textarea', summary: 'Several lines of text.' },
        { name: 'NumberInput', summary: 'A number with bounds and a step, its buttons stacked at the end or on the sides.' },
        { name: 'Checkbox', summary: 'One on or off choice with a label.' },
        { name: 'Toggle', summary: 'A switch for a setting that applies at once.' },
        { name: 'ToggleGroup', summary: 'Several independent toggles as one control.' },
        { name: 'RadioGroup', summary: 'One choice out of a few, all visible.' },
        { name: 'SegmentedControl', summary: 'One choice out of a few, as joined buttons.' },
        { name: 'Select', summary: 'One or several choices out of many, in a dropdown with columns.' },
        { name: 'Combobox', summary: 'Type to narrow a list, then pick one or several.' },
        { name: 'Slider', summary: 'A value, or a low and high pair, on one track, with labels from a rule.' },
        { name: 'TagPicker', summary: 'Tags picked from a fixed, grouped vocabulary.' },
        { name: 'ColorSwatch', summary: 'A colour chip, pickable or read-only.' },
        { name: 'DropZone', summary: 'Drop or browse for a file.' },
        { name: 'Field', summary: 'A label, hint and error around any input.' },
        { name: 'FieldControlBoundary', summary: 'Keeps the id and error of a Field off the inner inputs of a control made of several.' },
      ],
    },
    {
      group: 'Feedback',
      entries: [
        { name: 'Spinner', summary: 'Work in progress with no known end.' },
        { name: 'ProgressBar', summary: 'Work in progress with a known end, one or two fills.' },
        { name: 'ProgressRing', summary: 'Progress as a ring, for tight spaces.' },
        { name: 'Tooltip', summary: 'A hint on hover or focus.' },
        { name: 'HintLine', summary: 'A fixed line that shows the value and meaning of the option under the pointer or focus.' },
        { name: 'HintScope', summary: 'Collects the hints of the controls inside it for a HintLine or useHint.' },
        { name: 'Callout', summary: 'A note set apart: a toned box or a footnote, with an action.' },
        { name: 'ErrorBoundary', summary: 'Catches a crash in its children and shows a notice in their place.' },
      ],
    },
    {
      group: 'Navigation',
      entries: [
        { name: 'Tabs', summary: 'Tabs that scroll when they overflow.' },
        { name: 'Stepper', summary: 'The steps of a task as circles joined by lines, filling in sequence as each step is done.' },
      ],
    },
  ],
};

export { PRIMITIVES_TIER };
