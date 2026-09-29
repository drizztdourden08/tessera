/* @layer renderer-components @kind logic */
const isLastSource = (video: HTMLVideoElement, target: EventTarget | null): boolean => {
  if (target === video) return false;
  const sources = video.querySelectorAll('source');
  return sources.length > 0 && sources[sources.length - 1] === target;
};

export { isLastSource };
