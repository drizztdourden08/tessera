/* @layer stories @kind story */
import { useState } from 'react';
import { TextInput, type ControlSize } from '../../../src/primitives';

type IconCase = 'decorative start' | 'copy button' | 'both ends';

const ICON_CASES: readonly IconCase[] = ['decorative start', 'copy button', 'both ends'];

const CopyField = (props: { size: ControlSize; mark?: boolean }) => {
  const { size, mark = false } = props;
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard.writeText('HYRULE-48213');
    setCopied(true);
  };
  return (
    <TextInput
      size={size}
      defaultValue="HYRULE-48213"
      aria-label="Invite code"
      start={mark ? { icon: 'key-round' } : undefined}
      end={{ icon: copied ? 'check' : 'copy', label: copied ? 'Copied' : 'Copy invite code', onClick: copy }}
    />
  );
};

const iconCase = (row: IconCase, size: ControlSize) => {
  if (row === 'decorative start') return <TextInput size={size} type="email" defaultValue="link@hyrule.example" aria-label="Email" start={{ icon: 'mail' }} />;
  return <CopyField size={size} mark={row === 'both ends'} />;
};

export { ICON_CASES, iconCase };
