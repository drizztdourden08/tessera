/* @layer tooling-scripts @kind test */
const FAMILY_IDS = [16, 1];
const WINDOWS_PLATFORM = 3;

const tableOf = (font, tag) => {
  const count = font.readUInt16BE(4);
  for (let index = 0; index < count; index++) {
    const record = 12 + index * 16;
    if (font.toString('latin1', record, record + 4) === tag) return font.subarray(font.readUInt32BE(record + 8));
  }
  throw new Error(`no ${tag} table`);
};

const familyOf = (name) => {
  const strings = name.readUInt16BE(4);
  const records = Array.from({ length: name.readUInt16BE(2) }, (_, index) => {
    const at = 6 + index * 12;
    return { platform: name.readUInt16BE(at), id: name.readUInt16BE(at + 6), length: name.readUInt16BE(at + 8), offset: name.readUInt16BE(at + 10) };
  }).filter((record) => record.platform === WINDOWS_PLATFORM);
  const record = FAMILY_IDS.map((id) => records.find((entry) => entry.id === id)).find(Boolean);
  return name.subarray(strings + record.offset, strings + record.offset + record.length).swap16().toString('utf16le');
};

const readSfntFace = (bytes) => {
  const font = Buffer.from(bytes);
  return { family: familyOf(Buffer.from(tableOf(font, 'name'))), weight: tableOf(font, 'OS/2').readUInt16BE(4) };
};

export { readSfntFace };
