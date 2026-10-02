/* @layer root-config @kind logic */
const folderFor = (tier: string, group: string): string => (group ? `${tier} · ${group}` : tier);

export { folderFor };
