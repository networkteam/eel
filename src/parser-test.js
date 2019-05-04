import compile from './compile.js';

const fn1 = compile('varA&&varB||!varC');

console.log(!!fn1({varA: true, varB: false, varC: true}));

const fn2 = compile('isActive && myInput');

console.log(!!fn2({isActive: true, myInput: 'x'}));
