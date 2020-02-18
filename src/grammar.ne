expression -> conditional {% d => d[0] %}

# TODO Check if associativness of ternary is correct
conditional -> disjunction _ "?" _ expression _ ":" _ expression {% d => d[0] + "?" + d[4] + ":" + d[8] %}
             | disjunction {% d => d[0] %}

parens -> "(" _ expression _ ")" {% d => '(' + d[2] + ')' %}
        | atom {% d => d[0] %}

disjunction -> disjunction _ "||" _ conjunction {% d => d[0] + '||' + d[4] %}
             | conjunction {% d => d[0] %}

conjunction -> conjunction _ "&&" _ comparison {% d => d[0] + '&&' + d[4] %}
             | comparison {% d => d[0] %}

comparison -> comparison _ COMPARISON_OP _ sumcalc {% d => d[0] + d[2] + d[4] %}
            | sumcalc {% d => d[0] %}

sumcalc -> sumcalc _ SUM_OP _ prodcalc {% d => d[0] + d[2] + d[4] %}
         | prodcalc {% d => d[0] %}

prodcalc -> prodcalc _ PROD_OP _ negation {% d => d[0] + d[2] + d[4] %}
          | negation {% d => d[0] %}

negation -> "!" _ negation {% d => '!' + d[2] %}
          | parens {% d => d[0] %}

offsetaccess -> "[" _ expression _ "]" {% d => 'helper.val(' + d[2] + ')' %}

# helper.call("identifier", [ex1, ex2])
methodcall -> IDENTIFIER _ "(" _ expression:? _ ("," _ expression):* _ ")" {%
  d => {
    // TODO Quote method identifier
    return 'helper.call("' + d[0] + '", [' + (d[4] ? [d[4], ...d[6].map(dd => dd[2])].join(',') : '') + '])'
  }
%}

# 1. Methodcall
#   helper.call("identifier", [ex1, ex2])(ctx)
# 2. Identifier
#   helper.val("identifier")(ctx)
# 3. Methodcall + Identifier
#   helper.val("identifier2")(helper.call("identifier1", [ex1, ex2])(ctx))
# 3. Methodcall + Identifier + Offsetaccess
#   helper.val("identifier2")(helper.call("identifier1", [ex1, ex2])(ctx))
# 2. Identifier + Identifier
#   helper.val("identifier2")(helper.val("identifier1")(ctx))
objectpath -> methodcall_or_identifier (nested_methodcall_or_identifier | offsetaccess):* {%
  d => {
    let s = d[0] + "(ctx)";
    for (const part of d[1]) {
        s = part[0] + "(" + s + ")";
    }
    return s;
  }
%}

nested_methodcall_or_identifier -> "." methodcall_or_identifier {% d => d[1] %}

methodcall_or_identifier -> methodcall {% d => d[0] %}
                          | identifier {% d => d[0] %}

# TODO Quote identifier in string!
identifier -> IDENTIFIER {% d => 'helper.val("' + d[0] + '")' %}

atom -> objectpath {% d => d[0] %}
      | NUMBER {% d => d[0] %}
      | dqstring  {% d => d[0] %}
      | sqstring  {% d => d[0] %}

IDENTIFIER -> [a-zA-Z_] [a-zA-Z_0-9]:* {% d => d[0] + d[1].join('') %}
NUMBER -> "-":? [0-9]:+ {% d => (d[0] || '') + d[1].join('') %}

COMPARISON_OP -> "==" {% d => d[0] %}
               | "!=" {% d => d[0] %}
               | "<=" {% d => d[0] %}
               | ">=" {% d => d[0] %}
               | "<" {% d => d[0] %}
               | ">" {% d => d[0] %}

SUM_OP -> "+" {% d => d[0] %}
        | "-" {% d => d[0] %}

PROD_OP -> "*" {% d => d[0] %}
         | "/" {% d => d[0] %}
         | "%" {% d => d[0] %}

dqstring -> "\"" dstrchar:* "\"" {% d => '"' + d[1].join('') + '"' %}
dstrchar -> [^\\"\n] {% id %}
          | "\\" strescape {% d => d.join('') %}

sqstring -> "'" sstrchar:* "'" {% d => "'" + d[1].join('') + "'" %}
sstrchar -> [^\\'\n] {% id %}
          | "\\" strescape {% d => d.join('') %}

strescape -> ["'\\/bfnrt] {% id %}
    | "u" [a-fA-F0-9] [a-fA-F0-9] [a-fA-F0-9] [a-fA-F0-9] {% d => d.join('') %}

_ -> [\s]:* {% d => null %}
