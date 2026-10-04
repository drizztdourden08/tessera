/* @layer stories @kind component */
import { Box, Icon, IconButton, Tooltip, useTesseraStrings } from '../../../src/primitives';
import { EditorContext } from './sub-components/EditorContext';
import { EditorName } from './sub-components/EditorName';
import { SaveState } from './sub-components/SaveState';
import type { EditorBarProps } from './EditorBar.type';
import './EditorBar.css';

const barClass = (edge: string, className?: string): string =>
  ['editor-bar', `editor-bar--${edge}`, className].filter(Boolean).join(' ');

const EditorBar = (props: EditorBarProps) => {
  const { state, name, onNameChange, nameLabel, nameError, placeholder, context, error, back, actions, edge = 'top', className } = props;
  const { navigation } = useTesseraStrings();
  const backLabel = back ? navigation.backTo(back.label) : '';
  return (
    <Box className={barClass(edge, className)} data-state={state}>
      {back && (
        <Tooltip content={backLabel} placement="bottom" className="editor-bar__back">
          <IconButton variant="ghost" size="md" label={backLabel} onClick={back.onSelect}>
            <Icon name="arrow-left" size={18} />
          </IconButton>
        </Tooltip>
      )}
      <Box className="editor-bar__main">
        {name !== undefined && onNameChange && (
          <EditorName value={name} onChange={onNameChange} label={nameLabel} error={nameError} placeholder={placeholder} />
        )}
        {context && context.length > 0 && <EditorContext items={context} />}
      </Box>
      <Box className="editor-bar__end">
        <SaveState state={state} error={error} />
        {actions != null && <Box className="editor-bar__actions">{actions}</Box>}
      </Box>
    </Box>
  );
};

export { EditorBar };
