/* @layer stories @kind component */
import { useState } from 'react';
import { FormGroupTabs } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { OPTION_GROUPS } from './option-editor-samples.constants';
import type { FormGroupTabsDemoProps } from './option-editor-demos.type';
import './option-editor-story.css';

const FormGroupTabsDemo = ({ tools = true }: FormGroupTabsDemoProps) => {
  const [tab, setTab] = useState('items');
  const [query, setQuery] = useState('');
  const [advanced, setAdvanced] = useState(false);
  return (
    <Box className="option-editor-story option-editor-story--wide">
      <FormGroupTabs
        tabs={OPTION_GROUPS} activeTab={tab} onTabChange={setTab}
        {...(tools ? { query, onQueryChange: setQuery, advanced, onAdvancedChange: setAdvanced, advancedCount: 9 } : {})}
      />
    </Box>
  );
};

export { FormGroupTabsDemo };
