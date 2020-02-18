import nearley from 'nearley';
import grammar from './grammar.cjs';

const grammarInstance = nearley.Grammar.fromCompiled(grammar);

const helper = {
  val(prop) {
    return obj => obj && obj[prop];
  },
  call(prop, args) {
    return obj => obj && typeof obj[prop] === 'function' ? obj[prop].apply(this, args) : undefined;
  }
};

export function parse(expression) {
  const parser = new nearley.Parser(grammarInstance);
  parser.feed(expression);

  if (!parser.results || parser.results.length === 0) {
    throw new Error('empty expression');
  }

  return parser.results[0];
}

export default function compile(expression) {
  const code = parse(expression);

  const js = `return ${code};`;

  const fn = new Function('helper', 'ctx', js);

  // Pass an instance of helper functions and return curried function
  return (ctx) => fn(helper, ctx);
}
