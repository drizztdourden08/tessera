/* @layer tooling-scripts @kind logic */
const PAIRS = { '[': ']', '{': '}' };

const skipString = (text, start) => {
  const quote = text[start];
  let index = start + 1;
  while (index < text.length && text[index] !== quote) index += text[index] === '\\' ? 2 : 1;
  return index;
};

const closingBracket = (text, open) => {
  const stack = [];
  for (let index = open; index < text.length; index += 1) {
    const char = text[index];
    if (char === '\'' || char === '"' || char === '`') index = skipString(text, index);
    else if (Object.hasOwn(PAIRS, char)) stack.push(PAIRS[char]);
    else if (char === stack.at(-1)) {
      stack.pop();
      if (stack.length === 0) return index;
    }
  }
  return -1;
};

export { closingBracket };
