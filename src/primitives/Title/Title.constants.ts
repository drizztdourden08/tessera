/* @layer renderer-components @kind constants */
import { headingMembers } from './behavior/heading-members';

const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;

const HEADINGS = headingMembers(HEADING_LEVELS);

const { H1, H2, H3, H4, H5, H6, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } = HEADINGS;

export { H1, H2, H3, H4, H5, H6, HEADING_LEVELS, HEADINGS, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 };
