/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import type { HamburgerIconProps } from './HamburgerIcon.type';
import './HamburgerIcon.css';

const HamburgerIcon = (props: HamburgerIconProps) => (
  <Span className={`hamburger-icon${props.open ? ' hamburger-icon--open' : ''}`} aria-hidden="true">
    <Span className="hamburger-icon__bar" />
    <Span className="hamburger-icon__bar" />
    <Span className="hamburger-icon__bar" />
  </Span>
);

export { HamburgerIcon };
