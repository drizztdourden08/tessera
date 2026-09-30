/* @layer tooling-scripts @kind logic */
const printReview = ({ pages, groups }, only) => {
  const shown = (colour) => !only || only === colour;
  for (const [group, colour] of Object.entries(groups)) {
    if (shown(colour)) console.log(`${colour.padEnd(6)} ${group}`);
    const children = Object.entries(pages).filter(([title, pageColour]) => title.startsWith(`${group}/`) && shown(pageColour));
    for (const [title, pageColour] of children) console.log(`  ${pageColour.padEnd(6)} ${title}`);
  }
};

export { printReview };
