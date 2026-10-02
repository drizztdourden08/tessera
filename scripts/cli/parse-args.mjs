/* @layer tooling-scripts @kind logic */
const SWITCHES = ['yes', 'dry-run', 'help'];
const VALUES = ['group', 'tree', 'icon'];
const SHORT = { '-h': 'help', '-y': 'yes' };

const readOption = (argv, index, parsed) => {
  const [key, inline] = argv[index].replace(/^--/, '').split(/=(.*)/s);
  if (SWITCHES.includes(key)) {
    parsed.flags[key] = true;
    return index;
  }
  if (!VALUES.includes(key)) {
    parsed.problems.push(`there is no option --${key}`);
    return index;
  }
  const value = inline ?? argv[index + 1];
  if (value === undefined || value.startsWith('-')) parsed.problems.push(`--${key} takes a value`);
  else parsed.flags[key] = value;
  return inline === undefined ? index + 1 : index;
};

const parseArgs = (argv) => {
  const parsed = { positionals: [], flags: {}, problems: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (Object.hasOwn(SHORT, arg)) parsed.flags[SHORT[arg]] = true;
    else if (arg.startsWith('--')) index = readOption(argv, index, parsed);
    else parsed.positionals.push(arg);
  }
  return parsed;
};

export { parseArgs };
