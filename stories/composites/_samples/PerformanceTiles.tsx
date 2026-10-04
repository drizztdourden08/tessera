/* @layer stories @kind component */
import { useMemo } from 'react';
import { StatTile } from '../../../src/composites';
import { Sparkline } from '../../../src/primitives';
import { FEED_HISTORY } from './performance-feed.constants';
import type { PerformanceFrame } from './performance-feed.type';
import { FPS_MAX, LOW_FPS_BAND, SLOW_FRAME_BAND } from './performance-panel.constants';
import { seriesChange } from './series-change';

const PerformanceTiles = (props: { frame: PerformanceFrame }) => {
  const { fps, download, upload } = props.frame;
  const frameTimes = useMemo(() => fps.map((rate) => Math.round(10000 / rate) / 10), [fps]);
  const fpsNow = fps.at(-1) ?? 0;
  const fpsChange = seriesChange(fps, 1, 0);
  const timeChange = seriesChange(frameTimes, 0.1, 1);
  const downChange = seriesChange(download, 0.5, 1);
  const upChange = seriesChange(upload, 0.2, 1);
  return (
    <>
      <StatTile
        label="Frame rate" value={Math.round(fpsNow)} unit="fps" tone={fpsNow < 60 ? 'danger' : undefined}
        delta={fpsChange.text} trend={fpsChange.trend}
        chart={<Sparkline values={fps} length={FEED_HISTORY} min={0} max={FPS_MAX} band={LOW_FPS_BAND} tone="success" dot />}
      />
      <StatTile
        label="Frame time" value={(frameTimes.at(-1) ?? 0).toFixed(1)} unit="ms" delta={timeChange.text} trend={timeChange.trend} upIs="bad"
        chart={<Sparkline values={frameTimes} length={FEED_HISTORY} min={0} band={SLOW_FRAME_BAND} tone="violet" dot />}
      />
      <StatTile
        label="Download" value={(download.at(-1) ?? 0).toFixed(1)} unit="Mb/s" delta={downChange.text} trend={downChange.trend} upIs="neutral"
        chart={<Sparkline values={download} length={FEED_HISTORY} min={0} variant="area" tone="blue" />}
      />
      <StatTile
        label="Upload" value={(upload.at(-1) ?? 0).toFixed(1)} unit="Mb/s" delta={upChange.text} trend={upChange.trend} upIs="neutral"
        chart={<Sparkline values={upload} length={FEED_HISTORY} min={0} variant="area" tone="teal" />}
      />
    </>
  );
};

export { PerformanceTiles };
