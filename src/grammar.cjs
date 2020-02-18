// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "expression", "symbols": ["conditional"], "postprocess": d => d[0]},
    {"name": "conditional", "symbols": ["disjunction", "_", {"literal":"?"}, "_", "expression", "_", {"literal":":"}, "_", "expression"], "postprocess": d => d[0] + "?" + d[4] + ":" + d[8]},
    {"name": "conditional", "symbols": ["disjunction"], "postprocess": d => d[0]},
    {"name": "parens", "symbols": [{"literal":"("}, "_", "expression", "_", {"literal":")"}], "postprocess": d => '(' + d[2] + ')'},
    {"name": "parens", "symbols": ["atom"], "postprocess": d => d[0]},
    {"name": "disjunction$string$1", "symbols": [{"literal":"|"}, {"literal":"|"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "disjunction", "symbols": ["disjunction", "_", "disjunction$string$1", "_", "conjunction"], "postprocess": d => d[0] + '||' + d[4]},
    {"name": "disjunction", "symbols": ["conjunction"], "postprocess": d => d[0]},
    {"name": "conjunction$string$1", "symbols": [{"literal":"&"}, {"literal":"&"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "conjunction", "symbols": ["conjunction", "_", "conjunction$string$1", "_", "comparison"], "postprocess": d => d[0] + '&&' + d[4]},
    {"name": "conjunction", "symbols": ["comparison"], "postprocess": d => d[0]},
    {"name": "comparison", "symbols": ["comparison", "_", "COMPARISON_OP", "_", "sumcalc"], "postprocess": d => d[0] + d[2] + d[4]},
    {"name": "comparison", "symbols": ["sumcalc"], "postprocess": d => d[0]},
    {"name": "sumcalc", "symbols": ["sumcalc", "_", "SUM_OP", "_", "prodcalc"], "postprocess": d => d[0] + d[2] + d[4]},
    {"name": "sumcalc", "symbols": ["prodcalc"], "postprocess": d => d[0]},
    {"name": "prodcalc", "symbols": ["prodcalc", "_", "PROD_OP", "_", "negation"], "postprocess": d => d[0] + d[2] + d[4]},
    {"name": "prodcalc", "symbols": ["negation"], "postprocess": d => d[0]},
    {"name": "negation", "symbols": [{"literal":"!"}, "_", "negation"], "postprocess": d => '!' + d[2]},
    {"name": "negation", "symbols": ["parens"], "postprocess": d => d[0]},
    {"name": "offsetaccess", "symbols": [{"literal":"["}, "_", "expression", "_", {"literal":"]"}], "postprocess": d => 'helper.val(' + d[2] + ')'},
    {"name": "methodcall$ebnf$1", "symbols": ["expression"], "postprocess": id},
    {"name": "methodcall$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "methodcall$ebnf$2", "symbols": []},
    {"name": "methodcall$ebnf$2$subexpression$1", "symbols": [{"literal":","}, "_", "expression"]},
    {"name": "methodcall$ebnf$2", "symbols": ["methodcall$ebnf$2", "methodcall$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "methodcall", "symbols": ["IDENTIFIER", "_", {"literal":"("}, "_", "methodcall$ebnf$1", "_", "methodcall$ebnf$2", "_", {"literal":")"}], "postprocess": 
        d => {
          // TODO Quote method identifier
          return 'helper.call("' + d[0] + '", [' + (d[4] ? [d[4], ...d[6].map(dd => dd[2])].join(',') : '') + '])'
        }
        },
    {"name": "objectpath$ebnf$1", "symbols": []},
    {"name": "objectpath$ebnf$1$subexpression$1", "symbols": ["nested_methodcall_or_identifier"]},
    {"name": "objectpath$ebnf$1$subexpression$1", "symbols": ["offsetaccess"]},
    {"name": "objectpath$ebnf$1", "symbols": ["objectpath$ebnf$1", "objectpath$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "objectpath", "symbols": ["methodcall_or_identifier", "objectpath$ebnf$1"], "postprocess": 
        d => {
          let s = d[0] + "(ctx)";
          for (const part of d[1]) {
              s = part[0] + "(" + s + ")";
          }
          return s;
        }
        },
    {"name": "nested_methodcall_or_identifier", "symbols": [{"literal":"."}, "methodcall_or_identifier"], "postprocess": d => d[1]},
    {"name": "methodcall_or_identifier", "symbols": ["methodcall"], "postprocess": d => d[0]},
    {"name": "methodcall_or_identifier", "symbols": ["identifier"], "postprocess": d => d[0]},
    {"name": "identifier", "symbols": ["IDENTIFIER"], "postprocess": d => 'helper.val("' + d[0] + '")'},
    {"name": "atom", "symbols": ["objectpath"], "postprocess": d => d[0]},
    {"name": "atom", "symbols": ["NUMBER"], "postprocess": d => d[0]},
    {"name": "atom", "symbols": ["dqstring"], "postprocess": d => d[0]},
    {"name": "atom", "symbols": ["sqstring"], "postprocess": d => d[0]},
    {"name": "IDENTIFIER$ebnf$1", "symbols": []},
    {"name": "IDENTIFIER$ebnf$1", "symbols": ["IDENTIFIER$ebnf$1", /[a-zA-Z_0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "IDENTIFIER", "symbols": [/[a-zA-Z_]/, "IDENTIFIER$ebnf$1"], "postprocess": d => d[0] + d[1].join('')},
    {"name": "NUMBER$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "NUMBER$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "NUMBER$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "NUMBER$ebnf$2", "symbols": ["NUMBER$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "NUMBER", "symbols": ["NUMBER$ebnf$1", "NUMBER$ebnf$2"], "postprocess": d => (d[0] || '') + d[1].join('')},
    {"name": "COMPARISON_OP$string$1", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARISON_OP", "symbols": ["COMPARISON_OP$string$1"], "postprocess": d => d[0]},
    {"name": "COMPARISON_OP$string$2", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARISON_OP", "symbols": ["COMPARISON_OP$string$2"], "postprocess": d => d[0]},
    {"name": "COMPARISON_OP$string$3", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARISON_OP", "symbols": ["COMPARISON_OP$string$3"], "postprocess": d => d[0]},
    {"name": "COMPARISON_OP$string$4", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARISON_OP", "symbols": ["COMPARISON_OP$string$4"], "postprocess": d => d[0]},
    {"name": "COMPARISON_OP", "symbols": [{"literal":"<"}], "postprocess": d => d[0]},
    {"name": "COMPARISON_OP", "symbols": [{"literal":">"}], "postprocess": d => d[0]},
    {"name": "SUM_OP", "symbols": [{"literal":"+"}], "postprocess": d => d[0]},
    {"name": "SUM_OP", "symbols": [{"literal":"-"}], "postprocess": d => d[0]},
    {"name": "PROD_OP", "symbols": [{"literal":"*"}], "postprocess": d => d[0]},
    {"name": "PROD_OP", "symbols": [{"literal":"/"}], "postprocess": d => d[0]},
    {"name": "PROD_OP", "symbols": [{"literal":"%"}], "postprocess": d => d[0]},
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": d => '"' + d[1].join('') + '"'},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": d => d.join('')},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": d => "'" + d[1].join('') + "'"},
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": d => d.join('')},
    {"name": "strescape", "symbols": [/["'\\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": d => d.join('')},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": d => null}
]
  , ParserStart: "expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
