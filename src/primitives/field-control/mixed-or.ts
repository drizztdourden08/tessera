/* @layer renderer-components @kind util */
const mixedOr = <T>(mixed: boolean, value: T): T | 'mixed' => (mixed ? 'mixed' : value);

export { mixedOr };
