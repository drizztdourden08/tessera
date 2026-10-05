/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A file or folder path the user can type, drop from the desktop or pick with Browse in one box, with copy, reveal and clear.',
  useWhen: [
    'A setting holds the path of a file or a folder, such as an SSH key, a ROM, a save folder or an output zip.',
    'The app shows a path it made, read only, and the user may copy it or open its folder.',
  ],
  avoidWhen: [
    { case: 'The app needs the contents of the files, not their path.', use: 'DropZone' },
    { case: 'The value is free text that is not a path.', use: 'TextInput' },
  ],
  rules: [
    'Pass onBrowse to open the dialog of the app, such as the native dialog through Electron, and return the picked path or null.',
    'Pass resolvePath in Electron, such as webUtils.getPathForFile, so a drop gives the full path and not only the name.',
    'Set kind and accept to what the setting takes, so a wrong drop is turned away with a reason.',
    'Pass onReveal only when the app can show the file in its folder.',
  ],
  a11y: [
    'The input takes the label, hint and error of its Field, and typing edits the path.',
    'Copy, Reveal, Clear and Browse are buttons with names, in that order after the input.',
    'A drop that is turned away marks the input invalid and says why in an alert under it.',
  ],
  tree: {
    path: ['a value the user sets', 'a path to a file or folder'],
    rule: 'PathInput takes a typed, dropped or browsed path in one box and cuts a long one in the middle, the same way in every app.',
  },
  example: `import { Field, PathInput } from '@drizztdourden08/tessera';

interface Bridge {
  pickFile: () => Promise<string | null>;
  showInFolder: (path: string) => void;
  pathOf: (file: File) => string;
}

const KeyFileSetting = ({ bridge, keyPath, setKeyPath }: { bridge: Bridge; keyPath: string | null; setKeyPath: (path: string | null) => void }) => (
  <Field label="Key file" hint="Only the path is stored.">
    <PathInput
      value={keyPath}
      onChange={setKeyPath}
      onBrowse={bridge.pickFile}
      onReveal={bridge.showInFolder}
      resolvePath={bridge.pathOf}
      placeholder="No key file yet"
    />
  </Field>
);
`,
  propsHash: '0347fa9da023f2e0',
} satisfies ComponentUsage;

export { usage };
