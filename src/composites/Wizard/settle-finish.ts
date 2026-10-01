/* @layer renderer-components @kind util */
import type { CreateOutcome } from '../CreateRecordDialog/CreateRecordDialog.type';

const settleFinish = async <V,>(
  onFinish: (values: V) => Promise<CreateOutcome>,
  values: V,
  fallback: string,
): Promise<CreateOutcome> => {
  try {
    return await onFinish(values);
  } catch (thrown: unknown) {
    const message = thrown instanceof Error && thrown.message !== '' ? thrown.message : fallback;
    return { success: false, error: message };
  }
};

export { settleFinish };
