/* @layer renderer-components @kind logic */
const shiftInto = (start: number, end: number, room: number, margin: number): number => {
  const back = end > room - margin ? room - margin - end : 0;
  return start + back < margin ? margin - start : back;
};

export { shiftInto };
