/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { IconName } from '../../primitives/Icon';
import type { MarkdownLinkHandler } from '../Markdown/Markdown.type';

type MarkdownEditorLayout = 'split' | 'tabs';

type MarkdownEditorPane = 'write' | 'preview';

type MarkdownEditorActionId = 'bold' | 'italic' | 'list' | 'numberedList' | 'link' | 'code' | 'codeBlock';

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
  rows?: number;
  onLink?: MarkdownLinkHandler;
  className?: string;
  'aria-label'?: string;
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

interface MarkdownEditorToolbarProps {
  disabled: boolean;
  onAction: (id: MarkdownEditorActionId) => void;
}

interface MarkdownEditorActionButtonProps {
  spec: MarkdownEditorActionSpec;
  disabled: boolean;
  onAction: (id: MarkdownEditorActionId) => void;
}

interface MarkdownEditorMode {
  mode: MarkdownEditorLayout;
  tabbed: boolean;
  pane: MarkdownEditorPane;
  setPane: (pane: MarkdownEditorPane) => void;
  writing: boolean;
}

interface MarkdownEditorTabsProps {
  pane: MarkdownEditorPane;
  onPane: (pane: MarkdownEditorPane) => void;
}

interface MarkdownEditorPreviewProps {
  value: string;
  onLink?: MarkdownLinkHandler;
  hidden: boolean;
}

export type {
  MarkdownEditorActionButtonProps, MarkdownEditorActionId, MarkdownEditorActionSpec, MarkdownEditorLayout, MarkdownEditorListStyle,
  MarkdownEditorMode, MarkdownEditorPreviewProps, MarkdownEditorProps, MarkdownEditorTabsProps, MarkdownEditorToolbarProps, TextEdit,
};
