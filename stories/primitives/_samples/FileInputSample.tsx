/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { Button, FileInput, Flex, Text } from '../../../src/primitives';
import { FILE_INPUT_TEXT, IMAGE_TYPES } from './file-input-story.constants';

const FileInputSample = ({ multiple }: { multiple: boolean }) => {
  const pick = useRef<HTMLInputElement>(null);
  const [names, setNames] = useState<string[]>([]);
  return (
    <Flex gap="sm" align="center" wrap>
      <Button onClick={() => pick.current?.click()}>{FILE_INPUT_TEXT.button}</Button>
      <FileInput ref={pick} accept={IMAGE_TYPES} multiple={multiple} onFiles={(files) => setNames(files.map((file) => file.name))} />
      <Text tone="muted">{names.length > 0 ? names.join(', ') : FILE_INPUT_TEXT.none}</Text>
    </Flex>
  );
};

export { FileInputSample };
