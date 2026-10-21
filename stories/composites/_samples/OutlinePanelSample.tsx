/* @layer stories @kind component */
import { SidePanel } from '../../../src/composites';
import { Box, Icon, IconButton, Paragraph, Text } from '../../../src/primitives';
import { SIDE_PANEL_TEXT as T } from './side-panel-story.constants';
import type { OutlinePanelSampleProps } from './side-panel-story.type';

const OutlinePanelSample = (props: OutlinePanelSampleProps) => {
  const { folded = false, collapsible = true, actions = false } = props;
  const add = actions ? <IconButton size="sm" variant="ghost" label={T.add}><Icon name="plus" /></IconButton> : undefined;
  return (
    <Box className="side-panel-story">
      <SidePanel title={T.outline} defaultCollapsed={folded} collapsible={collapsible} action={add} width={224} minWidth={176} maxWidth={360} containers={[{ title: 'Layers', content: T.layers.map((layer) => <Text key={layer}>{layer}</Text>) }]} />
      <Box surface="sunken" className="side-panel-story__canvas"><Paragraph tone="dim">{T.canvas}</Paragraph></Box>
      <SidePanel side="end" title={T.inspector} defaultCollapsed={folded} collapsible={collapsible} width={256} minWidth={192} maxWidth={400} containers={[{ title: 'Properties', content: <Paragraph tone="dim">{T.inspectorLine}</Paragraph> }]} />
    </Box>
  );
};

export { OutlinePanelSample };
