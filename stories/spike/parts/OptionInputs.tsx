/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Button, Checkbox, Combobox, Flex, Icon, IconButton, NumberStepper, ScrollArea, SearchInput, SegmentedControl, Stack, Status, Tabs, Tag, Text, TextInput, Textarea, Toggle } from '../../../src/primitives';

const noop = () => {};

type FormRowProps = { label: string; description?: string; changed?: boolean; advanced?: boolean; problem?: string; children: ReactNode };
const FormRow = ({ label, description, changed, advanced, problem, children }: FormRowProps) => (
  <Box className="spike-formrow" data-problem={problem ? '' : undefined}>
    <Stack gap="xs">
      <Flex gap="sm" align="center">
        <Text variant="body" className="spike-strong">{label}</Text>
        {advanced && <Tag>advanced</Tag>}
        {changed && <Status tone="warning" dot>changed</Status>}
      </Flex>
      {description && <Text variant="caption">{description}</Text>}
    </Stack>
    <Stack gap="xs">
      {children}
      {problem && <Text variant="caption" className="spike-problem">{problem}</Text>}
    </Stack>
    <IconButton size="sm" variant="ghost" label={`Reset ${label}`} disabled={!changed}><Icon name="rotate-ccw" /></IconButton>
  </Box>
);

type KeyValueEditorProps = { value: Record<string, number>; keys?: readonly string[]; duplicate?: string };
const KeyValueEditor = ({ value, keys = [], duplicate }: KeyValueEditorProps) => (
  <Stack gap="xs">
    {Object.entries(value).map(([k, n]) => (
      <Flex key={k} gap="xs" align="center" className="spike-kv" data-dup={k === duplicate ? '' : undefined}>
        <TextInput value={k} readOnly aria-label="Item" invalid={k === duplicate} />
        <NumberStepper value={n} min={0} max={99} onChange={noop} ariaLabel={`Count of ${k}`} />
        <IconButton size="sm" variant="ghost" tone="danger" label={`Remove ${k}`}><Icon name="trash-2" /></IconButton>
      </Flex>
    ))}
    {duplicate && <Text variant="caption" className="spike-problem">{`${duplicate} is listed twice`}</Text>}
    <Flex gap="xs" align="center" className="spike-kv">
      <Combobox items={keys} placeholder="Add an item: type to search 312 items" />
      <Button size="sm" variant="secondary" icon={<Icon name="plus" />}>Add</Button>
    </Flex>
  </Stack>
);

const JsonInput = ({ text, error }: { text: string; error?: string }) => (
  <Stack gap="xs">
    <Textarea className="spike-json" value={text} readOnly rows={text.split('\n').length} invalid={Boolean(error)} spellCheck={false} />
    <Flex justify="between" align="center">
      {error ? <Text variant="caption" className="spike-problem">{error}</Text> : <Text variant="caption">Valid JSON object, 2 keys</Text>}
      <Button size="sm" variant="ghost" icon={<Icon name="braces" />} disabled={Boolean(error)}>Format</Button>
    </Flex>
  </Stack>
);

const NamedRange = ({ names, value, custom }: { names: readonly { label: string; value: number }[]; value: string; custom?: number }) => (
  <Stack gap="xs">
    <SegmentedControl value={value} onChange={noop} options={[...names.map((n) => ({ value: String(n.value), label: `${n.label} (${n.value})` })), { value: 'custom', label: 'Custom' }]} />
    {value === 'custom' && <Flex gap="sm" align="center"><NumberStepper value={custom ?? 0} min={0} max={99} onChange={noop} ariaLabel="Custom value" /><Text variant="caption">0 to 99</Text></Flex>}
  </Stack>
);

const SetPicker = ({ options, selected, query }: { options: readonly string[]; selected: readonly string[]; query: string }) => (
  <Stack gap="xs">
    <Flex gap="xs" wrap>{selected.map((s) => <Tag key={s} onRemove={noop}>{s}</Tag>)}</Flex>
    <SearchInput value={query} onChange={noop} placeholder="Search 312 items" />
    <ScrollArea className="spike-set" scrollbar="slim">
      <Stack gap="xs">
        {options.filter((o) => o.toLowerCase().includes(query.toLowerCase())).map((o) => <Checkbox key={o} checked={selected.includes(o)} onChange={noop} label={o} />)}
      </Stack>
    </ScrollArea>
  </Stack>
);

type GroupTab = { id: string; label: string; count: number; changed?: number };
const FormGroupTabs = ({ tabs, active, advanced }: { tabs: readonly GroupTab[]; active: string; advanced: number }) => (
  <Stack gap="sm">
    <Flex gap="sm" align="center">
      <Box className="spike-grow"><SearchInput value="" onChange={noop} placeholder="Search options" /></Box>
      <Toggle checked={false} onChange={noop} label={`Show advanced (${advanced})`} />
    </Flex>
    <Tabs activeTab={active} onTabChange={noop} tabs={tabs.map((t) => ({ id: t.id, label: t.changed ? `${t.label} · ${t.changed} changed` : t.label, badge: t.count }))} />
  </Stack>
);

export { FormGroupTabs, FormRow, JsonInput, KeyValueEditor, NamedRange, SetPicker };
