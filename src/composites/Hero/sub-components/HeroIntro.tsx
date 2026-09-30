/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ButtonRow } from '../../../primitives/ButtonRow';
import { Title } from '../../../primitives/Title';
import { Span } from '../../../primitives/text-elements';
import type { HeroIntroProps } from '../Hero.type';

const HeroIntro = (props: HeroIntroProps) => {
  const { eyebrow, title, actions } = props;
  return (
    <Box className="hero__intro">
      {eyebrow != null && <Span tone="primary" className="hero__eyebrow">{eyebrow}</Span>}
      <Title level={2} className="hero__title">{title}</Title>
      {actions != null && <ButtonRow align="start" className="hero__actions">{actions}</ButtonRow>}
    </Box>
  );
};

export { HeroIntro };
