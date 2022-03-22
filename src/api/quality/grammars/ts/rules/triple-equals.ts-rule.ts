import { TsRule } from './ts-rule';

import { SingleExpressionContext } from '../runtime/TypeScriptParser';

export const tsTripleEqualsRule: TsRule = {
  errorMessage:
    'Prefer triple equals to double equals.',
  gravity: 'warning',
  hooks: [
    {
      type: 'visitExpressionSequence',
      test: (context: SingleExpressionContext) => {
        const { text } = context;
        if (text.includes('==') && !text.includes('===')) {
          return [];
        }
      }
    }
  ]
};
