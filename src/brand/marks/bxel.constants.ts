/* @layer renderer-components @kind data */
import type { BrandMarkData } from '../brand.type';

const INK = {
  purple: '#4b1fa0',
  lilac: '#b9a4f5',
  rose: '#ff9fb2',
  violet: '#7b3fe4',
  magenta: '#b02a9c',
  crimson: '#e0245e',
  coral: '#ff7a8a',
  mist: '#f4eeff',
} as const;

const BXEL_MARK: BrandMarkData = {
  viewBox: '-111 0 431 102',
  grounds: { dark: { inks: 'onDark' } },
  paths: [
    { ink: INK.violet, d: 'M0.7 0.7h8.6v8.6h-8.6zM10.7 0.7h8.6v8.6h-8.6zM10.7 10.7h8.6v8.6h-8.6zM0.7 20.7h8.6v8.6h-8.6zM0.7 30.7h8.6v8.6h-8.6zM10.7 30.7h8.6v8.6h-8.6zM10.7 40.7h8.6v8.6h-8.6zM0.7 50.7h8.6v8.6h-8.6zM10.7 50.7h8.6v8.6h-8.6zM0.7 60.7h8.6v8.6h-8.6zM10.7 60.7h8.6v8.6h-8.6zM10.7 70.7h8.6v8.6h-8.6zM0.7 80.7h8.6v8.6h-8.6zM10.7 80.7h8.6v8.6h-8.6z' },
    { ink: INK.magenta, d: 'M20.7 0.7h8.6v8.6h-8.6zM30.7 0.7h8.6v8.6h-8.6zM40.7 0.7h8.6v8.6h-8.6zM20.7 10.7h8.6v8.6h-8.6zM30.7 10.7h8.6v8.6h-8.6zM40.7 10.7h8.6v8.6h-8.6zM20.7 40.7h8.6v8.6h-8.6zM30.7 40.7h8.6v8.6h-8.6zM40.7 40.7h8.6v8.6h-8.6zM20.7 70.7h8.6v8.6h-8.6zM30.7 70.7h8.6v8.6h-8.6zM40.7 70.7h8.6v8.6h-8.6zM20.7 80.7h8.6v8.6h-8.6zM30.7 80.7h8.6v8.6h-8.6zM40.7 80.7h8.6v8.6h-8.6z' },
    { ink: INK.crimson, d: 'M50.7 0.7h8.6v8.6h-8.6zM50.7 10.7h8.6v8.6h-8.6zM60.7 10.7h8.6v8.6h-8.6zM50.7 20.7h8.6v8.6h-8.6zM60.7 20.7h8.6v8.6h-8.6zM50.7 30.7h8.6v8.6h-8.6zM60.7 30.7h8.6v8.6h-8.6zM50.7 40.7h8.6v8.6h-8.6zM60.7 40.7h8.6v8.6h-8.6zM60.7 50.7h8.6v8.6h-8.6zM70.7 50.7h8.6v8.6h-8.6zM60.7 60.7h8.6v8.6h-8.6zM70.7 60.7h8.6v8.6h-8.6zM50.7 70.7h8.6v8.6h-8.6zM60.7 70.7h8.6v8.6h-8.6zM70.7 70.7h8.6v8.6h-8.6zM50.7 80.7h8.6v8.6h-8.6zM60.7 80.7h8.6v8.6h-8.6z' },
    { ink: INK.violet, opacity: 0.7, onDark: INK.lilac, onDarkOpacity: 0.88, d: 'M-12.1 0.19h6.2v6.2h-6.2zM-12.1 30.69h6.2v6.2h-6.2zM-12.1 50.46h6.2v6.2h-6.2zM-12.1 62.61h6.2v6.2h-6.2zM-12.1 80.56h6.2v6.2h-6.2z' },
    { ink: INK.violet, opacity: 0.5, onDark: INK.lilac, onDarkOpacity: 0.8, d: 'M-21.7 4.19h4.96v4.96h-4.96zM-22.5 32.69h4.96v4.96h-4.96zM-24.17 52.06h4.96v4.96h-4.96zM-23.89 61.93h4.96v4.96h-4.96zM-23.33 83.04h4.96v4.96h-4.96z' },
    { ink: INK.violet, opacity: 0.36, onDark: INK.lilac, onDarkOpacity: 0.74, d: 'M-38.15 3.09h3.97v3.97h-3.97zM-39.17 31.53h3.97v3.97h-3.97zM-39.67 52.91h3.97v3.97h-3.97zM-39.14 61.75h3.97v3.97h-3.97zM-40.46 84.63h3.97v3.97h-3.97z' },
    { ink: INK.violet, opacity: 0.95, d: 'M-7.8 10.58h8.6v8.6h-8.6zM-7.8 19.98h8.6v8.6h-8.6zM-7.8 40.89h8.6v8.6h-8.6zM-7.8 69.62h8.6v8.6h-8.6z' },
    { ink: INK.violet, opacity: 0.68, onDark: INK.lilac, onDarkOpacity: 0.87, d: 'M-17.78 11.75h6.88v6.88h-6.88zM-18.81 20.85h6.88v6.88h-6.88zM-19.12 42.19h6.88v6.88h-6.88zM-19.15 70.99h6.88v6.88h-6.88z' },
    { ink: INK.violet, opacity: 0.49, onDark: INK.lilac, onDarkOpacity: 0.8, d: 'M-34.15 11.4h5.5v5.5h-5.5zM-36.05 21.36h5.5v5.5h-5.5zM-36.31 42.68h5.5v5.5h-5.5zM-33.12 72.89h5.5v5.5h-5.5z' },
    { ink: INK.violet, opacity: 0.35, onDark: INK.lilac, onDarkOpacity: 0.74, d: 'M-53.14 13.72h4.4v4.4h-4.4zM-57.57 21.72h4.4v4.4h-4.4zM-57.98 43.95h4.4v4.4h-4.4zM-54.79 72.97h4.4v4.4h-4.4z' },
    { ink: INK.violet, opacity: 0.26, onDark: INK.lilac, onDarkOpacity: 0.7, d: 'M-78.02 12.18h3.52v3.52h-3.52zM-81.18 42.1h3.52v3.52h-3.52zM-58.21 64.86h3.17v3.17h-3.17zM-80.74 73.78h3.52v3.52h-3.52z' },
    { ink: INK.violet, opacity: 0.18, onDark: INK.lilac, onDarkOpacity: 0.67, d: 'M-110.08 43.33h2.82v2.82h-2.82z' },
    { ink: INK.mist, d: 'M210 30h50v10h-50zM200 40h20v10h-20zM250 40h20v10h-20zM200 50h70v10h-70zM200 60h20v10h-20zM200 70h20v10h-20zM250 70h20v10h-20zM210 80h50v10h-50z' },
    { ink: INK.mist, d: 'M290 0h20v10h-20zM290 10h20v10h-20zM290 20h20v10h-20zM290 30h20v10h-20zM290 40h20v10h-20zM290 50h20v10h-20zM290 60h20v10h-20zM290 70h20v10h-20zM290 80h30v10h-30z' },
    { ink: INK.crimson, d: 'M120.6 44h15v15h-15zM113.25 38.95h13.6v13.6h-13.6zM106.25 34.15h12.2v12.2h-12.2zM99.5 29.5h11v11h-11zM144.4 61h15v15h-15zM153.15 67.45h13.6v13.6h-13.6zM161.55 73.65h12.2v12.2h-12.2zM169.5 79.5h11v11h-11z' },
    { ink: INK.violet, d: 'M144.4 44h15v15h-15zM153.15 38.95h13.6v13.6h-13.6zM161.55 34.15h12.2v12.2h-12.2zM169.5 29.5h11v11h-11zM120.6 61h15v15h-15zM113.25 67.45h13.6v13.6h-13.6zM106.25 73.65h12.2v12.2h-12.2zM99.5 79.5h11v11h-11z' },
    { ink: INK.crimson, opacity: 0.55, onDark: INK.rose, onDarkOpacity: 0.82, d: 'M91 24h6v6h-6z' },
    { ink: INK.crimson, opacity: 0.3, onDark: INK.rose, onDarkOpacity: 0.72, d: 'M85.25 19.25h3.5v3.5h-3.5z' },
    { ink: INK.violet, opacity: 0.6, onDark: INK.lilac, onDarkOpacity: 0.84, d: 'M183.25 22.25h7.5v7.5h-7.5z' },
    { ink: INK.violet, opacity: 0.38, onDark: INK.lilac, onDarkOpacity: 0.75, d: 'M193.5 12.5h5v5h-5z' },
    { ink: INK.violet, opacity: 0.22, onDark: INK.lilac, onDarkOpacity: 0.69, d: 'M202.5 4.5h3v3h-3z' },
    { ink: INK.crimson, opacity: 0.5, onDark: INK.rose, onDarkOpacity: 0.8, d: 'M184 90h6v6h-6z' },
    { ink: INK.crimson, opacity: 0.28, onDark: INK.rose, onDarkOpacity: 0.71, d: 'M193.25 98.25h3.5v3.5h-3.5z' },
    { ink: INK.coral, d: 'M137 41h6v38h-6zM121 57h38v6h-38zM133 53h14v14h-14z' },
    { ink: INK.mist, d: 'M136.5 56.5h7v7h-7z' },
  ],
};

