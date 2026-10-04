# ControlMenu

A dropdown of settings behind one button: each row is a label with one compact control, and the panel joins its button like a DropdownMenu.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ControlMenu } from '@drizztdourden08/tessera';
```

The source is `src/composites/ControlMenu/ControlMenu.tsx`. Its gallery page is Composites · Menus/ControlMenu (`#/story/composites-controlmenu--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? Several settings, behind one button.

ControlMenu keeps several small settings one click away without a page or a dialog.

## Use it when

- A tool, a panel or a widget has several settings that are not worth a page of their own, such as the options behind a gear.
- The settings take richer controls than a menu item: a SegmentedControl, a Slider, a Select or a NumberStepper.
- Some settings belong together and can wait one step further, in a sub-panel beside the panel.

## Use something else when

- Every entry is an action, an on or off check, or one choice from a short list. Use `DropdownMenu` instead.
- The settings are many, need explanations, or are saved with the profile. Use `SettingsPage` instead.
- The settings should stay on screen while the user works. Use `SettingsSection` instead.

## Rules

- One ControlMenuRow holds one control at size sm, with a short label; long explanations go in hint or about.
- Every control applies at once; a ControlMenu has no Save or Cancel.
- Group related rows with ControlMenuGroup, and move rows used less often into a ControlMenuSub.
- Turn filter on when the panel holds more than about eight rows; it narrows rows by label, and rows of a sub-panel show inline under its name.
- Name the panel with label when the trigger is an icon, such as "Players options".

## Accessibility

- The trigger is a button with aria-haspopup="dialog" and aria-expanded; the panel is a dialog named by label.
- Opening moves focus to the filter, or to the first control. Tab moves through the controls, and the arrow down key leaves the filter for the first control.
- Right arrow, Enter or Space on a sub-panel row opens it and focuses its first control; Escape closes the innermost panel first and gives focus back.
- Each row hint is read into the hint line at the bottom, and about adds an info tooltip described to screen readers.

## Example

```tsx
import { ControlMenu, ControlMenuRow, ControlMenuSub, SegmentedControl, Slider, Toggle } from '@drizztdourden08/tessera';

const DENSITY = [{ value: 'cozy', label: 'Cozy' }, { value: 'compact', label: 'Compact' }];

const ViewOptions = (props: { density: string; zoom: number; sounds: boolean; onChange: (patch: object) => void }) => (
  <ControlMenu trigger={{ label: 'View options', icon: 'sliders-horizontal' }} filter>
    <ControlMenuRow label="Density" hint={{ label: 'Density', description: 'How much room each row takes' }}>
      <SegmentedControl size="sm" aria-label="Density" value={props.density} options={DENSITY} onChange={(density) => props.onChange({ density })} />
    </ControlMenuRow>
    <ControlMenuRow label="Zoom">
      <Slider size="sm" value={props.zoom} min={50} max={200} onChange={(zoom) => props.onChange({ zoom })} />
    </ControlMenuRow>
    <ControlMenuSub label="Sounds" icon="volume-2">
      <ControlMenuRow label="Play sounds">
        <Toggle size="sm" checked={props.sounds} onChange={(sounds) => props.onChange({ sounds })} aria-label="Play sounds" />
      </ControlMenuRow>
    </ControlMenuSub>
  </ControlMenu>
);
```

## Props

- `trigger`: `MenuTrigger`.
- `children`: `ReactNode`.
- `label` (optional): `string`.
- `header` (optional): `ReactNode`.
- `filter` (optional): `boolean`. Default `false`.
- `filterPlaceholder` (optional): `string`.
- `hints` (optional): `boolean`. Default `true`.
- `align` (optional): `DropAlign`, one of `'start'`, `'end'`, `'auto'`. Default `'auto'`.
- `variant` (optional): `MenuVariant`, one of `'danger'`, `'ghost'`, `'info'`, `'primary'`, `'secondary'`, `'success'`, `'tertiary'`, `'warning'`.
- `intensity` (optional): `MenuIntensity`, one of `'strong'`, `'medium'`, `'subtle'`.
- `size` (optional): `MenuSize`, one of `'sm'`, `'md'`.
- `disabled` (optional): `boolean`.
- `defaultOpen` (optional): `boolean`.
- `onOpenChange` (optional): `(open: boolean) => void`.
- `className` (optional): `string`.
- `triggerClassName` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-danger`, `--c-danger-bright`, `--c-danger-soft`, `--c-hairline`, `--c-hover`, `--c-info`, `--c-info-bright`, `--c-info-soft`, `--c-primary`, `--c-primary-bright`, `--c-primary-dim`, `--c-primary-soft`, `--c-secondary`, `--c-secondary-bright`, `--c-secondary-soft`, `--c-success`, `--c-success-bright`, `--c-success-soft`, `--c-surface`, `--c-tertiary`, `--c-tertiary-bright`, `--c-tertiary-soft`, `--c-text`, `--c-text-dim`, `--c-text-faint`, `--c-text-muted`, `--c-warning`, `--c-warning-bright`, `--c-warning-soft`, `--control-sub-width`, `--duration-fast`, `--ease-standard`, `--leading-normal`, `--listbox-attach`, `--listbox-space`, `--menu-no-halo`, `--radius-md`, `--shadow-2`, `--shadow-dropdown`, `--size-1`, `--size-128`, `--size-16`, `--size-160`, `--size-192`, `--size-2`, `--size-224`, `--size-24`, `--size-256`, `--size-288`, `--size-4`, `--size-48`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--text-sm`, `--text-xs`, `--tracking-caps`, `--tracking-wide`, `--transition-fast`, `--tunnel-fillet`, `--tunnel-lit-height`, `--tunnel-lit-top`, `--tunnel-open`, `--weight-medium`, `--weight-semi`, `--z-modal`, `--z-popover`.

## Also exported from this folder

`ControlMenuGroup`, `ControlMenuRow`, `ControlMenuSub`.
