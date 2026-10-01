/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Button } from '../../primitives/Button';
import { SectionHeader } from '../../primitives/SectionHeader';
import { Stack } from '../../primitives/Stack';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ProfilePickerRow } from './sub-components/ProfilePickerRow';
import type { ProfilePickerProps } from './ProfilePicker.type';
import './ProfilePicker.css';

const ProfilePicker = (props: ProfilePickerProps) => {
  const { panels } = useTesseraStrings();
  const { title, profiles, selectedId, onSelect, onDelete, create, onNew, newLabel = panels.newProfile, className = '' } = props;
  const showNew = onNew !== undefined && create == null;

  return (
    <Box className={`profile-picker${className ? ` ${className}` : ''}`}>
      <SectionHeader
        title={title}
        action={showNew ? <Button variant="primary" size="sm" onClick={onNew}>{newLabel}</Button> : undefined}
      />
      {create}
      <Stack gap="sm" role="list" className="profile-picker__list">
        {profiles.map((profile) => (
          <ProfilePickerRow
            key={profile.id}
            profile={profile}
            selected={profile.id === selectedId}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </Stack>
    </Box>
  );
};

export { ProfilePicker };
