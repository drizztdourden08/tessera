/* @layer stories @kind component */
import { useState } from 'react';
import { DropdownMenu } from '../../../src/composites';
import type { MenuGroup } from '../../../src/composites';
import { ValueReadout } from '../../_template/ValueReadout';

const percent = (value: number): string => `${value}%`;

const MenuSliderDemo = () => {
  const [music, setMusic] = useState(70);
  const [effects, setEffects] = useState(40);
  const [subtitles, setSubtitles] = useState(true);
  const groups: MenuGroup[] = [{
    id: 'sound',
    label: 'Sound',
    items: [
      { id: 'music', label: 'Music', icon: 'music', kind: 'slider', value: music, step: 5, formatValue: percent, onChange: setMusic },
      { id: 'effects', label: 'Effects', icon: 'volume-2', kind: 'slider', value: effects, step: 5, formatValue: percent, onChange: setEffects },
      { id: 'subtitles', label: 'Subtitles', checked: subtitles, onSelect: () => setSubtitles((now) => !now) },
    ],
  }];
  return (
    <ValueReadout value={`music ${music}, effects ${effects}`}>
      <DropdownMenu trigger={{ label: 'Sound', icon: 'volume-2' }} groups={groups} />
    </ValueReadout>
  );
};

export { MenuSliderDemo };
