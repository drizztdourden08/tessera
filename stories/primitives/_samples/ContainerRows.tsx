/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Card, Flex, SearchInput, Text } from '../../../src/primitives';
import './ContainerRows.css';

const CardContainer = () => {
  const [query, setQuery] = useState('');
  return (
    <Box className="story-column">
      <Box className="container-row container-row--wide">
        <Card container title="Wide card">
          <SearchInput width="narrow-fill" value={query} onChange={setQuery} placeholder="Search presets" />
        </Card>
      </Box>
      <Box className="container-row container-row--tight">
        <Card container title="Tight card">
          <SearchInput width="narrow-fill" value={query} onChange={setQuery} placeholder="Search presets" />
        </Card>
      </Box>
      <Text className="story-label">The card is the container, so the narrow-fill field is 220 px in the wide card and fills the tight one.</Text>
    </Box>
  );
};

const FlexContainer = () => {
  const [query, setQuery] = useState('');
  return (
    <Box className="story-column">
      <Box className="container-row container-row--wide">
        <Flex container>
          <SearchInput width="narrow-fill" value={query} onChange={setQuery} placeholder="Search presets" />
        </Flex>
      </Box>
      <Box className="container-row container-row--tight">
        <Flex container>
          <SearchInput width="narrow-fill" value={query} onChange={setQuery} placeholder="Search presets" />
        </Flex>
      </Box>
      <Text className="story-label">The Flex is the container, so the narrow-fill field follows its own width.</Text>
    </Box>
  );
};

export { CardContainer, FlexContainer };
