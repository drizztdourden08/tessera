/* @layer renderer-components @kind logic */
const bufferedEnd = (video: HTMLVideoElement): number => {
  const { buffered, currentTime } = video;
  for (let index = 0; index < buffered.length; index += 1) {
    if (buffered.start(index) <= currentTime && currentTime <= buffered.end(index)) return buffered.end(index);
  }
  return 0;
};

export { bufferedEnd };
