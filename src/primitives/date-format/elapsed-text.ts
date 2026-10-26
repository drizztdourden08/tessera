/* @layer renderer-components @kind util */
import type { DateContext } from './date-format.type';

const pad = (value: number): string => String(value).padStart(2, '0');

const elapsedText = ({ at, now, strings, label }: DateContext): string => {
  const { second, minute, hour, day } = strings.elapsedUnits;
  const total = Math.max(0, Math.trunc((now - at.getTime()) / 1000));
  const days = Math.trunc(total / 86_400);
  const hours = Math.trunc((total % 86_400) / 3600);
  const minutes = Math.trunc((total % 3600) / 60);
  const seconds = total % 60;
  let time = `${seconds}${second}`;
  if (days > 0) time = `${days}${day} ${hours}${hour}`;
  else if (hours > 0) time = `${hours}${hour} ${pad(minutes)}${minute}`;
  else if (minutes > 0) time = `${minutes}${minute} ${pad(seconds)}${second}`;
  return label ? strings.elapsedLabel(label, time) : time;
};

export { elapsedText };
