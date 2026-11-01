/* @layer root-config @kind config */
import { defineStandardsVitest } from '@drizztdourden08/standards/vitest';

export default defineStandardsVitest({
  test: {
    include: ['tests/**/*.test.mjs'],
  },
});
