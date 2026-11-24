/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { Field } from '../../primitives/Field';
import { useAutoFocus } from './behavior/useAutoFocus';
import { useEditorKeys } from './behavior/useEditorKeys';
import { useEditorMode } from './behavior/useEditorMode';
import { useImageInsert } from './behavior/useImageInsert';
import { sendProps } from './behavior/send-props';
import { useMarkdownActions } from './behavior/useMarkdownActions';
import type { MarkdownEditorProps } from './MarkdownEditor.type';
import { MarkdownEditorFoot } from './sub-components/MarkdownEditorFoot';
import { MarkdownEditorPreview } from './sub-components/MarkdownEditorPreview';
import { MarkdownEditorTabs } from './sub-components/MarkdownEditorTabs';
import { MarkdownEditorWrite } from './sub-components/MarkdownEditorWrite';
import { MarkdownEditorToolbar } from './sub-components/MarkdownEditorToolbar';
import '../../theme/composer-box.css';
import './MarkdownEditor.css';

const MarkdownEditor = (props: MarkdownEditorProps) => {
  const {
    value, onChange, label, hint, error, placeholder, layout, compact, preview, toolbarEnd, actions, submitLabel, submitDisabled, rows, onLink, images, linkIds, onSubmit, onEscape, maxLength, count, onImageFiles, className,
  } = props;
  const disabled = props.disabled === true;
  const autoFocus = props.autoFocus === true;
  const rootRef = useRef<HTMLElement | null>(null);
  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const { mode, tabbed, pane, setPane, writing, previewShown, previewDrawn, toggle } = useEditorMode(rootRef, { layout, compact, disabled, preview });
  useAutoFocus(areaRef, autoFocus && !disabled, setPane);
  const off = disabled || !writing;
  const { run, onKeyDown: onShortcut } = useMarkdownActions(areaRef, off);
  const image = useImageInsert(areaRef, { onImageFiles, disabled: off });
  const onKeyDown = useEditorKeys({ value, onSubmit, submitDisabled: submitDisabled === true, onEscape, onShortcut });

  const composer = mode === 'composer';
  const send = sendProps({ label: submitLabel, value, disabled, submitDisabled, onSubmit });
  const foot = <MarkdownEditorFoot value={value} maxLength={maxLength} count={count} actions={actions} send={send} floating={composer} />;

  return (
    <Field label={label} hint={hint} error={error} width="full">
      <Box ref={rootRef} className={['markdown-editor', className].filter(Boolean).join(' ')} data-layout={mode} data-send={send ? mode : undefined}>
        <Box className={composer ? 'composer-box' : 'composer-box markdown-editor__frame'}>
          <MarkdownEditorToolbar disabled={off} onAction={run} toggle={toggle} end={toolbarEnd} onImages={image.insertFiles} />
          {tabbed && <MarkdownEditorTabs pane={pane} onPane={setPane} />}
          <Box className="markdown-editor__panes">
            <MarkdownEditorWrite
              areaRef={areaRef}
              hidden={!writing}
              composer={composer}
              compact={compact === true}
              rows={rows}
              value={value}
              label={props['aria-label']}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={count ? undefined : maxLength}
              onChange={onChange}
              extra={{ onKeyDown, ...image.textareaProps }}
            />
            {previewDrawn && <MarkdownEditorPreview value={value} onLink={onLink} images={images} linkIds={linkIds} hidden={!previewShown} />}
          </Box>
          {composer && foot}
        </Box>
        {!composer && foot}
      </Box>
    </Field>
  );
};

export { MarkdownEditor };
