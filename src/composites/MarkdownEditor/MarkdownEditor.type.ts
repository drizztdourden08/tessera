/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode } from 'react';
import type { IconName } from '../../primitives/Icon';
import type { MarkdownImages, MarkdownLinkHandler, MarkdownLinkId } from '../Markdown/Markdown.type';

type MarkdownEditorLayout = 'split' | 'tabs';

type MarkdownEditorPane = 'write' | 'preview';

type MarkdownEditorActionId = 'bold' | 'italic' | 'list' | 'numberedList' | 'quote' | 'link' | 'code' | 'codeBlock';

type MarkdownEditorListStyle = 'bullet' | 'number';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  layout?: MarkdownEditorLayout;
  compact?: boolean;
  preview?: boolean;
  toolbarEnd?: ReactNode;
  rows?: number;
  onLink?: MarkdownLinkHandler;
  images?: MarkdownImages;
  linkIds?: MarkdownLinkId | MarkdownLinkId[];
  onSubmit?: (value: string) => void;
  onEscape?: () => void;
  maxLength?: number;
  autoFocus?: boolean;
  className?: string;
  'aria-label'?: string;
}

type MarkdownEditorKeyIntent = 'submit' | 'escape';

interface MarkdownEditorKeyEvent {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  defaultPrevented: boolean;
}

interface MarkdownEditorKeysInput {
  value: string;
  onSubmit: ((value: string) => void) | undefined;
  onEscape: (() => void) | undefined;
  onShortcut: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

interface MarkdownEditorCounterProps {
  count: number;
  max: number;
}

interface TextEdit {
  from: number;
  to: number;
  insert: string;
  selectStart: number;
  selectEnd: number;
}

interface MarkdownEditorActionSpec {
  id: MarkdownEditorActionId;
  icon: IconName;
  key?: string;
}

interface MarkdownEditorPreviewToggle {
  active: boolean;
  disabled: boolean;
  onToggle: () => void;
}

interface MarkdownEditorToolbarProps {
  disabled: boolean;
  onAction: (id: MarkdownEditorActionId) => void;
  toggle?: MarkdownEditorPreviewToggle;
  end?: ReactNode;
}

interface MarkdownEditorPreviewToggleProps {
  toggle: MarkdownEditorPreviewToggle;
}

interface MarkdownEditorActionButtonProps {
  spec: MarkdownEditorActionSpec;
  disabled: boolean;
  onAction: (id: MarkdownEditorActionId) => void;
}

interface MarkdownEditorMode {
  mode: MarkdownEditorLayout | 'compact' | 'write';
  tabbed: boolean;
  pane: MarkdownEditorPane;
  setPane: (pane: MarkdownEditorPane) => void;
  writing: boolean;
  previewShown: boolean;
  previewDrawn: boolean;
  toggle: MarkdownEditorPreviewToggle | undefined;
}

interface MarkdownEditorModeOptions {
  layout: MarkdownEditorLayout | undefined;
  compact: boolean | undefined;
  disabled: boolean;
  preview: boolean | undefined;
}

interface MarkdownEditorTabsProps {
  pane: MarkdownEditorPane;
  onPane: (pane: MarkdownEditorPane) => void;
}

interface MarkdownEditorPreviewProps {
  value: string;
  onLink?: MarkdownLinkHandler;
  images?: MarkdownImages;
  linkIds?: MarkdownLinkId | MarkdownLinkId[];
  hidden: boolean;
}

export type {
  MarkdownEditorActionButtonProps, MarkdownEditorActionId, MarkdownEditorActionSpec, MarkdownEditorLayout, MarkdownEditorListStyle,
  MarkdownEditorCounterProps, MarkdownEditorKeyEvent, MarkdownEditorKeyIntent, MarkdownEditorKeysInput, MarkdownEditorMode, MarkdownEditorModeOptions,
  MarkdownEditorPreviewProps, MarkdownEditorPreviewToggle, MarkdownEditorPreviewToggleProps, MarkdownEditorProps, MarkdownEditorTabsProps, MarkdownEditorToolbarProps, TextEdit,
};
