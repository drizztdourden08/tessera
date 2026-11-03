/* @layer renderer-components @kind logic */
import { IMAGE_TYPE_PREFIX } from '../MarkdownEditor.constants';

const imageFilesOf = (files: ArrayLike<File> | null | undefined): File[] => Array.from(files ?? []).filter((file) => file.type.startsWith(IMAGE_TYPE_PREFIX));

export { imageFilesOf };
