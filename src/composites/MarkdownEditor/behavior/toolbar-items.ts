/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { ToolbarItem } from '../../Toolbar/Toolbar.type';
import { MARKDOWN_EDITOR_ACTIONS, MARKDOWN_EDITOR_GROUPS } from '../MarkdownEditor.constants';
import type { MarkdownEditorToolbarItemsInput } from '../MarkdownEditor.type';
import { chordLabel } from './chord-label';

const groupItems = (strings: TesseraStrings['markdownEditor'], input: MarkdownEditorToolbarItemsInput): ToolbarItem[] =>
  MARKDOWN_EDITOR_GROUPS.flatMap((group, index): ToolbarItem[] => {
    const buttons = MARKDOWN_EDITOR_ACTIONS.filter((spec) => group.includes(spec.id)).map((spec): ToolbarItem => ({
      kind: 'button',
      id: spec.id,
      label: strings[spec.id],
      icon: spec.icon,
      shortcut: spec.key ? chordLabel(spec.key) : undefined,
      disabled: input.disabled,
      onSelect: () => input.onAction(spec.id),
    }));
    return index > 0 ? [{ kind: 'separator', id: `separator-${group.join('-')}` }, ...buttons] : buttons;
  });

const toolbarItems = (strings: TesseraStrings['markdownEditor'], input: MarkdownEditorToolbarItemsInput): ToolbarItem[] => {
  const { disabled, onPickImages, toggle } = input;
  const image: ToolbarItem[] = onPickImages
    ? [{ kind: 'separator', id: 'separator-image' }, { kind: 'button', id: 'image', label: strings.image, icon: 'image', disabled, onSelect: onPickImages }]
    : [];
  const preview: ToolbarItem[] = toggle
    ? [
        { kind: 'separator', id: 'separator-preview' },
        { kind: 'toggle', id: 'preview', label: strings.preview, icon: toggle.active ? 'eye-off' : 'eye', pressed: toggle.active, disabled: toggle.disabled, onChange: toggle.onToggle },
      ]
    : [];
  return [...groupItems(strings, input), ...image, ...preview];
};

export { toolbarItems };
