/* @layer stories @kind component */
import { Widget } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { SUBLABEL_CASES } from './widget-sublabel.constants';

const WidgetSublabelDemo = () => (
  <Box className="widget-story__sublabels">
    {SUBLABEL_CASES.map((item) => (
      <Box key={item.name} className="widget-story__sublabel-cell">
        <Text className="story-label">{item.name}</Text>
        <Box className="widget-story__sublabel-frame">
          <Widget
            id="session"
            tabs={[{ id: 'session', label: item.title, sublabel: item.sublabel }]}
            activeId="session"
            paneKey={null}
            opacity={1}
            onActivateTab={() => undefined}
            onClose={() => undefined}
          >
            <Text>Hover the title bar when the text is clipped.</Text>
          </Widget>
        </Box>
      </Box>
    ))}
  </Box>
);

export { WidgetSublabelDemo };
