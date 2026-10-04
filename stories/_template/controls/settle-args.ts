/* @layer stories @kind logic */
import type { StoryLiteArgs } from '@storylite/storylite';
import { optionsOf } from './options-of';
import type { PlaygroundArgTypes } from './playground.type';

const settleList = (value: unknown, options: readonly unknown[]): unknown =>
  (Array.isArray(value) ? value.filter((item) => options.includes(item)) : value);

const settleOne = (value: unknown, fallback: unknown, options: readonly unknown[]): unknown => {
  if (options.length === 0 || options.includes(value)) return value;
  return options.includes(fallback) ? fallback : options[0];
};

const settleArgs = (argTypes: PlaygroundArgTypes, args: StoryLiteArgs, defaults: StoryLiteArgs): StoryLiteArgs => {
  let settled = args;
  for (const [name, argType] of Object.entries(argTypes)) {
    if (typeof argType?.options !== 'function') continue;
    const options = optionsOf(argType, settled);
    const value = argType.control === 'multiselect'
      ? settleList(settled[name], options)
      : settleOne(settled[name], defaults[name], options);
    if (value !== settled[name]) settled = { ...settled, [name]: value };
  }
  return settled;
};

export { settleArgs };
