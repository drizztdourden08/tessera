/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { EmptyState } from '../../primitives/EmptyState';
import { SettingsSection } from '../SettingsSection';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SettingsGroupListHeading } from './sub-components/SettingsGroupListHeading';
import type { SettingsGroupListProps } from './SettingsGroupList.type';
import '../../theme/search-hit.css';
import './SettingsGroupList.css';

const flashClass = (id: string | undefined, flash: string | undefined): string | undefined =>
  id !== undefined && id === flash ? 'search-hit' : undefined;

const SettingsGroupList = (props: SettingsGroupListProps) => {
  const { panels } = useTesseraStrings();
  const { sections, flash, renderLock, emptyMessage = panels.settingsEmpty, className = '' } = props;
  if (sections.length === 0) return <EmptyState className={className || undefined} message={emptyMessage} />;

  return (
    <Box className={`settings-group-list${className ? ` ${className}` : ''}`}>
      {sections.map((section) => (
        <Box
          key={section.id}
          className={['settings-group-list__section', flashClass(section.id, flash)].filter(Boolean).join(' ')}
          data-section={section.id}
        >
          <SettingsGroupListHeading title={section.title} changedCount={section.changedCount ?? 0} onReset={section.onReset} />
          {section.groups.map((group, index) => (
            <SettingsSection
              key={group.id ?? index}
              inset
              anchor={group.id}
              title={group.title}
              description={group.description}
              rows={group.rows}
              renderLock={renderLock}
              flashKey={flash}
              className={flashClass(group.id, flash)}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export { SettingsGroupList };
