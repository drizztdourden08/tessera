/* @layer renderer-components @kind util */
import type { InputAdornment, InputAdornmentAction } from './input-adornment.type';

const isAdornmentAction = (adornment: InputAdornment): adornment is InputAdornmentAction => adornment.onClick !== undefined;

export { isAdornmentAction };
