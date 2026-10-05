/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { formatValue } from '../../../primitives/listbox/format-value';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span, Time } from '../../../primitives/text-elements';
import { fileIcon } from '../behavior/file-icon';
import { fileName } from '../behavior/file-name';
import type { FileRowProps } from '../FileList.type';
import { FileButton } from './FileButton';

const FileRow = (props: FileRowProps) => {
  const { file, onOpen, onReveal } = props;
  const { items, navigation } = useTesseraStrings();
  const name = fileName(file);
  const { path, size, modified } = file;
  return (
    <Box as="li" className="file-list__row">
      <Icon name={fileIcon(name, file.icon)} size={18} className="file-list__icon" aria-hidden />
      <Span className="file-list__name">{name}</Span>
      <Span className="file-list__size">{size === undefined ? null : formatValue(size, 'bytes')}</Span>
      <Span className="file-list__date">
        {modified === undefined ? null : <Time dateTime={new Date(modified).toISOString()}>{formatValue(modified, 'datetime')}</Time>}
      </Span>
      <Box className="file-list__actions">
        {onOpen && <FileButton label={navigation.openNamed(name)} icon="external-link" onPress={() => onOpen(path)} />}
        {onReveal && <FileButton label={items.revealFile(name)} icon="folder-open" onPress={() => onReveal(path)} />}
      </Box>
    </Box>
  );
};

export { FileRow };
