/* @layer renderer-components @kind data */
const RECORDS_PARAMS = {
  deleteGuardMessage: ['subject'],
  alsoHolds: ['keys'],
  itemPosition: ['position'],
  via: ['field'],
  diffLive: ['source', 'value'],
  itemsMany: ['count'],
  otherValueTitle: ['label'],
  otherValueLabel: ['label'],
} as const;

export { RECORDS_PARAMS };
