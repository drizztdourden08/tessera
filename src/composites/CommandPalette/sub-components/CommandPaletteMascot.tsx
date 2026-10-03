/* @layer renderer-components @kind component */
import { ChosenMascot } from '../../../brand/ChosenMascot';
import { mascotAnimation } from '../behavior/mascot-animation';
import type { CommandPaletteMascotProps } from './CommandPaletteMascot.type';

const CommandPaletteMascot = (props: CommandPaletteMascotProps) => {
  const { mascot, query, count, title } = props;
  return <ChosenMascot mascot={mascot} animation={mascotAnimation(query, count)} title={title} className="command-palette__mascot" />;
};

export { CommandPaletteMascot };
