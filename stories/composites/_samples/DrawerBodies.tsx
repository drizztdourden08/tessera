/* @layer stories @kind component */
import { useState } from 'react';
import { Drawer, ListItemRow } from '../../../src/composites';
import { Badge, Box, Button, Checkbox, Field, Icon, SearchInput, Select, StatRow, Text, Toggle } from '../../../src/primitives';
import { FILE_FACTS, FILE_STATUSES, NOTICES, RECENT_SEARCHES, SORT_OPTIONS } from './drawer-data';
import type { SampleNotice } from './drawer-data';

type SampleDrawerProps = {
  open: boolean;
  close: () => void;
  side: 'left' | 'right' | 'top';
  label?: string;
};

const ItemDetailsDrawer = (props: SampleDrawerProps) => {
  const { close, ...drawer } = props;
  return (
    <Drawer
      {...drawer}
      onClose={close}
      title="Details"
      subtitle="Budget 2026.xlsx"
      actions={(
        <>
          <Button variant="secondary">Download</Button>
          <Button variant="primary" onClick={close}>Open</Button>
        </>
      )}
    >
      {FILE_FACTS.map(([label, value]) => <StatRow key={label} label={label} value={value} />)}
    </Drawer>
  );
};

const FilterPanelDrawer = (props: SampleDrawerProps) => {
  const { close, ...drawer } = props;
  const [statuses, setStatuses] = useState<readonly string[]>(['open', 'review']);
  const [sort, setSort] = useState('newest');
  const [mine, setMine] = useState(false);
  const toggleStatus = (id: string, on: boolean) => setStatuses(on ? [...statuses, id] : statuses.filter((s) => s !== id));
  return (
    <Drawer
      {...drawer}
      onClose={close}
      title="Filters"
      subtitle={`${statuses.length} of ${FILE_STATUSES.length} statuses`}
      actions={(
        <>
          <Button variant="tertiary" onClick={() => setStatuses([])}>Clear</Button>
          <Button variant="primary" onClick={close}>Show results</Button>
        </>
      )}
    >
      <Text className="story-label">Status</Text>
      {FILE_STATUSES.map(([id, label]) => (
        <Checkbox key={id} label={label} checked={statuses.includes(id)} onChange={(on) => toggleStatus(id, on)} />
      ))}
      <Field label="Sort by"><Select value={sort} onChange={setSort} options={SORT_OPTIONS} /></Field>
      <Toggle checked={mine} onChange={setMine} label="Only items assigned to me" />
    </Drawer>
  );
};

const NotificationsDrawer = (props: SampleDrawerProps) => {
  const { close, ...drawer } = props;
  const [notices, setNotices] = useState<readonly SampleNotice[]>(NOTICES);
  const unread = notices.filter((notice) => notice.unread).length;
  return (
    <Drawer
      {...drawer}
      onClose={close}
      title="Notifications"
      subtitle={unread > 0 ? `${unread} unread` : 'All read'}
      actions={(
        <Button variant="tertiary" disabled={unread === 0} onClick={() => setNotices(notices.map((n) => ({ ...n, unread: false })))}>
          Mark all as read
        </Button>
      )}
    >
      <Box role="list" className="drawer-story__list">
        {notices.map((notice) => (
          <ListItemRow
            key={notice.id}
            role="listitem"
            icon={<Icon name={notice.icon} size={16} />}
            name={notice.text}
            meta={notice.when}
            aside={notice.unread ? <Badge variant="dot" color="primary" label="Unread" /> : undefined}
          />
        ))}
      </Box>
    </Drawer>
  );
};

const SearchSheetDrawer = (props: SampleDrawerProps) => {
  const { close, ...drawer } = props;
  const [query, setQuery] = useState('');
  return (
    <Drawer {...drawer} onClose={close} title="Search">
      <SearchInput autoFocus aria-label="Search files" placeholder="Search files" value={query} onChange={setQuery} />
      <Text className="story-label">Recent searches</Text>
      {RECENT_SEARCHES.map((recent) => (
        <Button key={recent} variant="ghost" onClick={() => setQuery(recent)}>{recent}</Button>
      ))}
    </Drawer>
  );
};

export { FilterPanelDrawer, ItemDetailsDrawer, NotificationsDrawer, SearchSheetDrawer };
export type { SampleDrawerProps };
