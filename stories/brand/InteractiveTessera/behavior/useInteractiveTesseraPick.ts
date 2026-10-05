/* @layer stories @kind hook */
import { useCallback, useState } from 'react';
import type { FocusEvent, KeyboardEvent, MouseEvent, PointerEvent } from 'react';
import type { BrandApp } from '../../../../src/brand/brand.type';
import type { PickParams } from './useInteractiveTesseraPick.type';

const asElement = (target: EventTarget): Element | null =>
  typeof (target as Element).closest === 'function' ? (target as Element) : null;

const pickOf = (target: EventTarget): BrandApp | null => {
  const el = asElement(target)?.closest('[data-pick]') ?? null;
  return el ? (el.getAttribute('data-pick') as BrandApp) : null;
};

const isInCard = (target: EventTarget): boolean =>
  asElement(target)?.closest('.interactive-tessera__detail') != null;

const useInteractiveTesseraPick = (params: PickParams) => {
  const { selected, defaultSelected = null, onSelect } = params;
  const [own, setOwn] = useState<BrandApp | null>(defaultSelected);
  const [pointed, setPointed] = useState<BrandApp | null>(null);
  const picked = selected === undefined ? own : selected;

  const choose = useCallback((app: BrandApp | null) => {
    setOwn(app);
    onSelect?.(app);
  }, [onSelect]);

  const handleClick = useCallback((e: MouseEvent) => {
    const app = pickOf(e.target);
    if (app) choose(app);
    else if (!isInCard(e.target)) choose(null);
  }, [choose]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') choose(null);
    const onTile = asElement(e.target)?.matches('.interactive-tessera__tile[data-pick]') ?? false;
    if (onTile && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      choose(pickOf(e.target));
    }
  }, [choose]);

  const handlePointerOver = useCallback((e: PointerEvent) => setPointed(pickOf(e.target)), []);
  const handlePointerLeave = useCallback(() => setPointed(null), []);
  const handleFocus = useCallback((e: FocusEvent) => setPointed(pickOf(e.target)), []);
  const handleBlur = useCallback(() => setPointed(null), []);

  return {
    picked,
    pointed,
    handlers: {
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onPointerOver: handlePointerOver,
      onPointerLeave: handlePointerLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
};

export { useInteractiveTesseraPick };
