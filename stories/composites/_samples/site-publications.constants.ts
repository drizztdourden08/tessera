/* @layer stories @kind data */
import { buildSchema } from '../../../src/data';
import type { PublicationRow } from './site-story.type';

const PUBLICATIONS: readonly PublicationRow[] = [
  { id: 'dark-world', name: 'Dark World Remix', kind: 'Music pack', version: '1.2.0', installs: 340, state: 'Published' },
  { id: 'pink-link', name: 'Pink Hair Link', kind: 'Character', version: '0.9.1', installs: 61, state: 'Published' },
  { id: 'lost-woods', name: 'Lost Woods Lofi', kind: 'Music pack', version: '0.3.0', installs: 0, state: 'In review' },
];

const PUBLICATION_SCHEMA = buildSchema(PUBLICATIONS, {
  order: ['name', 'kind', 'version', 'installs', 'state'],
  labels: { name: 'Name', kind: 'Kind', version: 'Version', installs: 'Installs', state: 'State' },
  kinds: { version: 'string' },
  hidden: ['id'],
});

export { PUBLICATION_SCHEMA, PUBLICATIONS };
