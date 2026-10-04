/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Button, PasswordInput } from '../../../src/primitives';

const RoomPasswordForm = () => {
  const [password, setPassword] = useState('');
  const submit = () => setPassword('');
  return (
    <Box className="connection-card__auth">
      <PasswordInput
        mode="current"
        autoComplete="off"
        placeholder="Room password"
        aria-label="Room password"
        value={password}
        onChange={setPassword}
        onEnter={submit}
      />
      <Button variant="primary" disabled={!password} onClick={submit}>Watch</Button>
    </Box>
  );
};

export { RoomPasswordForm };
