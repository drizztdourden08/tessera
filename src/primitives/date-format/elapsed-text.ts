/* @layer renderer-components @kind util */
import type { DateContext } from './date-format.type';

const pad = (value: number): string => String(value).padStart(2, '0');

const oneUnit = (parts: readonly (readonly [number, string])[], seconds: string): string => {
  const lead = parts.find(([value]) => value > 0);
  return lead ? `${lead[0]}${lead[1]}` : seconds;
};

const elapsedText = ({ at, now, length, strings, label }: DateContext): string => {
  const { second, minute, hour, day } = strings.elapsedUnits;
  const total = Math.max(0, Math.trunc((now - at.getTime()) / 1000));
  const days = Math.trunc(total / 86_400);
  const hours = Math.trunc((total % 86_400) / 3600);
  const minutes = Math.trunc((total % 3600) / 60);
  const seconds = total % 60;
  let time = `${seconds}${second}`;
  if (length === 'short') time = oneUnit([[days, day], [hours, hour], [minutes, minute]], time);
  else if (days > 0) time = `${days}${day} ${hours}${hour}`;
  else if (hours > 0) time = `${hours}${hour} ${pad(minutes)}${minute}`;
  else if (minutes > 0) time = `${minutes}${minute} ${pad(seconds)}${second}`;
  return label ? strings.elapsedLabel(label, time) : time;
};

export { elapsedText };
