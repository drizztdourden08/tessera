/* @layer tooling-scripts @kind logic */
const quoteText = (text) => `'${text.replace(/\\/g, '\\\\').replace(/'/g, '\\\'')}'`;

export { quoteText };
