import { TsRule } from './ts-rule';

import { VariableDeclarationContext } from '../runtime/TypeScriptParser';

export const tsVarnameRule: TsRule = {
  errorMessage:
    'Invalid variable name `{}`. Variable names must be in camel case.',
  gravity: 'error',
  hooks: [
    {
      type: 'visitVariableDeclaration',
      test: (context: VariableDeclarationContext) => {
        const identifier = context.identifierOrKeyWord()?.Identifier()?.text ?? '';
        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(identifier)) {
          return [ identifier ];
        }
      }
    }
  ]
};
