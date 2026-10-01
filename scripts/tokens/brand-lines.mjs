/* @layer tooling-scripts @kind logic */

const brandLines = ({ family, apps, gradientCss, backdropCss }) => [
  ...apps.map((app) => [`--brand-${app}-gradient`, gradientCss(family[app].gradient)]),
  ...apps.map((app) => [`--brand-${app}-backdrop`, backdropCss(family[app].backdrop)]),
];

export { brandLines };
