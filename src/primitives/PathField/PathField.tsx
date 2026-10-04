/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { usePathField } from './behavior/usePathField';
import type { PathFieldProps } from './PathField.type';
import { PathFieldInput } from './sub-components/PathFieldInput';
import { PathFieldTools } from './sub-components/PathFieldTools';
import './PathField.css';

const PathField = (props: PathFieldProps) => {
  const { value, onReveal, copyable = true, className } = props;
  const { paths } = useTesseraStrings();
  const view = usePathField(props);
  return (
    <Box className={['path-field', className].filter(Boolean).join(' ')}>
      <Box
        className="path-field__frame"
        data-dropping={view.drop.dropping || undefined}
        data-invalid={view.invalid || undefined}
        data-disabled={view.disabled || undefined}
        title={value ?? undefined}
        {...view.drop.handlers}
      >
        <Icon name={view.kind === 'folder' ? 'folder' : 'file'} className="path-field__icon" />
        <PathFieldInput view={view} value={value} label={props['aria-label']} />
        <PathFieldTools
          value={value} kind={view.kind} editable={view.editable} disabled={view.disabled} copyable={copyable} onClear={view.clear} onReveal={onReveal}
        />
        {view.browse && <Button size="sm" variant="secondary" disabled={view.disabled} onClick={view.browse}>{value ? paths.change : paths.browse}</Button>}
      </Box>
      {view.words.problem && (
        <Text id={view.problemId} variant="caption" tone="danger" role="alert" className="path-field__problem">{view.words.problem}</Text>
      )}
    </Box>
  );
};

export { PathField };
