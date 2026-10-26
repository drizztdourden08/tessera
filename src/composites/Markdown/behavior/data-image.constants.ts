/* @layer renderer-components @kind data */
const DATA_IMAGE_MAX_LENGTH = 2_000_000;

const DATA_IMAGE_HEAD = /^data:image\/(?:png|jpeg|gif|webp);base64,/i;

const DATA_IMAGE_BODY = /^[A-Za-z0-9+/]+={0,2}$/;

const DATA_IMAGE_WHITESPACE = /\s+/g;

export { DATA_IMAGE_BODY, DATA_IMAGE_HEAD, DATA_IMAGE_MAX_LENGTH, DATA_IMAGE_WHITESPACE };
