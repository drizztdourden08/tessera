/* @layer renderer-components @kind util */
const dateFormats = new Map<string, Intl.DateTimeFormat>();

const relativeFormats = new Map<string, Intl.RelativeTimeFormat>();

const keyOf = (locale: string | undefined, options: object): string => `${locale ?? ''}|${JSON.stringify(options)}`;

const intlFormats = {
  date: (locale: string | undefined, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat => {
    const key = keyOf(locale, options);
    const found = dateFormats.get(key);
    if (found) return found;
    const made = new Intl.DateTimeFormat(locale, options);
    dateFormats.set(key, made);
    return made;
  },
  relative: (locale: string | undefined, style: Intl.RelativeTimeFormatStyle): Intl.RelativeTimeFormat => {
    const key = keyOf(locale, { style });
    const found = relativeFormats.get(key);
    if (found) return found;
    const made = new Intl.RelativeTimeFormat(locale, { numeric: 'auto', style });
    relativeFormats.set(key, made);
    return made;
  },
};

export { intlFormats };
