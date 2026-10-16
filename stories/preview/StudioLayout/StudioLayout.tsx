/* @layer stories @kind component */
import { Box, HintScope } from '../../../src/primitives';
import { StudioPanel } from './sub-components/StudioPanel';
import type { StudioLayoutProps } from './StudioLayout.type';
import './StudioLayout.css';

const StudioLayout = (props: StudioLayoutProps) => {
  const { bar, start, end, children, className } = props;
  return (
    <HintScope>
      <Box className={['studio-layout', className].filter(Boolean).join(' ')}>
        {bar}
        <Box className="studio-layout__body">
          {start && <StudioPanel side="start" spec={start} />}
          <Box className="studio-layout__centre">{children}</Box>
          {end && <StudioPanel side="end" spec={end} />}
        </Box>
      </Box>
    </HintScope>
  );
};

export { StudioLayout };
