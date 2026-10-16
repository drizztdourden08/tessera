/* @layer tooling-scripts @kind logic */
/* global document, location */

const frameOf = async (page) => (await page.$('iframe'))?.contentFrame();

const openOverview = async (page, id) => {
  const old = await frameOf(page);
  await old?.evaluate(() => document.querySelectorAll('.overview').forEach((el) => { el.dataset.seen = ''; })).catch(() => undefined);
  await page.evaluate((hash) => { location.hash = hash; }, `#/story/${id}`);
  for (let tries = 0; tries < 60; tries += 1) {
    await page.waitForTimeout(250);
    const frame = await frameOf(page);
    const ready = await frame?.evaluate(() => document.querySelector('.overview:not([data-seen])') !== null).catch(() => false);
    if (ready) {
      await frame.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(700);
      return frame;
    }
  }
  return null;
};

export { openOverview };
