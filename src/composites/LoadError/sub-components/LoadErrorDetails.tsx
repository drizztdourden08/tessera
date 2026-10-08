/* @layer renderer-components @kind component */
import { Disclosure } from '../../../primitives/Disclosure';
import { Pre } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { LoadErrorDetailsProps } from '../LoadError.type';
import './LoadErrorDetails.css';

const LoadErrorDetails = ({ raw, small = false, center = false }: LoadErrorDetailsProps) => {
  const { common } = useTesseraStrings();
  return (
    <Disclosure summary={common.details} size={small ? 'sm' : 'md'} className={center ? 'load-error__details load-error__details--center' : 'load-error__details'}>
      <Pre className="load-error__raw" tabIndex={0}>{raw}</Pre>
    </Disclosure>
  );
};

export { LoadErrorDetails };
