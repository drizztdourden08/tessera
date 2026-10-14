/* @layer stories @kind component */
import { Card, Paragraph } from '../../../src/primitives';
import { Carousel } from '../../../src/composites';
import { TIPS, TIPS_TEXT } from './carousel-story.constants';

const SLIDES = TIPS.map((tip) => ({ id: tip.title, label: tip.title, content: <Paragraph tone="dim">{tip.text}</Paragraph> }));

const TipsCarousel = () => (
  <Card title={TIPS_TEXT.title} className="carousel-story__tips">
    <Carousel label={TIPS_TEXT.title} slides={SLIDES} />
  </Card>
);

export { TipsCarousel };
