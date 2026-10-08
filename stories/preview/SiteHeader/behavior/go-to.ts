/* @layer stories @kind logic */
const goTo = (href: string, navigate?: (href: string) => void): void => {
  if (navigate) navigate(href);
  else window.location.assign(href);
};

export { goTo };
