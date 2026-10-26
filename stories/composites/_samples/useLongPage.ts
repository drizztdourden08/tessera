/* @layer stories @kind hook */
import { useCallback, useRef, useState } from 'react';
import { FIRST_SECTION, SECTION_ATTRIBUTE } from './section-timeline-story.constants';

const READ_LINE = 0.3;

const sectionsOf = (page: HTMLElement): HTMLElement[] => [...page.querySelectorAll<HTMLElement>(`[${SECTION_ATTRIBUTE}]`)];

const useLongPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>(FIRST_SECTION);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const page = ref.current;
    if (!page) return;
    const top = page.getBoundingClientRect().top;
    const line = page.clientHeight * READ_LINE;
    const reached = sectionsOf(page).filter((section) => section.getBoundingClientRect().top - top <= line);
    const current = reached.at(-1)?.id;
    if (current) setActiveId(current);
    const room = page.scrollHeight - page.clientHeight;
    setProgress(room > 0 ? page.scrollTop / room : 0);
  }, []);

  const onJump = useCallback((id: string) => {
    const page = ref.current;
    const section = page ? sectionsOf(page).find((node) => node.id === id) : undefined;
    if (!page || !section) return;
    const offset = section.getBoundingClientRect().top - page.getBoundingClientRect().top + page.scrollTop;
    page.scrollTo({ top: offset, behavior: 'smooth' });
    setActiveId(id);
  }, []);

  return { ref, activeId, progress, onScroll, onJump };
};

export { useLongPage };
