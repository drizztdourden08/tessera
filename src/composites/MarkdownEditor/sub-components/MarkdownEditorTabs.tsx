/* @layer renderer-components @kind component */
import { Tabs } from '../../../primitives/Tabs';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { MarkdownEditorTabsProps } from '../MarkdownEditor.type';

const MarkdownEditorTabs = (props: MarkdownEditorTabsProps) => {
  const { pane, onPane } = props;
  const { markdownEditor } = useTesseraStrings();
  return (
    <Tabs
      tabs={[{ id: 'write', label: markdownEditor.write }, { id: 'preview', label: markdownEditor.preview }]}
      activeTab={pane}
      onTabChange={(id) => onPane(id === 'preview' ? 'preview' : 'write')}
    />
  );
};

export { MarkdownEditorTabs };
