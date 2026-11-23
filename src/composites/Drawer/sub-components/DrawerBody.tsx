/* @layer renderer-components @kind component */
import { ButtonRow } from '../../../primitives/ButtonRow';
import { Card } from '../../../primitives/Card';
import { ScrollArea } from '../../../primitives/ScrollArea';
import type { DrawerBodyProps } from '../Drawer.type';

const DrawerBody = ({ split, actions, children }: DrawerBodyProps) => {
  const content = (
    <>
      <ScrollArea className="drawer__body">{children}</ScrollArea>
      {actions !== undefined && <ButtonRow className="drawer__actions">{actions}</ButtonRow>}
    </>
  );
  return split ? <Card surface="glass" flush className="drawer__body-card">{content}</Card> : content;
};

export { DrawerBody };
