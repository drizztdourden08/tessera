/* @layer stories @kind data */
const VIEWER_TEXT = {
  expand: 'Expand',
  expandName: (name: string) => `Expand ${name}`,
} as const;

const VIEWER_CODE = `import { MediaViewer } from '@drizztdourden08/tessera';

<MediaViewer
  open={opened !== null}
  items={files.map((file) => ({ id: file.id, kind: 'image', src: file.url, name: file.name }))}
  index={opened ?? 0}
  onIndexChange={setOpened}
  onClose={() => setOpened(null)}
/>`;

export { VIEWER_CODE, VIEWER_TEXT };
