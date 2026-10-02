/* @layer renderer-components @kind data */
const PATTERN_PROBLEMS = {
  unclosed: (open: string, close: string, at: number) =>
    `DynamicInput: the "${open}" at position ${at + 1} has no "${close}", so it shows as text. Write \\${open} for a plain "${open}".`,
  stray: (char: string, at: number) =>
    `DynamicInput: the "${char}" at position ${at + 1} closes nothing, so it shows as text. Write \\${char} for a plain "${char}".`,
  badSlot: (body: string) =>
    `DynamicInput: "{${body}}" is not a slot. Write {name:type}, for example {x:number 0..100}.`,
  badName: (name: string) =>
    `DynamicInput: "${name}" is not a slot name. A name starts with a letter and holds letters, digits and _.`,
  unknownType: (name: string, type: string, types: string) =>
    `DynamicInput: slot "${name}" has the unknown type "${type}". The types are ${types}.`,
  badArg: (name: string, type: string, arg: string, forms: string) =>
    `DynamicInput: slot "${name}" is a ${type}, which does not take "${arg}". It takes ${forms}.`,
  noChoices: (name: string) =>
    `DynamicInput: choice slot "${name}" lists no options. Write A|B|C or @list.`,
  badRange: (name: string) =>
    `DynamicInput: slot "${name}" has a range whose low end is above its high end, so the range is ignored.`,
  sliderNeedsRange: (name: string) =>
    `DynamicInput: slot "${name}" asks for a slider but its range is open, so it gets a stepper.`,
  duplicate: (name: string) =>
    `DynamicInput: the slot name "${name}" is used twice. The second one shows as text.`,
  badEcho: (body: string) =>
    `DynamicInput: "{${body}}" is not an echo. Write {=slot} or {=slot.field}.`,
  badBracket: (body: string) =>
    `DynamicInput: "[${body}]" is not an adornment. Write [icon:name], [action:name] or [spacer].`,
  echoTarget: (name: string) =>
    `DynamicInput: {=${name}} echoes a slot the pattern does not have.`,
  missingList: (slot: string, list: string) =>
    `DynamicInput: slot "${slot}" reads @${list}, but lists has no "${list}".`,
  missingAction: (name: string) =>
    `DynamicInput: [action:${name}] has no entry in actions, so it is not drawn.`,
  missingIcon: (name: string) =>
    `DynamicInput: [icon:${name}] is neither a Tessera icon nor an entry in icons, so it is not drawn.`,
  badCounter: (name: string) =>
    `DynamicInput: counter names "${name}", which is not a text slot with a max length.`,
};

export { PATTERN_PROBLEMS };
