/* @layer tooling-scripts @kind logic */
const TRIES = 3;

const askChoice = async (io, { question, options, emptyMeans, tries = TRIES }) => {
  io.log(question);
  options.forEach((option, index) => io.log(`  ${index + 1}. ${option}`));
  const reply = (await io.ask(emptyMeans ? `Number, or Enter for ${emptyMeans}: ` : 'Number: ')).trim();
  if (reply === '' && emptyMeans) return undefined;
  const picked = /^\d+$/.test(reply) ? options[Number(reply) - 1] : undefined;
  if (picked !== undefined) return picked;
  if (tries <= 1) throw new Error(`no answer picked for "${question}"`);
  io.log(`Type a number from 1 to ${options.length}.`);
  return askChoice(io, { question, options, emptyMeans, tries: tries - 1 });
};

export { askChoice };
