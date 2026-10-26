/* @layer renderer-components @kind data */
const HEX_ALPHA = /^#([0-9a-f]{4}|[0-9a-f]{8})$/;

const SLASH_ALPHA = /^(?:rgb|hsl)a?\([^,/)]+\/\s*([\d.]+%?)\s*\)$/;

const COMMA_ALPHA = /^(?:rgb|hsl)a?\((?:[^,/)]+,){3}\s*([\d.]+%?)\s*\)$/;

const OPAQUE = 1;

export { COMMA_ALPHA, HEX_ALPHA, OPAQUE, SLASH_ALPHA };
