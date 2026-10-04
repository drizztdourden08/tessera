/* @layer stories @kind component */
import { useId, useState } from 'react';
import { Box, Field, Flex, INPUT_ICON_FAMILIES, INPUT_ICON_NAMES, InputIcon, Select, Text, isInputIconName } from '../../src/primitives';
import type { InputIconFamily, InputIconSource, SelectOption } from '../../src/primitives';
import { INPUT_ICON_TITLES } from './input-icon-titles.constants';
import type { InputIconPlaygroundProps } from './InputIconPlayground.type';
import '../_template/story-heading.css';
import '../_template/controls/arg-controls.css';
import './icons.stories.css';

const FAMILY_OPTIONS = INPUT_ICON_FAMILIES.map((family) => ({ value: family, label: `${family}, ${INPUT_ICON_TITLES[family]}` }));

const familyOf = (value: string): InputIconFamily | undefined => INPUT_ICON_FAMILIES.find((family) => family === value);

const sourceIn = (family: InputIconFamily, name: string): InputIconSource =>
  ({ family, name: isInputIconName(family, name) ? name : INPUT_ICON_NAMES[family][0] }) as InputIconSource;

const InputIconPlayground = (props: InputIconPlaygroundProps) => {
  const { size, tone, ink, label, effect } = props;
  const id = useId();
  const [source, setSource] = useState<InputIconSource>({ family: 'xbox', name: 'a' });
  const names = INPUT_ICON_NAMES[source.family].map((name) => ({ value: name, label: name }));
  const onFamily = (value: string) => {
    const family = familyOf(value);
    if (family) setSource((current) => sourceIn(family, current.name));
  };
  const onName = (name: string) => setSource((current) => sourceIn(current.family, name));
  const drawOption = (option: SelectOption) => (
    <Flex gap="sm" align="center">
      <InputIcon {...sourceIn(source.family, option.value)} size={20} tone={tone} />
      <Text as="span">{option.label}</Text>
    </Flex>
  );
  return (
    <Box className="story-column input-icon-playground">
      <Box className={`input-icon-playground__stage${ink === 'text' ? '' : ` icon-demo--${ink}`}`}>
        <InputIcon {...source} size={size} tone={tone} label={label || undefined} effect={effect === 'none' ? undefined : effect} />
      </Box>
      <Box className="arg-controls">
        <Text className="story-heading">Input</Text>
        <Box className="arg-controls__grid">
          <Field label={<Text as="span" className="arg-controls__name">family</Text>} htmlFor={`${id}-family`} hint="Every family, from INPUT_ICON_FAMILIES.">
            <Select id={`${id}-family`} value={source.family} options={FAMILY_OPTIONS} onChange={onFamily} size="sm" />
          </Field>
          <Field label={<Text as="span" className="arg-controls__name">name</Text>} htmlFor={`${id}-name`} hint={`The ${names.length} names INPUT_ICON_NAMES.${source.family} accepts.`}>
            <Select id={`${id}-name`} value={source.name} options={names} onChange={onName} size="sm" searchable renderOption={drawOption} />
          </Field>
        </Box>
      </Box>
    </Box>
  );
};

export { InputIconPlayground };
