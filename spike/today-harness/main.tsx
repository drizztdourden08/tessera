import '@drizztdourden08/tessera/tokens.css';
import '@drizztdourden08/tessera/palettes/archipelia.css';
import './harness.css';
import { createRoot } from 'react-dom/client';
import { TesseraProvider } from '@drizztdourden08/tessera/primitives';
import { SCENES } from './scenes';

const name = location.hash.slice(1).split('?')[0];
const scene = SCENES[name];
const root = document.getElementById('root');
if (!root) throw new Error('no root');
createRoot(root).render(
  scene
    ? <TesseraProvider overrides={{}}><div id="shot" style={{ width: scene.width }}>{scene.render()}</div></TesseraProvider>
    : <pre>{Object.keys(SCENES).join('\n')}</pre>,
);
