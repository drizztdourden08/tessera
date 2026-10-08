/* @layer stories @kind component */
import { RecordEditor } from '../../../src/composites';
import type { IdRefOption } from '../../../src/composites';
import { buildSchema } from '../../../src/data';
import type { FieldDescriptor, SchemaConfig } from '../../../src/data';

type Region = 'coast' | 'marsh';

interface Stop {
  region: Region;
  place: string;
}

const PLACES: Readonly<Record<Region, readonly IdRefOption[]>> = {
  coast: [{ value: 'place-1', label: 'Harbor' }, { value: 'place-2', label: 'Lighthouse' }],
  marsh: [{ value: 'place-3', label: 'Ferry landing' }, { value: 'place-4', label: 'Old mill' }],
};

const STOP: Stop = { region: 'coast', place: 'place-1' };

const CONFIG: SchemaConfig = {
  options: { region: [{ value: 'coast', label: 'Coast' }, { value: 'marsh', label: 'Marsh' }] },
  groups: [{ id: 'stop', label: 'Stop', paths: ['region', 'place'] }],
};

const SCHEMA = buildSchema([STOP], CONFIG);

const regionOf = (record: unknown): Region => ((record as Partial<Stop> | undefined)?.region === 'marsh' ? 'marsh' : 'coast');

const placesFor = (targetKind: string, field: FieldDescriptor, record?: unknown): readonly IdRefOption[] =>
  (targetKind === 'place' && field.path === 'place' ? PLACES[regionOf(record)] : []);

const saveNothing = () => Promise.resolve();

const NarrowedReference = () => (
  <RecordEditor record={STOP} schema={SCHEMA} config={CONFIG} onSave={saveNothing} resolveIdRefOptions={placesFor} />
);

export { NarrowedReference };
