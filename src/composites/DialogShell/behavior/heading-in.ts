/* @layer renderer-components @kind logic */
const headingIn = (dialog: HTMLElement, headingId: string | undefined): HTMLElement | null => {
  const heading = headingId ? dialog.ownerDocument.getElementById(headingId) : null;
  if (!heading || !dialog.contains(heading)) return null;
  if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
  return heading;
};

export { headingIn };
