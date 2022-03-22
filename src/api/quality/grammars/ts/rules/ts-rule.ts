import { Rule } from '../../../utils/rule';
import { TypeScriptParserVisitor } from '../runtime/TypeScriptParserVisitor';

export interface TsRule extends Rule<keyof TypeScriptParserVisitor<unknown>> {}
