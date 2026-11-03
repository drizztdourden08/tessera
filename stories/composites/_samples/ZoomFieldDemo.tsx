/* @layer stories @kind component */
import { useState } from 'react';
import { ZoomField } from '../../../src/composites';
import type { ZoomFieldProps } from '../../../src/composites';
import { Button } from '../../../src/primitives';

const PRESETS = [25, 50, 100, 200, 400];

type ZoomFieldDemoProps = Partial<Omit<ZoomFieldProps, 'actions' | 'value' | 'onChange'>> & { fit?: boolean };

const ZoomFieldDemo = ({ fit = true, min = 25, max = 1600, presets = PRESETS, ...rest }: ZoomFieldDemoProps) => {
  const [zoom, setZoom] = useState(100);
  const actions = fit ? <Button size="xs" variant="ghost" onClick={() => setZoom(200)}>Fit</Button> : undefined;
  return <ZoomField {...rest} value={zoom} onChange={setZoom} min={min} max={max} presets={presets} actions={actions} />;
};

export { ZoomFieldDemo };
