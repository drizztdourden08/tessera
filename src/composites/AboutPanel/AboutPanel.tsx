/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Image } from '../../primitives/Image';
import { StatRow } from '../../primitives/StatRow';
import { Text } from '../../primitives/Text';
import { Paragraph } from '../../primitives/text-elements';
import { AboutCopyButton } from './sub-components/AboutCopyButton';
import { DEFAULT_COPY_LABEL } from './AboutPanel.constants';
import type { AboutPanelProps } from './AboutPanel.type';
import './AboutPanel.css';

const AboutPanel = (props: AboutPanelProps) => {
  const { title, logo, rows, copyText, copyLabel = DEFAULT_COPY_LABEL, onCopy, legal, className = '' } = props;

  return (
    <Box className={`about-panel${className ? ` ${className}` : ''}`}>
      <Box className="about-panel__header">
        {logo && <Image className="about-panel__logo" src={logo} alt="" placeholder="none" />}
        <Text as="h2" className="about-panel__title">{title}</Text>
      </Box>
      <Box className="about-panel__rows">
        {rows.map((row) => <StatRow key={row.label} className="about-panel__row" label={row.label} value={row.value} mono />)}
      </Box>
      {copyText !== undefined && <AboutCopyButton text={copyText} label={copyLabel} onCopy={onCopy} />}
      {legal != null && <Paragraph tone="dim" className="about-panel__legal">{legal}</Paragraph>}
    </Box>
  );
};

export { AboutPanel };
