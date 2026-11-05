/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { Field } from '../../primitives/Field';
import { Textarea } from '../../primitives/Textarea';
import { useAutoFocus } from './behavior/useAutoFocus';
import { useEditorKeys } from './behavior/useEditorKeys';
import { useEditorMode } from './behavior/useEditorMode';
import { useImageInsert } from './behavior/useImageInsert';
import { rowsOf } from './behavior/rows-of';
import { useMarkdownActions } from './behavior/useMarkdownActions';
import type { MarkdownEditorProps } from './MarkdownEditor.type';
import { MarkdownEditorFoot } from './sub-components/MarkdownEditorFoot';
import { MarkdownEditorPreview } from './sub-components/MarkdownEditorPreview';
import { MarkdownEditorTabs } from './sub-components/MarkdownEditorTabs';
import { MarkdownEditorToolbar } from './sub-components/MarkdownEditorToolbar';
import './MarkdownEditor.css';

const MarkdownEditor = (props: MarkdownEditorProps) => {
  const {
    value, onChange, label, hint, error, placeholder, disabled = false, layout, compact, preview, toolbarEnd, actions, rows, onLink, images, linkIds, onSubmit, onEscape, maxLength, count, onImageFiles, autoFocus = false, className,
  } = props;
  const rootRef = useRef<HTMLElement | null>(null);
  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const { mode, tabbed, pane, setPane, writing, previewShown, previewDrawn, toggle } = useEditorMode(rootRef, { layout, compact, disabled, preview });
  useAutoFocus(areaRef, autoFocus && !disabled, setPane);
  const off = disabled || !writing;
  const { run, onKeyDown: onShortcut } = useMarkdownActions(areaRef, off);
  const image = useImageInsert(areaRef, { onImageFiles, disabled: off });
  const onKeyDown = useEditorKeys({ value, onSubmit, onEscape, onShortcut });

  return (
    <Field label={label} hint={hint} error={error} width="full">
      <Box ref={rootRef} className={['markdown-editor', className].filter(Boolean).join(' ')} data-layout={mode}>
        <Box className="markdown-editor__frame">
          <MarkdownEditorToolbar disabled={off} onAction={run} toggle={toggle} end={toolbarEnd} onImages={image.insertFiles} />
          {tabbed && <MarkdownEditorTabs pane={pane} onPane={setPane} />}
          <Box className="markdown-editor__panes">
            <Box className="markdown-editor__write" hidden={!writing}>
              <Textarea
                ref={areaRef}
                aria-label={props['aria-label']}
                value={value}
                rows={rowsOf(rows, compact)}
                maxLength={count ? undefined : maxLength}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(event) => onChange(event.target.value)}
                onKeyDown={onKeyDown}
                {...image.textareaProps}
              />
            </Box>
            {previewDrawn && <MarkdownEditorPreview value={value} onLink={onLink} images={images} linkIds={linkIds} hidden={!previewShown} />}
          </Box>
        </Box>
        <MarkdownEditorFoot value={value} maxLength={maxLength} count={count} actions={actions} />
      </Box>
    </Field>
  );
};

export { MarkdownEditor };
