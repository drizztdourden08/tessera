/* @layer stories @kind component */
import { Button, Icon } from '../../../src/primitives';
import { SITE_TEXT } from './site-samples.constants';

const SiteSignInButton = () => (
  <Button variant="primary" size="sm" icon={<Icon name="log-in" />}>{SITE_TEXT.signInTitle}</Button>
);

export { SiteSignInButton };
