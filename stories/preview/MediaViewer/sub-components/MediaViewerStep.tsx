/* @layer stories @kind component */
import { Icon, IconButton } from '../../../../src/primitives';
import { MEDIA_VIEWER_STRINGS } from '../media-viewer-strings.constants';
import type { MediaViewerStepProps } from '../MediaViewer.type';

const MediaViewerStep = ({ onStep }: MediaViewerStepProps) => (
  <>
    <IconButton variant="secondary" size="md" label={MEDIA_VIEWER_STRINGS.previous} className="media-viewer__step media-viewer__step--back" onClick={() => onStep(-1)}>
      <Icon name="chevron-left" />
    </IconButton>
    <IconButton variant="secondary" size="md" label={MEDIA_VIEWER_STRINGS.next} className="media-viewer__step media-viewer__step--on" onClick={() => onStep(1)}>
      <Icon name="chevron-right" />
    </IconButton>
  </>
);

export { MediaViewerStep };
