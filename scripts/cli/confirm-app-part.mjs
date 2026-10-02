/* @layer tooling-scripts @kind logic */
import { APP_PART_WARNING } from './new.constants.mjs';

const confirmAppPart = async (io, { yes, kind, name, folder }) => {
  io.warn(`tessera: ${APP_PART_WARNING}`);
  if (yes) return true;
  if (!io.interactive) {
    io.warn('tessera: nothing written. Run it again with --yes to create it in this app anyway.');
    return false;
  }
  const reply = (await io.ask(`Create the app ${kind} ${name} in ${folder} anyway? (y/N) `)).trim().toLowerCase();
  return reply === 'y' || reply === 'yes';
};

export { confirmAppPart };
