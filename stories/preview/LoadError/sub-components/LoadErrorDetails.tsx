/* @layer stories @kind component */
import { Pre } from '../../../../src/primitives';
import { Disclosure } from '../../Disclosure/Disclosure';
import { LOAD_ERROR_STRINGS } from '../load-error-strings.constants';
import type { LoadErrorDetailsProps } from '../LoadError.type';

const LoadErrorDetails = ({ text, small }: LoadErrorDetailsProps) => (
  <Disclosure summary={LOAD_ERROR_STRINGS.details} size={small ? 'sm' : 'md'} className="load-error__details">
    <Pre className="load-error__raw" tabIndex={0}>{text}</Pre>
  </Disclosure>
);

export { LoadErrorDetails };
