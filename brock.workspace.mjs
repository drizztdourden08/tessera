/* @layer root-config @kind config */
import { defineWorkspace } from '@drizztdourden08/brock-thread';
import { storyliteTarget } from './scripts/thread/storylite-target.mjs';

export default defineWorkspace({
  name: 'tessera',
  base: 'main',
  targets: {
    storylite: storyliteTarget(),
  },
});
