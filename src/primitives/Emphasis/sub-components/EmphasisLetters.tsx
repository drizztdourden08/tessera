/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { letterDelay } from '../behavior/letter-delay';
import { letterRanks } from '../behavior/letter-ranks';
import { splitGraphemes } from '../behavior/split-graphemes';
import type { EmphasisLettersProps } from './EmphasisLetters.type';

const EmphasisLetters = ({ text, stagger, anchor, order, seed }: EmphasisLettersProps) => {
  const letters = splitGraphemes(text);
  const ranks = letterRanks({ letters, anchor, order, seed });
  return (
    <>
      <Box as="span" className="emphasis__sr">{text}</Box>
      <Box as="span" className="emphasis__text" aria-hidden>
        {letters.map((letter, index) => (
          <Box as="span" key={`${index}-${letter}`} className="emphasis__letter" style={letterDelay(ranks[index] ?? index, stagger)}>
            {letter}
          </Box>
        ))}
      </Box>
    </>
  );
};

export { EmphasisLetters };
