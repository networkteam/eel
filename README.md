# @networkteam/eel

**Embedded expression language, a parser and compiler for a safe subset of JavaScript for dynamic evaluation in JavaScript.**

## Features

* Safe evaluation of JS expressions:
  * `!a || (b && c)`
  * `number == 42`
  * `foo.bar.baz`
  * `foo["bar"].baz`
  * `myFn(1, 2, 3)`
  * `myObj.method(arg1).prop`
* Compiles expressions from strings to plain JS functions
* Safe to use with user generated expressions (e.g. as a filter language)
* Use in the browser or with Node.js

## Installation

    yarn add @networkteam/eel

or

    npm install --save @networkteam/eel

## Usage

```
import { compile } from '@networkteam/eel`

const expr = compile('myVar');

const result = expr({myVar: 'a', 'otherVar': b});

// result === 'a'
```

Ideally, the expression should be pre-compiled. The generated function
can be used with different context values to evaluate the result.

## Reference

**compile(expression)**

`expression`: string

Compiles the given expression and returns a function that receives
the current context for evaluation. The context must be an object that
contains all defined variables as properties.

## Licence

MIT
