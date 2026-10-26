/* @layer renderer-components @kind component */
import { Checkbox } from '../../../primitives/Checkbox';
import { ListItem } from '../../../primitives/List';
import { splitTask } from '../behavior/split-task';
import { taskState } from '../behavior/task-state';
import { useMarkdownSettings } from '../behavior/useMarkdownSettings';
import { NO_CHANGE } from '../Markdown.constants';
import type { MarkdownPartProps } from '../Markdown.type';

const MarkdownListItem = ({ node, children }: MarkdownPartProps) => {
  const { size } = useMarkdownSettings();
  const checked = taskState(node);
  if (checked === undefined) return <ListItem>{children}</ListItem>;
  const { label, nested } = splitTask(children);
  return (
    <ListItem bare>
      <Checkbox checked={checked} disabled onChange={NO_CHANGE} size={size === 'inline' ? 'sm' : size} label={label} />
      {nested}
    </ListItem>
  );
};

export { MarkdownListItem };
