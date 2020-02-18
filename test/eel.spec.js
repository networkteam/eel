import compile, { parse } from '../src/compile.js';
import assert from 'assert';

describe('eel', function() {
  describe('number literals', function() {
    describe('integer without sign', function() {
      it('should be parsed to literal value', function() {
        const code = parse('42');
        assert.strictEqual(code, '42');
      });

      it('should parse and evaluate to literal value', function() {
        const fn = compile('42');
        const ctx = {};
        assert.strictEqual(fn(ctx), 42);
      });
    });

    describe('negative integer', function() {
      it('should be parsed to literal value', function() {
        const code = parse('-1');
        assert.strictEqual(code, '-1');
      });

      it('should parse and evaluate to literal value', function() {
        const fn = compile('-1');
        const ctx = {};
        assert.strictEqual(fn(ctx), -1);
      });
    });
  });

  describe('string literals', function() {
    describe('double quoted', function() {
      it('should be parsed to literal value', function() {
        const code = parse(`"foo"`);
        assert.strictEqual(code, `"foo"`);
      });

      it('should parse and evaluate to literal value', function() {
        const fn = compile(`"foo"`);
        const ctx = {};
        assert.strictEqual(fn(ctx), `foo`);
      });

      describe('with escapes', function() {
        it('should parse and evaluate to literal value with escape sequences', function() {
          const fn = compile(`"foo\\"next'thingy'"`);
          const ctx = {};
          assert.strictEqual(fn(ctx), `foo"next'thingy'`);
        });

        it('should parse and evaluate newlines', function() {
          const fn = compile(`"multi\\nline\\ntext"`);
          const ctx = {};
          assert.strictEqual(fn(ctx), `multi\nline\ntext`);
        });
      })
    });

    describe('single quoted', function() {
      it('should be parsed to literal value', function() {
        const code = parse(`'foo'`);
        assert.strictEqual(code, `'foo'`);
      });

      it('should parse and evaluate to literal value', function() {
        const fn = compile(`'foo'`);
        const ctx = {};
        assert.strictEqual(fn(ctx), `foo`);
      });

      describe('with escapes', function() {
        it('should parse and evaluate to literal value with escape sequences', function() {
          const fn = compile(`'foo\\'next"thingy"'`);
          const ctx = {};
          assert.strictEqual(fn(ctx), `foo'next"thingy"`);
        });

        it('should parse and evaluate newlines', function() {
          const fn = compile(`'multi\\nline\\ntext'`);
          const ctx = {};
          assert.strictEqual(fn(ctx), `multi\nline\ntext`);
        });
      })
    });
  });

  describe('variables', function() {
    it('should be parsed to helper call', function() {
      const code = parse('myVar');
      assert.strictEqual(code, `helper.val("myVar")(ctx)`);
    });

    it('should parse and evaluate to variable in context', function() {
      const fn = compile('myVar');
      const ctx = {myVar: 'foo'};
      assert.strictEqual(fn(ctx), ctx.myVar);
    });
  });

  describe('property access', function() {
    it('should be parsed to helper call', function() {
      const code = parse('myObj.myProp');
      assert.strictEqual(code, `helper.val("myProp")(helper.val("myObj")(ctx))`);
    });

    it('should parse and evaluate to property of variable in context', function() {
      const fn = compile('myObj.myProp');
      const ctx = {myObj: {myProp: 'foo'}};
      assert.strictEqual(fn(ctx), ctx.myObj.myProp);
    });

    it('should ignore undefined properties in path', function() {
      const fn = compile('myObj.noKey.otherProp');
      const ctx = {myObj: {myProp: 'foo'}};
      assert.strictEqual(fn(ctx), undefined);
    });
  });

  describe('offset access with string', function() {
    it('should be parsed to helper call', function() {
      const code = parse('myObj["myProp"]');
      assert.strictEqual(code, `helper.val("myProp")(helper.val("myObj")(ctx))`);
    });

    it('should parse and evaluate to property of variable in context', function() {
      const fn = compile('myObj["myProp"]');
      const ctx = {myObj: {myProp: 'foo'}};
      assert.strictEqual(fn(ctx), ctx.myObj.myProp);
    });

    it('should ignore undefined properties in path', function() {
      const fn = compile('myObj["noKey"]["otherProp"]');
      const ctx = {myObj: {myProp: 'foo'}};
      assert.strictEqual(fn(ctx), undefined);
    });
  });

  describe('boolean operators', function() {
    describe('conjunction', function() {
      it('should be parsed to helper call', function() {
        const code = parse('varA &&varB');
        assert.strictEqual(code, `helper.val("varA")(ctx)&&helper.val("varB")(ctx)`);
      });

      it('should parse and short circuit evaluate to operand', function() {
        const fn = compile('varA &&varB');
        assert.strictEqual(fn({varA: 'x', varB: 0}), 0);
        assert.strictEqual(fn({varA: 'x', varB: 1}), 1);
        assert.strictEqual(fn({varA: 0, varB: 'foo'}), 0);
      });

      it('should support multiple conjunctions', function() {
        const fn = compile('varA &&varB&& varC');
        assert.strictEqual(fn({varA: 'x', varB: 0, varC: 1}), 0);
        assert.strictEqual(fn({varA: 'x', varB: 42, varC: false}), false);
        assert.strictEqual(fn({varA: 'x', varB: 42, varC: true}), true);
      });
    });

    describe('disjunction', function() {
      it('should be parsed to helper call', function() {
        const code = parse('varA ||varB');
        assert.strictEqual(code, `helper.val("varA")(ctx)||helper.val("varB")(ctx)`);
      });

      it('should parse and short circuit evaluate to operand', function() {
        const fn = compile('varA ||varB');
        assert.strictEqual(fn({varA: 'x', varB: 0}), 'x');
        assert.strictEqual(fn({varA: 'x', varB: 1}), 'x');
        assert.strictEqual(fn({varA: 0, varB: 'foo'}), 'foo');
      });

      it('should support multiple disjunctions', function() {
        const fn = compile('varA ||varB|| varC');
        assert.strictEqual(fn({varA: 'x', varB: 0, varC: 1}), 'x');
        assert.strictEqual(fn({varA: 42, varB: 42, varC: false}), 42);
        assert.strictEqual(fn({varA: false, varB: 42, varC: true}), 42);
        assert.strictEqual(fn({varA: false, varB: 0, varC: ''}), '');
      });
    });

    describe('negation', function() {
      describe('with variable', function() {
        it('should parse and evaluate', function() {
          const fn = compile('!varA');
          assert.strictEqual(fn({varA: 'x'}), false);
        });
      });

      describe('double negation', function() {
        it('should parse and evaluate', function() {
          const fn = compile('!!varA');
          assert.strictEqual(fn({varA: 'x'}), true);
        });
      });
    });

    describe('mixed boolean operators', function() {
      describe('with disjunction and conjunction 1', function() {
        it('should parse and evaluate with operator precedence', function() {
          const fn = compile('!varA || varB && varC');
          assert.strictEqual(fn({varA: 'x', varB: 42, varC: 0}), 0);
          assert.strictEqual(fn({varA: 0, varB: 42, varC: false}), true);
        });
      });
    });

    describe('comparison', function() {
      describe('equality', function() {
        it('should parse and evaluate', function() {
          const fn = compile('varA == 42');
          assert.strictEqual(fn({varA: 42}), true);
          assert.strictEqual(fn({varA: 23}), false);
        });
      });

      describe('inequality', function() {
        it('should parse and evaluate', function() {
          const fn = compile('varA != 42');
          assert.strictEqual(fn({varA: 42}), false);
          assert.strictEqual(fn({varA: 23}), true);
        });
      });
    });

    describe('comparison and boolean operators', function() {
      it('should parse and evaluate', function() {
        const fn = compile('(varA == 42 || varA < 10) && !varB');
        assert.strictEqual(fn({varA: 42, varB: 'x'}), false);
        assert.strictEqual(fn({varA: 42, varB: 0}), true);
        assert.strictEqual(fn({varA: 33, varB: 0}), false);
        assert.strictEqual(fn({varA: 5, varB: 0}), true);
      });

      it('should parse and evaluate with operator precedence', function() {
        const fn = compile('varA == 42 || varA < 10 && !varB');
        assert.strictEqual(fn({varA: 42, varB: 'x'}), true);
        assert.strictEqual(fn({varA: 42, varB: 0}), true);
        assert.strictEqual(fn({varA: 33, varB: 0}), false);
        assert.strictEqual(fn({varA: 5, varB: 0}), true);
      });
    });
  });

  describe('conditionals', function() {
    it('should be parsed to helper call', function() {
      const code = parse('x > 1 ? (x - 1) : 0');
      assert.strictEqual(code, `helper.val("x")(ctx)>1?(helper.val("x")(ctx)-1):0`);
    });

    it('should evaluate conditional', function() {
      const fn = compile('x > 1 ? (x - 1) * 2 : 0');
      assert.strictEqual(fn({x: 42}), 82);
      assert.strictEqual(fn({x: 0}), 0);
      assert.strictEqual(fn({}), 0);
    });
  });

  describe('function calls', function() {
    it('should be parsed to helper call', function() {
      const code = parse('myFunc(varA)');
      assert.strictEqual(code, `helper.call("myFunc", [helper.val("varA")(ctx)])(ctx)`);
    });

    it('should parse and evaluate', function() {
      const fn = compile('myFunc(varA)');
      assert.strictEqual(fn({myFunc: x => x * 2, varA: 21}), 42);
    });

    it('should allow whitespace after identifier', function() {
      const fn = compile('myFunc (varA)');
      assert.strictEqual(fn({myFunc: x => x * 2, varA: 21}), 42);
    });

    it('should support empty arguments', function() {
      const fn = compile('myFunc()');
      assert.strictEqual(fn({myFunc: () => 42}), 42);
    });

    it('should support multiple arguments', function() {
      const fn = compile('myFunc(2, 3)');
      assert.strictEqual(fn({myFunc: (x, y) => x * y}), 6);
    });

    it('should support many arguments', function() {
      const fn = compile('myFunc(1, 2, 3, 4)');
      assert.deepEqual(fn({myFunc: (...args) => args}), [1, 2, 3, 4]);
    });

    describe('on property access', function() {
      it('should be parsed to helper call', function() {
        const code = parse('myObj.myFunc(varA)');
        assert.strictEqual(code, `helper.call("myFunc", [helper.val("varA")(ctx)])(helper.val("myObj")(ctx))`);
      });
    });

    describe('on offset access with property access', function() {
      it('should be parsed to helper call', function() {
        const code = parse('myObj["x"].myFunc(varA).foo');
        assert.strictEqual(code, `helper.val("foo")(helper.call("myFunc", [helper.val("varA")(ctx)])(helper.val("x")(helper.val("myObj")(ctx))))`);
      });

      it('should parse and evaluate', function() {
        const fn = compile('myObj["x"].myFunc(varA).foo');
        assert.strictEqual(fn({myObj: {x: { myFunc: x => ({foo: x*2})}}, varA: 21}), 42);
      });
    });
  });
});

