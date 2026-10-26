/* @layer stories @kind data */
const STRIPES_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAwCAIAAABhdOiYAAAAeUlEQVR4nO3QMRGAQBAEwddE/CIQgRzkEH+MCGJ04OAuZIOuGgFTPe59qmj8fhAeIECAAAEKDhAgQIAABTfm+agIECBAgAAFBwgQIECAggPUAl2HigABAgQIUHCAAAECBCg4QB3QuzYVAQIECBCg4AABAgQIUHCAmj5g9JqWTUxxCgAAAABJRU5ErkJggg==';

const IMAGE_NOTE = `# Screenshots

A base64 PNG is drawn when images is on. Click it: onImage gets the src and the alt text.

![Four colour stripes, a base64 PNG](${STRIPES_PNG})

An SVG data image is never drawn, because it can carry script:

![An SVG data image, shown as its alt text](data:image/svg+xml;base64,PHN2ZyBvbmxvYWQ9ImFsZXJ0KDEpIi8+)
`;

export { IMAGE_NOTE };