const BXEL_ICON_MARK: BrandMarkData = {
  viewBox: '20 56 436 336',
  paths: [
    { ink: INK.crimson, d: 'M256 128h160v32h-160zM224 160h64v32h-64zM352 160h64v32h-64zM224 192h64v32h-64zM352 192h64v32h-64zM224 224h192v32h-192zM224 256h64v32h-64zM384 256h64v32h-64zM224 288h64v32h-64zM384 288h64v32h-64zM224 320h64v32h-64zM384 320h64v32h-64zM224 352h192v32h-192z' },
    { ink: INK.coral, d: 'M224 128h32v32h-32z' },
    { ink: INK.crimson, d: 'M128 160h32v32h-32z' },
    { ink: INK.magenta, opacity: 0.9, d: 'M68.16 196.16h23.68v23.68h-23.68z' },
    { ink: INK.purple, opacity: 0.9, d: 'M27.2 225.6h16v16h-16z' },
    { ink: INK.magenta, opacity: 0.85, d: 'M136.64 232.64h21.12v21.12h-21.12z' },
    { ink: INK.violet, opacity: 0.5, d: 'M89.6 262.4h12.8v12.8h-12.8z' },
    { ink: INK.violet, d: 'M129.6 289.6h28.8v28.8h-28.8z' },
    { ink: INK.purple, opacity: 0.95, d: 'M69.44 325.44h21.12v21.12h-21.12z' },
    { ink: INK.purple, opacity: 0.6, d: 'M28.48 354.88h13.44v13.44h-13.44z' },
  ],
};

export { BXEL_ICON_MARK, BXEL_MARK };
