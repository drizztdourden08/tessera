/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Text, Video } from '../../../src/primitives';
import { UP_NEXT } from './theater-queue';
import { VIDEO_CLIP, VIDEO_POSTER } from './video-clip';

const TheaterPage = () => {
  const [theater, setTheater] = useState(false);

  return (
    <Box className={`video-theater-page${theater ? ' video-theater-page--theater' : ''}`}>
      <Video
        className="video-theater-page__player"
        src={VIDEO_CLIP}
        poster={VIDEO_POSTER}
        label="Boss fight replay"
        playsInline
        theater={theater}
        onTheaterChange={setTheater}
      />
      <Box className="story-column">
        <Text className="story-label">Up next</Text>
        {UP_NEXT.map((title) => (
          <Text key={title}>{title}</Text>
        ))}
      </Box>
    </Box>
  );
};

export { TheaterPage };
