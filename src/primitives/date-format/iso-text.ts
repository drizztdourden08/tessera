/* @layer renderer-components @kind util */
import type { DateContext } from './date-format.type';

const two = (value: number): string => String(value).padStart(2, '0');

const offsetText = (at: Date): string => {
  const minutes = -at.getTimezoneOffset();
  const sign = minutes < 0 ? '-' : '+';
  const whole = Math.abs(minutes);
  return `${sign}${two(Math.trunc(whole / 60))}:${two(whole % 60)}`;
};

const isoText = ({ at, length }: DateContext): string => {
  const day = `${String(at.getFullYear()).padStart(4, '0')}-${two(at.getMonth() + 1)}-${two(at.getDate())}`;
  if (length === 'short') return day;
  const time = `${two(at.getHours())}:${two(at.getMinutes())}`;
  if (length === 'medium') return `${day} ${time}`;
  return `${day}T${time}:${two(at.getSeconds())}${offsetText(at)}`;
};

export { isoText };
