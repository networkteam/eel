// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["disjunction"], "postprocess": d => d[0]},
    {"name": "parens", "symbols": [{"literal":"("}, "_", "disjunction", "_", {"literal":")"}], "postprocess": d => '(' + d[2] + ')'},
    {"name": "parens", "symbols": ["atom"], "postprocess": d => d[0]},
    {"name": "disjunction$string$1", "symbols": [{"literal":"|"}, {"literal":"|"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "disjunction", "symbols": ["disjunction", "_", "disjunction$string$1", "_", "conjunction"], "postprocess": d => d[0] + '||' + d[4]},
    {"name": "disjunction", "symbols": ["conjunction"], "postprocess": d => d[0]},
    {"name": "conjunction$string$1", "symbols": [{"literal":"&"}, {"literal":"&"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "conjunction", "symbols": ["conjunction", "_", "conjunction$string$1", "_", "negation"], "postprocess": d => d[0] + '&&' + d[4]},
    {"name": "conjunction", "symbols": ["negation"], "postprocess": d => d[0]},
    {"name": "negation", "symbols": [{"literal":"!"}, "_", "parens"], "postprocess": d => '!' + d[2]},
    {"name": "negation", "symbols": ["parens"], "postprocess": d => d[0]},
    {"name": "atom", "symbols": ["IDENTIFIER"], "postprocess": d => d[0]},
    {"name": "atom", "symbols": ["NUMBER"], "postprocess": d => d[0]},
    {"name": "IDENTIFIER$ebnf$1", "symbols": []},
    {"name": "IDENTIFIER$ebnf$1", "symbols": ["IDENTIFIER$ebnf$1", /[a-zA-Z_0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "IDENTIFIER", "symbols": [/[a-zA-Z_]/, "IDENTIFIER$ebnf$1"], "postprocess": d => 'ctx.' + d[0] + d[1].join('')},
    {"name": "NUMBER$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "NUMBER$ebnf$1", "symbols": ["NUMBER$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "NUMBER", "symbols": ["NUMBER$ebnf$1"], "postprocess": d => parseInt(d[0].join(''), 10)},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": d => null}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
