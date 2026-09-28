/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { DataTable } from '../../../src/composites';
import { ViewStorageProvider, buildSchema } from '../../../src/data';
import type { ViewKey, ViewSnapshot, ViewStorage } from '../../../src/data';
import { Box, Button, CodeBlock, Text } from '../../../src/primitives';
import { LOCATIONS, LOCATION_CONFIG } from './data-locations';
import type { LocationRow } from './data-locations';

const SCHEMA = buildSchema(LOCATIONS, LOCATION_CONFIG);
const VIEW_KEY: ViewKey = 'data-engine:locations';
const COUNT: readonly [string, string] = ['location', 'locations'];

const saved = new Map<ViewKey, ViewSnapshot>();

const locationId = (row: LocationRow): string => row.id;

const StorageDemo = () => {
  const [events, setEvents] = useState<string[]>([]);
  const [lastSaved, setLastSaved] = useState<ViewSnapshot | undefined>(saved.get(VIEW_KEY));
  const [mount, setMount] = useState(0);

  const storage = useMemo<ViewStorage>(() => ({
    load: (key) => {
      const found = saved.get(key);
      setEvents((prev) => [...prev, `load ${key}: ${found ? 'restored a snapshot' : 'nothing saved yet'}`].slice(-6));
      return Promise.resolve(found);
    },
    save: (key, snapshot) => {
      saved.set(key, snapshot);
      setLastSaved(snapshot);
      setEvents((prev) => [...prev, `save ${key}: ${snapshot.columns.length} columns, ${snapshot.sort.length} sort levels`].slice(-6));
    },
  }), []);

  return (
    <ViewStorageProvider value={storage}>
      <Box className="story-column">
        <Box className="story-row">
          <Button size="sm" variant="secondary" onClick={() => setMount((n) => n + 1)}>Remount the table</Button>
          <Text className="story-label">Sort, group or resize a column, then remount: the layout comes back.</Text>
        </Box>
        <Box className="engine-table">
          <DataTable key={mount} rows={LOCATIONS} schema={SCHEMA} getRowId={locationId} viewKey={VIEW_KEY} countLabel={COUNT} />
        </Box>
        <Text className="story-label">Storage calls</Text>
        {events.map((line, i) => <Text key={`${i}-${line}`} className="engine-grid__mono">{line}</Text>)}
        <Text className="story-label">Last saved snapshot</Text>
        <CodeBlock language="json" code={lastSaved ? JSON.stringify(lastSaved, null, 2) : '{}'} />
      </Box>
    </ViewStorageProvider>
  );
};

export { StorageDemo };
