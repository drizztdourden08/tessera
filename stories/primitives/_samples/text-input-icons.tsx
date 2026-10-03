/* @layer stories @kind story */
import { useState } from 'react';
import { TextInput, type ControlSize } from '../../../src/primitives';

type IconCase = 'decorative start' | 'password reveal' | 'copy button' | 'both ends';

const ICON_CASES: readonly IconCase[] = ['decorative start', 'password reveal', 'copy button', 'both ends'];

const PasswordField = (props: { size: ControlSize; label?: boolean }) => {
  const { size } = props;
  const [shown, setShown] = useState(false);
  return (
    <TextInput
      size={size}
      type={shown ? 'text' : 'password'}
      defaultValue="triforce"
      aria-label="Password"
      start={props.label === true ? { icon: 'lock' } : undefined}
      end={{ icon: shown ? 'eye-off' : 'eye', label: shown ? 'Hide password' : 'Show password', onClick: () => setShown(!shown) }}
    />
  );
};

const CopyField = (props: { size: ControlSize }) => {
  const { size } = props;
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
      end={{ icon: copied ? 'check' : 'copy', label: copied ? 'Copied' : 'Copy invite code', onClick: copy }}
    />
  );
};

const iconCase = (row: IconCase, size: ControlSize) => {
  if (row === 'decorative start') return <TextInput size={size} type="email" defaultValue="link@hyrule.example" aria-label="Email" start={{ icon: 'mail' }} />;
  if (row === 'password reveal') return <PasswordField size={size} />;
  if (row === 'copy button') return <CopyField size={size} />;
  return <PasswordField size={size} label />;
};

export { ICON_CASES, iconCase };
