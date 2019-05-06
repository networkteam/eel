expression -> conditional {% d => d[0] %}

# TODO Check if associativness of ternary is correct
conditional -> disjunction _ "?" _ expression _ ":" _ expression  {% d => d[0] + "?" + d[4] + ":" + d[8] %}
             | disjunction

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

atom -> IDENTIFIER {% d => d[0] %}
      | NUMBER {% d => d[0] %}
      | dqstring  {% d => d[0] %}
      | sqstring  {% d => d[0] %}

IDENTIFIER -> [a-zA-Z_] [a-zA-Z_0-9]:* {% d => 'ctx.' + d[0] + d[1].join('') %}
NUMBER -> "-":? [0-9]:+ {% d => parseInt((d[0] || '') + d[1].join(''), 10) %}

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
