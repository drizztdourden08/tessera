/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { DataTable, FilterBar } from '../../../src/composites';
import { compileTextSearch } from '../../../src/data';
import { Stack } from '../../../src/primitives';
import { PUBLICATION_SCHEMA, PUBLICATIONS } from './site-publications.constants';
import { SITE_TEXT } from './site-samples.constants';
import type { PublicationRow } from './site-story.type';

const rowId = (row: PublicationRow): string => row.id;

const SitePublications = () => {
  const [search, setSearch] = useState('');
  const rows = useMemo(() => {
    const matches = compileTextSearch(search);
    return matches ? PUBLICATIONS.filter((row) => matches(row)) : PUBLICATIONS;
  }, [search]);
  return (
    <Stack gap="sm" align="stretch">
      <FilterBar search={search} onSearchChange={setSearch} searchPlaceholder={SITE_TEXT.filterPlaceholder} searchLabel={SITE_TEXT.filterLabel} />
      <DataTable rows={rows} schema={PUBLICATION_SCHEMA} getRowId={rowId} countLabel={SITE_TEXT.count} />
    </Stack>
  );
};

export { SitePublications };
