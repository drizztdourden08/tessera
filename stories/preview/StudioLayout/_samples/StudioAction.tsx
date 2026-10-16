/* @layer stories @kind component */
import { Button } from '../../../../src/primitives';
import type { StudioActionProps } from './studio-sample.type';

const StudioAction = (props: StudioActionProps) => {
  const { label, hint, primary = false } = props;
  return <Button size="sm" variant={primary ? 'primary' : 'secondary'} hint={{ label, description: hint }}>{label}</Button>;
};

export { StudioAction };
