/* @layer root-config @kind logic */
const galleryBuild = (): boolean => process.argv[2] === 'build';

export { galleryBuild };
