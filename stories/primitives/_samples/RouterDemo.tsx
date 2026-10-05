/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Flex, Link, Text } from '../../../src/primitives';
import { START_PATH } from './router-demo.constants';
import type { RouterDemoProps } from './RouterDemo.type';

const RouterDemo = (props: RouterDemoProps) => {
  const { routes, tone } = props;
  const [path, setPath] = useState(START_PATH);
  return (
    <Box className="story-column">
      <Flex as="nav" gap="lg" wrap aria-label="App">
        {routes.map((route) => (
          <Link key={route.to} href={route.to} tone={tone} navigate={setPath} aria-current={path === route.to ? 'page' : undefined}>
            {route.label}
          </Link>
        ))}
      </Flex>
      <Text className="story-label">The app router is at {path}. The page did not reload.</Text>
    </Box>
  );
};

export { RouterDemo };
