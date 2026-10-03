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
        { name: 'Portal', summary: 'Renders into a shared layer, for overlays not tied to a trigger.' },
        { name: 'Anchored', summary: 'A popup the browser pins to its trigger, with no scroll lag.' },
        { name: 'Floating', summary: 'A panel pinned to the window at a measured place.' },
      ],
    },
    {
      group: 'Display',
      entries: [
        { name: 'SectionHeader', summary: 'A section title with an optional subtitle and action.' },
        { name: 'TermList', summary: 'Terms and their definitions, one per row.' },
        { name: 'StatRow', summary: 'A label and its value on one line.' },
        { name: 'Badge', summary: 'A count or a dot, after text or on the corner of an icon.' },
        { name: 'Status', summary: 'A read-only word for the state something is in, as text or a pill.' },
        { name: 'Tag', summary: 'A value that sorts an item into a group: removable, selectable or plain.' },
        { name: 'EmptyState', summary: 'What to show when a list or panel has nothing yet.' },
        { name: 'Image', summary: 'An image that holds its box, with loading and broken placeholders.' },
        { name: 'Thumbnail', summary: 'A small framed picture for lists and cards, with the same placeholders.' },
        { name: 'Video', summary: 'A video player with its own control bar, keys and error state.' },
        { name: 'Canvas', summary: 'A 2D drawing surface for charts and pixel art.' },
        { name: 'Svg', summary: 'Inline SVG pieces for computed drawings.' },
        { name: 'ScaleLabels', summary: 'Labels and ticks along a scale, from a value rule, pairs or a function.' },
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
        { name: 'Link', summary: 'A link to a URL in the Tessera look, with tones and an external variant.' },
      ],
    },
    {
      group: 'Inputs',
      entries: [
        { name: 'TextInput', summary: 'One line of text, with an optional icon or button at either end.' },
        { name: 'SearchInput', summary: 'A search field with a search icon and a clear button.' },
        { name: 'PasswordInput', summary: 'A password with a show button, any mask character, a Caps Lock warning and an optional checklist.' },
        { name: 'Textarea', summary: 'Several lines of text.' },
        { name: 'NumberInput', summary: 'A number with bounds and a step.' },
        { name: 'Stepper', summary: 'A number with minus and plus buttons.' },
        { name: 'Checkbox', summary: 'One on or off choice with a label.' },
        { name: 'Toggle', summary: 'A switch for a setting that applies at once.' },
        { name: 'ToggleGroup', summary: 'Several independent toggles as one control.' },
        { name: 'RadioGroup', summary: 'One choice out of a few, all visible.' },
        { name: 'SegmentedControl', summary: 'One choice out of a few, as joined buttons.' },
        { name: 'Select', summary: 'One or several choices out of many, in a dropdown with columns.' },
        { name: 'Combobox', summary: 'Type to narrow a list, then pick one or several.' },
        { name: 'Slider', summary: 'A value, or a low and high pair, on one track, with labels from a rule.' },
        { name: 'TagInput', summary: 'Free tags with suggestions and validation.' },
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
        { name: 'Toast', summary: 'A short message that dismisses itself.' },
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
        { name: 'RouterLink', summary: 'A link to a route in the app: a real href, and a plain click calls the app navigate.' },
      ],
    },
  ],
};

export { PRIMITIVES_TIER };
