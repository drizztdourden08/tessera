/* @layer renderer-components @kind component */
import type { ChangeEvent } from 'react';
import type { FileInputProps } from './FileInput.type';

const FileInput = (props: FileInputProps) => {
  const { accept, multiple = false, disabled = false, onFiles, ref } = props;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (files.length > 0) onFiles(files);
  };

  return (
    <input
      ref={ref}
      type="file"
      hidden
      tabIndex={-1}
      accept={accept?.join(',')}
      multiple={multiple}
      disabled={disabled}
      onChange={handleChange}
    />
  );
};

export { FileInput };
