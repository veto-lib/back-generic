import { CharStreams, CommonTokenStream } from 'antlr4ts';

import { Quality } from '../../utils/quality';
import { QualityGrammarVisitor } from '../../utils/quality-grammar.visitor';

import { TypeScriptLexer } from './runtime/TypeScriptLexer';
import { TypeScriptParser } from './runtime/TypeScriptParser';
import { TypeScriptParserVisitor } from './runtime/TypeScriptParserVisitor';

import { TsRule, TS_RULES } from './rules';

export class TsQualityGrammarVisitor
  extends QualityGrammarVisitor
  implements TypeScriptParserVisitor<void>
{
  protected readonly rules: TsRule[] = TS_RULES;

  run(source: string): Quality {
    const inputStream = CharStreams.fromString(source);
    const lexer = new TypeScriptLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new TypeScriptParser(tokenStream);
    const context = parser.program();

    this.setup();
    this.visit(context);

    return this.quality;
  }
}
