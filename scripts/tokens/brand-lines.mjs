/* @layer tooling-scripts @kind logic */

const brandLines = ({ family, apps, gradientCss, backdropCss, rim }) => [
  ...apps.map((app) => [`--brand-${app}-gradient`, gradientCss(family[app].gradient)]),
  ...apps.map((app) => [`--brand-${app}-backdrop`, backdropCss(family[app].backdrop)]),
  ...Object.entries(rim.colours).map(([tone, colour]) => [`--brand-rim-${tone}`, colour]),
];

export { brandLines };
