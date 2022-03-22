import { TsRule } from './ts-rule';

import { FunctionDeclarationContext } from '../runtime/TypeScriptParser';

export const tsFuncnameRule: TsRule = {
  errorMessage:
    'Invalid function name `{}`. Function names must be in camel case.',
  gravity: 'error',
  hooks: [
    {
      type: 'visitFunctionDeclaration',
      test: (context: FunctionDeclarationContext) => {
        const name = context.Identifier().text;
        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(name)) {
          return [ name ];
        }
      }
    }
  ]
};
