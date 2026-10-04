/* @layer stories @kind component */
import { Box, Button, Flex, Icon, IconButton, Text } from '../../../src/primitives';

type PathFieldProps = {
  value: string | null;
  kind?: 'file' | 'folder';
  placeholder?: string;
  readOnly?: boolean;
  dropping?: boolean;
  keep?: number;
};

const middle = (path: string, keep: number) => {
  if (path.length <= keep) return path;
  const head = Math.ceil(keep * 0.45);
  return `${path.slice(0, head)}…${path.slice(path.length - (keep - head))}`;
};

const PathField = ({ value, kind = 'file', placeholder, readOnly, dropping, keep = 40 }: PathFieldProps) => (
  <Flex gap="xs" align="center" className="spike-path" data-dropping={dropping ? '' : undefined} data-empty={value ? undefined : ''}>
    <Icon name={kind === 'folder' ? 'folder' : 'file'} className="spike-path__icon" />
    <Box className="spike-path__value" title={value ?? undefined}>
      {dropping
        ? <Text variant="body">Drop the file to use it</Text>
        : <Text variant="body" mono={Boolean(value)}>{value ? middle(value, keep) : placeholder}</Text>}
    </Box>
    {value && <IconButton size="sm" variant="ghost" label="Copy the path"><Icon name="copy" /></IconButton>}
    {value && <IconButton size="sm" variant="ghost" label={kind === 'folder' ? 'Open the folder' : 'Show in folder'}><Icon name="folder-open" /></IconButton>}
    {value && !readOnly && <IconButton size="sm" variant="ghost" label="Clear"><Icon name="x" /></IconButton>}
    {!readOnly && <Button size="sm" variant="secondary">{value ? 'Change…' : 'Browse…'}</Button>}
  </Flex>
);

export { PathField };
export type { PathFieldProps };
