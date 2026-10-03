/* @layer stories @kind story */
import { useState } from 'react';
import { Box, Button, Field, PasswordInput, Text, TextInput, type PasswordInputProps } from '../../../src/primitives';
import { SIGN_UP_RULES } from './password-samples.constants';

type StatefulPasswordProps = Omit<PasswordInputProps, 'value' | 'onChange'> & { initial?: string };

const StatefulPassword = (props: StatefulPasswordProps) => {
  const { initial = '', ...rest } = props;
  const [value, setValue] = useState(initial);
  return <PasswordInput {...rest} value={value} onChange={setValue} />;
};

const CapsLockDemo = () => (
  <Box className="story-column">
    <Text className="story-label">Click in the field, then press Caps Lock. The warning shows while the field has focus.</Text>
    <StatefulPassword initial="hylian shield" />
  </Box>
);

const SignUpForm = () => {
  const [email, setEmail] = useState('link@hyrule.example');
  const [password, setPassword] = useState('');
  const [again, setAgain] = useState('');
  const ready = SIGN_UP_RULES.every((rule) => rule.test(password)) && again === password;
  const mismatch = again !== '' && again !== password;
  return (
    <Box as="form" className="story-column" onSubmit={(event) => event.preventDefault()}>
      <Field label="Email">
        <TextInput type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </Field>
      <Field label="Password">
        <PasswordInput mode="new" rules={SIGN_UP_RULES} value={password} onChange={setPassword} />
      </Field>
      <Field label="Confirm password" error={mismatch ? 'The passwords do not match.' : undefined}>
        <PasswordInput mode="new" value={again} onChange={setAgain} />
      </Field>
      <Box>
        <Button type="submit" variant="primary" disabled={!ready}>Create account</Button>
      </Box>
    </Box>
  );
};

export { CapsLockDemo, SignUpForm, StatefulPassword };
