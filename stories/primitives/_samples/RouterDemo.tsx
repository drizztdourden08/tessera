/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Flex, RouterLink, Text } from '../../../src/primitives';
import { START_PATH } from './router-demo.constants';
import type { RouterDemoProps } from './RouterDemo.type';

const RouterDemo = (props: RouterDemoProps) => {
  const { routes, tone } = props;
  const [path, setPath] = useState(START_PATH);
  return (
    <Box className="story-column">
      <Flex as="nav" gap="lg" wrap aria-label="App">
        {routes.map((route) => (
          <RouterLink key={route.to} to={route.to} tone={tone} onNavigate={setPath} aria-current={path === route.to ? 'page' : undefined}>
            {route.label}
          </RouterLink>
        ))}
      </Flex>
      <Text className="story-label">The app router is at {path}. The page did not reload.</Text>
    </Box>
  );
};

export { RouterDemo };
