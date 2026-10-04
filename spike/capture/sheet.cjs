const { chromium } = require('X:/relic-of-the-past/node_modules/playwright');
const { readFileSync } = require('node:fs');
const DIR = 'C:/Users/drizz/.coord/archipelia/review/components';
const V = [['10px-caps', 'Today: 10 px, upper case'], ['12px-caps', '12 px, upper case'], ['10px-plain', '10 px, no forced upper case'], ['12px-plain', '12 px, no forced upper case']];
const S = [['settings', 'Settings page'], ['form', 'Form with Field labels'], ['widget', 'Widgets: tags, StatRow mono'], ['list', 'Dense list']];
const img = (f) => `data:image/png;base64,${readFileSync(`${DIR}/${f}`).toString('base64')}`;
const html = `<html><body style="margin:0;background:#0b0b10;color:#eee;font:600 28px Segoe UI,sans-serif">
<div style="display:grid;grid-template-columns:220px repeat(4,960px);gap:16px;padding:16px">
<div></div>${V.map(([, l]) => `<div style="padding:8px 0">${l}</div>`).join('')}
${S.map(([s, l]) => `<div style="align-self:center">${l}</div>${V.map(([v]) => `<img src="${img(`T-03-${s}-${v}-960.png`)}" width="960" height="540">`).join('')}`).join('')}
</div></body></html>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 4140, height: 2400 } });
  await p.setContent(html); await p.waitForTimeout(500);
  await p.locator('div').first().screenshot({ path: `${DIR}/T-03-compare.png` });
  await b.close();
})();
