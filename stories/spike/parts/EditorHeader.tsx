/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { ContentHeader } from '../../../src/composites';
import { Flex, Icon, IconButton, Status, TextInput } from '../../../src/primitives';
import type { StatusTone } from '../../../src/primitives';
import { ActionBar } from './ActionBar';
import type { BarAction } from './ActionBar';

type EditorState = 'clean' | 'dirty' | 'saving' | 'saved' | 'error';
type EditorHeaderProps = {
  name: string;
  onNameChange: (name: string) => void;
  namePlaceholder?: string;
  context?: ReactNode;
  state?: EditorState;
  onBack?: () => void;
  backLabel?: string;
  icon?: ReactNode;
  actions?: readonly BarAction[];
  keep?: number;
};

const STATE: Record<EditorState, { label: string; tone: StatusTone; pulse?: boolean }> = {
  clean: { label: 'No changes', tone: 'neutral' },
  dirty: { label: 'Unsaved changes', tone: 'warning' },
  saving: { label: 'Saving', tone: 'info', pulse: true },
  saved: { label: 'Saved', tone: 'success' },
  error: { label: 'Not saved', tone: 'danger' },
};

const EditorHeader = (props: EditorHeaderProps) => {
  const { name, onNameChange, namePlaceholder, context, state = 'clean', onBack, backLabel = 'Back', icon, actions = [], keep } = props;
  const look = STATE[state];
  return (
    <ContentHeader
      compact
      icon={icon}
      title={(
        <Flex gap="xs" align="center">
          {onBack && <IconButton size="sm" variant="ghost" label={backLabel} onClick={onBack}><Icon name="arrow-left" /></IconButton>}
          <TextInput className="spike-name-input" aria-label="Name" value={name} placeholder={namePlaceholder} onChange={(e) => onNameChange(e.target.value)} />
        </Flex>
      )}
      strip={<Flex gap="sm" align="center">{context}<Status tone={look.tone} dot pulse={look.pulse}>{look.label}</Status></Flex>}
      actions={<ActionBar actions={actions} keep={keep} />}
    />
  );
};

export { EditorHeader };
export type { EditorHeaderProps, EditorState };
