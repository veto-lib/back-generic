import { TsQualityGrammarVisitor } from './grammars/ts/ts-quality-grammar.visitor';

const analyse = (source: string) => {
  const visitor = new TsQualityGrammarVisitor();
  return visitor.run(source);
};

export default { analyse };
