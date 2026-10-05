/* @layer renderer-components @kind logic */
const pad = (value: number) => String(value).padStart(2, '0');

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const whole = Math.floor(seconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const rest = pad(whole % 60);
  return hours > 0 ? `${hours}:${pad(minutes)}:${rest}` : `${minutes}:${rest}`;
};

export { formatTime };
