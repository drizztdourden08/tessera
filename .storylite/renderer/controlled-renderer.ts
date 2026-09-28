/* @layer root-config @kind config */
import { defineRenderer } from '@storylite/storylite';

const controlledReact = () => defineRenderer({
  name: 'react',
  client: './.storylite/renderer/controlled-client.ts',
  static: '@storylite/renderer-react/static',
});

export { controlledReact };
