/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import './HamburgerIcon.css';

const HamburgerIcon = () => (
  <Span className="hamburger-icon" aria-hidden="true">
    <Span className="hamburger-icon__bar" />
    <Span className="hamburger-icon__bar" />
    <Span className="hamburger-icon__bar" />
  </Span>
);

export { HamburgerIcon };
