/* @layer renderer-components @kind hook */
import { useState, useRef, useCallback } from 'react';
import { dropPanelPositionFor, useAnchorTracking, useDismissListeners } from '../../Portal';
import { filterOptions } from './filter-options';
import { useDropdownFocus } from './useDropdownFocus';
import { useSelectKeyDown } from './useSelectKeyDown';
import { MIN_PANEL_WIDTH, ROOM_FOR_DROP_DOWN, TRIGGER_GAP } from './useSelectDropdown.constants';
import type { UseSelectDropdownParams } from './useSelectDropdown.type';

const selectPositionFor = (rect: DOMRect, view: Window) =>
  dropPanelPositionFor(rect, {
    roomForDropDown: ROOM_FOR_DROP_DOWN,
    gap: TRIGGER_GAP,
    minPanelWidth: MIN_PANEL_WIDTH,
  }, view);

const useSelectDropdown = (params: UseSelectDropdownParams) => {
  const { disabled, searchable, allOptions, onChange } = params;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = filterOptions(allOptions, search);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    setSearch('');
    setHighlightIdx(-1);
  }, [disabled]);

  const handleDismiss = useCallback(() => {
    setOpen(false);
    setSearch('');
  }, []);

  const handleClose = useCallback(() => {
    handleDismiss();
    triggerRef.current?.focus();
  }, [handleDismiss]);

  const { position: pos } = useAnchorTracking({
    active: open,
    anchorRef: triggerRef,
    compute: selectPositionFor,
    onOutOfView: handleDismiss,
  });

  const handleSelect = useCallback(
    (val: string) => {
      onChange(val);
      handleClose();
    },
    [onChange, handleClose],
  );

  useDismissListeners({ open, onClose: handleClose, contentRef, triggerRef });

  const handleKeyDown = useSelectKeyDown({
    open, highlightIdx, filtered, setHighlightIdx, handleOpen, handleSelect,
  });

  useDropdownFocus({ open, searchable, highlightIdx, searchRef, contentRef });

  return {
    open,
    search,
    setSearch,
    highlightIdx,
    setHighlightIdx,
    filtered,
    pos,
    triggerRef,
    contentRef,
    searchRef,
    handleOpen,
    handleClose,
    handleSelect,
    handleKeyDown,
  };
};

export { useSelectDropdown };
