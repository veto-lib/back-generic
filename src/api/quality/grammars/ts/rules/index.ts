import { TsRule } from './ts-rule';

import { tsVarnameRule } from './varname.ts-rule';
import { tsFuncnameRule } from './funcname.ts-rule';
import { tsTripleEqualsRule } from './triple-equals.ts-rule';

export { TsRule } from './ts-rule';

export const TS_RULES: TsRule[] = [
  tsVarnameRule,
  tsFuncnameRule,
  tsTripleEqualsRule
];
