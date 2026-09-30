/* @layer stories @kind logic */
import { useCallback, useEffect, useRef, useState } from 'react';
import { BUILDS, GAMES } from './picker-data';
import type { Build, Game } from './picker-data';

const LOAD_DELAY_MS = 900;

const SEARCH_DELAY_MS = 500;

const later = <T>(value: T, delay: number): Promise<T> => new Promise((resolve) => {
  setTimeout(() => resolve(value), delay);
});

const shuffled = (builds: readonly Build[]): Build[] => [...builds.slice(1), ...builds.slice(0, 1)].reverse();

const useLateBuilds = () => {
  const [builds, setBuilds] = useState<readonly Build[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    setLoading(true);
    setBuilds([]);
    void later(BUILDS, LOAD_DELAY_MS).then((next) => {
      setBuilds(next);
      setLoading(false);
    });
  }, []);

  useEffect(reload, [reload]);

  const reorder = () => setBuilds((current) => shuffled(current));

  return { builds, loading, reload, reorder };
};

const useGameSearch = () => {
  const [games, setGames] = useState<readonly Game[]>(GAMES);
  const [loading, setLoading] = useState(false);
  const latest = useRef('');

  const search = (query: string) => {
    latest.current = query;
    setLoading(true);
    const needle = query.trim().toLowerCase();
    const hits = GAMES.filter((game) => `${game.title} ${game.platform}`.toLowerCase().includes(needle));
    void later(hits, SEARCH_DELAY_MS).then((found) => {
      if (latest.current !== query) return;
      setGames(found);
      setLoading(false);
    });
  };

  return { games, loading, search };
};

export { useGameSearch, useLateBuilds };
