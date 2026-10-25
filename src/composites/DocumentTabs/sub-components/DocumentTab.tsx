/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Pressable } from '../../../primitives/Pressable';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import '../../../theme/focus-ring.css';
import '../../../theme/visually-hidden.css';
import { middleClose } from '../behavior/middle-close';
import { CLOSE_ICON_SIZE, ICON_SIZE } from '../DocumentTabs.constants';
import type { DocumentTabProps } from '../DocumentTabs.type';
import './DocumentTab.css';

const DocumentTab = ({ tab, index, domId, total, active, tabbable, drag, onActivate, onClose }: DocumentTabProps) => {
  const { documentTabs } = useTesseraStrings();
  return (
    <Box
      role="presentation"
      className="document-tabs__tab"
      data-reorder-index={index}
      data-reorder-key={tab.id}
      data-active={active ? 'yes' : undefined}
      data-unsaved={tab.unsaved ? 'yes' : undefined}
      data-drop={drag.dropMark(index, total)}
      data-dragging={drag.dragging === index ? 'yes' : undefined}
    >
      <Pressable
        id={domId}
        role="tab"
        aria-selected={active}
        tabIndex={tabbable ? 0 : -1}
        title={tab.tooltip ?? tab.title}
        className="document-tabs__main focus-ring-inset"
        onClick={() => onActivate(tab.id)}
        {...drag.handlers(index)}
        {...middleClose(() => onClose(tab.id))}
      >
        {tab.icon && <Icon name={tab.icon} size={ICON_SIZE} className="document-tabs__icon" />}
        <Span className="document-tabs__title">{tab.title}</Span>
        {tab.unsaved && <Span className="visually-hidden">{documentTabs.unsaved}</Span>}
      </Pressable>
      <Box className="document-tabs__end">
        {tab.unsaved && <Box className="document-tabs__dot" aria-hidden />}
        <IconButton
          variant="ghost"
          size="xs"
          label={documentTabs.close(tab.title)}
          tabIndex={-1}
          className="document-tabs__close"
          onClick={() => onClose(tab.id)}
        >
          <Icon name="x" size={CLOSE_ICON_SIZE} />
        </IconButton>
      </Box>
    </Box>
  );
};

export { DocumentTab };
