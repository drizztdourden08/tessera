/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { emphasisVars } from './behavior/emphasis-vars';
import { emphasisClass } from './behavior/emphasis-class';
import { resolveEmphasis } from './behavior/resolve-emphasis';
import { EmphasisLetters } from './sub-components/EmphasisLetters';
import type { EmphasisProps } from './Emphasis.type';
import './Emphasis.css';

const Emphasis = (props: EmphasisProps) => {
  const { children, active = false, pulseKey, seed } = props;
  const resolved = resolveEmphasis(props);
  const lettered = resolved.stagger > 0 && typeof children === 'string';

  return (
    <Box as="span" className={emphasisClass(resolved, active)} style={emphasisVars(resolved)}>
      {resolved.stable && <Box as="span" className="emphasis__ghost" aria-hidden>{children}</Box>}
      <Box as="span" key={pulseKey} className="emphasis__layer">
        {lettered
          ? <EmphasisLetters text={children} stagger={resolved.stagger} anchor={resolved.anchor} order={resolved.order} seed={seed} />
          : <Box as="span" className="emphasis__text">{children}</Box>}
      </Box>
    </Box>
  );
};

export { Emphasis };
