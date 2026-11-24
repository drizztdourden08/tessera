/* @layer renderer-components @kind logic */
import { DEFAULT_PAYLOAD_TYPE } from '../DropSlot.constants';

const payloadOf = (data: Pick<DataTransfer, 'getData'>, accept?: string): string =>
  data.getData(accept ?? DEFAULT_PAYLOAD_TYPE);

export { payloadOf };
