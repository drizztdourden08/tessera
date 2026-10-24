/* @layer tooling-scripts @kind data */
const COMMANDS = {
  new: () => import('./new-command.mjs'),
  check: () => import('./check-command.mjs'),
  guide: () => import('./guide-command.mjs'),
};

const THREAD_VERBS = ['worktree', 'launch', 'pr', 'mobile', 'linux', 'release', 'upgrade'];

const MISSING_THREAD = 'tessera: worktree, launch, pr, mobile, linux, release and upgrade are the thread commands. They run in the Tessera repo, where @drizztdourden08/brock-thread is installed. Run pnpm install there, then pnpm tessera <command>.';

const USAGE = `tessera <command>

Commands:
  new <kind> <Name>   create a component: kind is primitive, composite, compound or view
                      (tessera new --help lists its options)
  check               check the usage file of every part of the app
  guide               check them, then write the usage guide of the app

Thread commands (the Tessera repo only, run as pnpm tessera <command>):
  launch <wt|main> none --target storylite
                      start the Storylite catalogue (main is on port 4400,
                      a worktree prints its own URL)
  worktree            create, launch, refresh, commit, finish or remove a worktree
  pr, mobile, linux, release, upgrade
                      the other Brock thread verbs (each takes no arguments to show its usage)

Options:
  -h, --help          this text
  -v, --version       the Tessera version
`;

export { COMMANDS, MISSING_THREAD, THREAD_VERBS, USAGE };
