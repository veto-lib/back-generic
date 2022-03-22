import { RuleContext } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { Quality } from './quality';
import { Rule } from './rule';

export abstract class QualityGrammarVisitor
  extends AbstractParseTreeVisitor<void>
  implements ParseTreeVisitor<void>
{
  protected quality = new Quality();
  protected readonly rules: Rule<string>[] = [];

  protected setup() {
    this.getRuleTypes().forEach((type) => {
      const rules = this.getRulesByType(type);
      (this as any)[type] = (context: RuleContext) => {
        rules.forEach((rule) => {
          rule.hooks.forEach((r) => {
            const errors = r.test(context);
            if (errors) {
              this.addError(rule, ...errors);
            }
          });
        });
        this.visitChildren(context);
      };
    });
  }

  public abstract run(source: string): Quality;

  private getRulesByType(type: string): Rule<string>[] {
    return this.rules
      .map((r) => {
        return { ...r, hooks: r.hooks.filter((h) => h.type === type) };
      })
      .filter((r) => r.hooks.length > 0);
  }

  private getRuleTypes(): string[] {
    return [
      ...new Set(
        this.rules
          .map((r) => r.hooks.map((h) => h.type))
          .reduce((pv, cv) => {
            return pv.concat(cv);
          }, [])
      )
    ];
  }

  private addError(rule: Rule<string>, ...errors: string[]) {
    this.quality.errors.push({
      message: errors.reduce((errorMessage, current) => {
        return errorMessage.replace('{}', current);
      }, rule.errorMessage),
      type: rule.gravity
    });
  }

  protected defaultResult() {}
}
