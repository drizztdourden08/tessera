/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Flex, Icon, IconButton, Text } from '../../../src/primitives';
import type { IconName } from '../../../src/primitives';

type FileEntry = { path: string; name?: string; size?: number; modified?: string };
type FileListProps = { files: readonly FileEntry[]; empty?: ReactNode; dense?: boolean };

const ICON_OF: Record<string, IconName> = { zip: 'archive', txt: 'file-text', log: 'file-text', yaml: 'file-text', archipelago: 'package', apsave: 'save' };
const iconOf = (name: string): IconName => ICON_OF[name.split('.').pop() ?? ''] ?? 'file';
const sizeOf = (bytes?: number) => {
  if (bytes === undefined) return '';
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
};

const FileList = ({ files, empty, dense }: FileListProps) => (
  <Box as="ul" className="spike-files" data-dense={dense ? '' : undefined}>
    {!files.length && <Box as="li" className="spike-file"><Text variant="caption">{empty}</Text></Box>}
    {files.map((f) => {
      const name = f.name ?? f.path.split(/[\\/]/).pop() ?? f.path;
      return (
        <Box as="li" key={f.path} className="spike-file">
          <Icon name={iconOf(name)} className="spike-file__icon" />
          <Text variant="body" className="spike-file__name" title={f.path}>{name}</Text>
          <Text variant="caption" numeric className="spike-file__size">{sizeOf(f.size)}</Text>
          <Text variant="caption" className="spike-file__date">{f.modified}</Text>
          <Flex gap="xs">
            <IconButton size="sm" variant="ghost" label={`Open ${name}`}><Icon name="external-link" /></IconButton>
            <IconButton size="sm" variant="ghost" label={`Show ${name} in its folder`}><Icon name="folder-open" /></IconButton>
          </Flex>
        </Box>
      );
    })}
  </Box>
);

export { FileList };
export type { FileEntry, FileListProps };
