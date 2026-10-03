/* @layer stories @kind component */
import { useState } from 'react';
import { ListItemRow, WindowHeader } from '../../../src/composites';
import { Badge, Box, Button, ButtonRow, Checkbox, Field, Icon, SearchInput, Select, StatRow, Text, Toggle } from '../../../src/primitives';
import { FILE_FACTS, FILE_STATUSES, NOTICES, RECENT_SEARCHES, SORT_OPTIONS } from './drawer-data';
import type { SampleNotice } from './drawer-data';

type CloseProps = { close: () => void };

const ItemDetailsBody = ({ close }: CloseProps) => (
  <>
    <WindowHeader title="Details" subtitle="Budget 2026.xlsx" onClose={close} />
    <Box className="drawer-story__panel">
      {FILE_FACTS.map(([label, value]) => <StatRow key={label} label={label} value={value} />)}
      <ButtonRow>
        <Button variant="primary" onClick={close}>Open</Button>
        <Button variant="secondary">Download</Button>
      </ButtonRow>
    </Box>
  </>
);

const FilterPanelBody = ({ close }: CloseProps) => {
  const [statuses, setStatuses] = useState<readonly string[]>(['open', 'review']);
  const [sort, setSort] = useState('newest');
  const [mine, setMine] = useState(false);
  const toggleStatus = (id: string, on: boolean) => setStatuses(on ? [...statuses, id] : statuses.filter((s) => s !== id));
  return (
    <>
      <WindowHeader title="Filters" subtitle={`${statuses.length} of ${FILE_STATUSES.length} statuses`} onClose={close} />
      <Box className="drawer-story__panel">
        <Text className="story-label">Status</Text>
        {FILE_STATUSES.map(([id, label]) => (
          <Checkbox key={id} label={label} checked={statuses.includes(id)} onChange={(on) => toggleStatus(id, on)} />
        ))}
        <Field label="Sort by"><Select value={sort} onChange={setSort} options={SORT_OPTIONS} /></Field>
        <Toggle checked={mine} onChange={setMine} label="Only items assigned to me" />
        <ButtonRow>
          <Button variant="tertiary" onClick={() => setStatuses([])}>Clear</Button>
          <Button variant="primary" onClick={close}>Show results</Button>
        </ButtonRow>
      </Box>
    </>
  );
};

const NotificationsBody = ({ close }: CloseProps) => {
  const [notices, setNotices] = useState<readonly SampleNotice[]>(NOTICES);
  const unread = notices.filter((notice) => notice.unread).length;
  return (
    <>
      <WindowHeader title="Notifications" subtitle={unread > 0 ? `${unread} unread` : 'All read'} onClose={close} />
      <Box className="drawer-story__panel" role="list">
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
        <Button variant="tertiary" disabled={unread === 0} onClick={() => setNotices(notices.map((n) => ({ ...n, unread: false })))}>
          Mark all as read
        </Button>
      </Box>
    </>
  );
};

const SearchSheetBody = () => {
  const [query, setQuery] = useState('');
  return (
    <Box className="drawer-story__panel">
      <SearchInput autoFocus aria-label="Search files" placeholder="Search files" value={query} onChange={setQuery} />
      <Text className="story-label">Recent searches</Text>
      {RECENT_SEARCHES.map((recent) => (
        <Button key={recent} variant="ghost" onClick={() => setQuery(recent)}>{recent}</Button>
      ))}
    </Box>
  );
};

export { FilterPanelBody, ItemDetailsBody, NotificationsBody, SearchSheetBody };
