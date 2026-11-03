/* @layer stories @kind data */
const IMAGE_TYPES = ['image/*'];

const FILE_INPUT_TEXT = {
  button: 'Attach images',
  none: 'No file chosen',
};

const FILE_INPUT_CODE = `import { useRef } from 'react';
import { Button, FileInput } from '@drizztdourden08/tessera';

const AttachButton = ({ onAttach }: { onAttach: (files: File[]) => void }) => {
  const pick = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button onClick={() => pick.current?.click()}>Attach images</Button>
      <FileInput ref={pick} accept={['image/*']} multiple onFiles={onAttach} />
    </>
  );
};
`;

export { FILE_INPUT_CODE, FILE_INPUT_TEXT, IMAGE_TYPES };
