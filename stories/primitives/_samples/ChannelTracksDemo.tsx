/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Slider } from '../../../src/primitives';
import { CHANNEL_TRACKS } from './channel-tracks.constants';

const ChannelTracksDemo = () => {
  const [values, setValues] = useState<Readonly<Record<string, number>>>({ Red: 120, Hue: 200 });
  return (
    <Box className="story-column">
      {Object.entries(CHANNEL_TRACKS).map(([name, gradient]) => (
        <Slider
          key={name}
          label={name}
          min={0}
          max={name === 'Hue' ? 360 : 255}
          value={values[name]}
          onChange={(next) => setValues({ ...values, [name]: next })}
          trackBackground={gradient}
        />
      ))}
    </Box>
  );
};

export { ChannelTracksDemo };
