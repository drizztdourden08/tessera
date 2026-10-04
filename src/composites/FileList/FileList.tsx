/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { FileRow } from './sub-components/FileRow';
import type { FileListProps } from './FileList.type';
import './FileList.css';

const FileList = (props: FileListProps) => {
  const { files, onOpen, onReveal, empty, dense = false, label, className } = props;
  const { items } = useTesseraStrings();
  const classes = ['file-list', className].filter(Boolean).join(' ');
  if (files.length === 0) {
    return <Box className={`${classes} file-list--empty`} data-dense={dense ? '' : undefined}>{empty ?? items.noFiles}</Box>;
  }
  return (
    <Box as="ul" className={classes} aria-label={label ?? items.files} data-dense={dense ? '' : undefined}>
      {files.map((file) => <FileRow key={file.path} file={file} onOpen={onOpen} onReveal={onReveal} />)}
    </Box>
  );
};

export { FileList };
