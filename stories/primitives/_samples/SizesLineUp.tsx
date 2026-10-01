/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Button, Combobox, NumberInput, Select, Stepper, TextInput } from '../../../src/primitives';
import type { ControlSize } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { CONTROL_SIZES } from '../../_template/control-sizes.constants';
import { Demonstrator } from '../../_template/Demonstrator';
import { REGIONS } from './picker-data';
import './SizesLineUp.css';

const LineUpRow = (props: { size: ControlSize }) => {
  const { size } = props;
  const [region, setRegion] = useState<string | null>(REGIONS[0] ?? null);
  const [game, setGame] = useState<string | null>(null);
  const [cost, setCost] = useState(25);
  const [players, setPlayers] = useState(4);
  return (
    <Box className="sizes-line-up">
      <TextInput size={size} defaultValue="Link" aria-label={`Player name, ${size}`} />
      <Select size={size} items={REGIONS} value={region} onChange={setRegion} aria-label={`Region, ${size}`} />
      <NumberInput size={size} value={cost} min={0} max={100} step={5} sizeToContent onChange={setCost} aria-label={`Hint cost, ${size}`} />
      <Stepper size={size} value={players} min={1} max={20} onChange={setPlayers} ariaLabel={`Players, ${size}`} />
      <Combobox size={size} items={REGIONS} value={game} onChange={setGame} placeholder="Type a region" aria-label={`Start, ${size}`} />
      <Button size={size}>Start</Button>
    </Box>
  );
};

const SizesLineUp = () => (
  <Demonstrator rows={axis(CONTROL_SIZES)} align="stretch" cell={(size) => <LineUpRow size={size} />} />
);

export { SizesLineUp };
