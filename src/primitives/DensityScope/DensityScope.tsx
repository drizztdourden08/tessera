/* @layer renderer-components @kind component */
import { DensityContext } from '../field-control/density-context';
import type { DensityScopeProps } from './DensityScope.type';
import './DensityScope.css';

const DensityScope = (props: DensityScopeProps) => {
  const { density, children } = props;
  return (
    <DensityContext.Provider value={density}>
      <div className="density-scope" data-density={density}>{children}</div>
    </DensityContext.Provider>
  );
};

export { DensityScope };
