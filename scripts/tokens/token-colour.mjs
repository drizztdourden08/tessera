/* @layer tooling-scripts @kind logic */
import { parseColour } from './parse-colour.mjs';

const tokenColour = (tokens, name) => {
  const value = tokens.get(name);
  if (value === undefined) throw new Error(`the splash reads ${name}, which the tokens do not set`);
  return parseColour(value);
};

export { tokenColour };
