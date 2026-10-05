/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Button } from '../../primitives/Button';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { usePathInput } from './behavior/usePathInput';
import type { PathInputProps } from './PathInput.type';
import { PathInputBox } from './sub-components/PathInputBox';
import { PathInputTools } from './sub-components/PathInputTools';
import './PathInput.css';

const PathInput = (props: PathInputProps) => {
  const { value, onReveal, copyable = true, className } = props;
  const { paths } = useTesseraStrings();
  const view = usePathInput(props);
  return (
    <Box className={['path-input', className].filter(Boolean).join(' ')}>
      <Box
        className="path-input__frame"
        data-dropping={view.drop.dropping || undefined}
        data-invalid={view.invalid || undefined}
        data-disabled={view.disabled || undefined}
        title={value ?? undefined}
        {...view.drop.handlers}
      >
        <Icon name={view.kind === 'folder' ? 'folder' : 'file'} className="path-input__icon" />
        <PathInputBox view={view} value={value} label={props['aria-label']} />
        <PathInputTools
          value={value} kind={view.kind} editable={view.editable} disabled={view.disabled} copyable={copyable} onClear={view.clear} onReveal={onReveal}
        />
        {view.browse && <Button size="sm" variant="secondary" disabled={view.disabled} onClick={view.browse}>{value ? paths.change : paths.browse}</Button>}
      </Box>
      {view.words.problem && (
        <Text id={view.problemId} variant="caption" tone="danger" role="alert" className="path-input__problem">{view.words.problem}</Text>
      )}
    </Box>
  );
};

export { PathInput };
