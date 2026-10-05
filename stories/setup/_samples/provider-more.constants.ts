/* @layer stories @kind data */
import { GUIDE_LINKS } from './guide-links.constants';
import type { GuideTopic } from './guide.type';

const PROVIDER_MORE: GuideTopic = {
  title: 'Not an override',
  points: [
    `Links: ${GUIDE_LINKS.link} draws a URL, and with \`navigate\` a route in the app. Link takes the router navigate as a prop, so no provider is involved.`,
    `Tokens, the palette and the fonts: ${GUIDE_LINKS.setup}.`,
    `The provider in the long form: ${GUIDE_LINKS.usingTessera}.`,
  ],
};

export { PROVIDER_MORE };
