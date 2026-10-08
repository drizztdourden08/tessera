/* @layer stories @kind component */
import { Markdown } from '../../../src/composites';
import { RELEASE_NOTE } from './markdown-notes.constants';

const ReleaseNotes = () => <Markdown source={RELEASE_NOTE} size="sm" headingOffset={2} hideTitle />;

export { ReleaseNotes };
