import nearley from 'nearley';
import grammar from './grammar.cjs';

const grammarInstance = nearley.Grammar.fromCompiled(grammar);

export default function compile(expression) {
  const parser = new nearley.Parser(grammarInstance);
  parser.feed(expression);

  if (!parser.results || parser.results.length === 0) {
    throw new Error('empty expression');
  }

  const js = `return ${parser.results[0]};`;

  const fn = new Function('ctx', js);

  return fn;
}
