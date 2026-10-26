/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { Field } from '../../primitives/Field';
import { Textarea } from '../../primitives/Textarea';
import { counterShown } from './behavior/counter-shown';
import { useAutoFocus } from './behavior/useAutoFocus';
import { useEditorKeys } from './behavior/useEditorKeys';
import { useEditorMode } from './behavior/useEditorMode';
import { useMarkdownActions } from './behavior/useMarkdownActions';
import { DEFAULT_ROWS } from './MarkdownEditor.constants';
import type { MarkdownEditorProps } from './MarkdownEditor.type';
import { MarkdownEditorCounter } from './sub-components/MarkdownEditorCounter';
import { MarkdownEditorPreview } from './sub-components/MarkdownEditorPreview';
import { MarkdownEditorTabs } from './sub-components/MarkdownEditorTabs';
import { MarkdownEditorToolbar } from './sub-components/MarkdownEditorToolbar';
import './MarkdownEditor.css';

const MarkdownEditor = (props: MarkdownEditorProps) => {
  const {
    value, onChange, label, hint, error, placeholder, disabled = false, layout, rows = DEFAULT_ROWS, onLink, images, linkIds, onSubmit, onEscape, maxLength, autoFocus = false, className,
  } = props;
  const rootRef = useRef<HTMLElement | null>(null);
  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const { mode, tabbed, pane, setPane, writing } = useEditorMode(rootRef, layout);
  useAutoFocus(areaRef, autoFocus && !disabled, setPane);
  const off = disabled || !writing;
  const { run, onKeyDown: onShortcut } = useMarkdownActions(areaRef, off);
  const onKeyDown = useEditorKeys({ value, onSubmit, onEscape, onShortcut });

  return (
    <Field label={label} hint={hint} error={error} width="full">
      <Box ref={rootRef} className={['markdown-editor', className].filter(Boolean).join(' ')} data-layout={mode}>
        <MarkdownEditorToolbar disabled={off} onAction={run} />
        {tabbed && <MarkdownEditorTabs pane={pane} onPane={setPane} />}
        <Box className="markdown-editor__panes">
          <Box className="markdown-editor__write" hidden={!writing}>
            <Textarea
              ref={areaRef}
              aria-label={props['aria-label']}
              value={value}
              rows={rows}
              maxLength={maxLength}
              placeholder={placeholder}
              disabled={disabled}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={onKeyDown}
            />
            {maxLength !== undefined && counterShown(value.length, maxLength) && <MarkdownEditorCounter count={value.length} max={maxLength} />}
          </Box>
          <MarkdownEditorPreview value={value} onLink={onLink} images={images} linkIds={linkIds} hidden={tabbed && pane !== 'preview'} />
        </Box>
      </Box>
    </Field>
  );
};

export { MarkdownEditor };
