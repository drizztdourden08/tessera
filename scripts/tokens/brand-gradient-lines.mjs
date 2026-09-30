/* @layer tooling-scripts @kind logic */

const brandGradientLines = ({ family, apps, gradientCss }) =>
  apps.map((app) => [`--brand-${app}-gradient`, gradientCss(family[app].gradient)]);

export { brandGradientLines };
