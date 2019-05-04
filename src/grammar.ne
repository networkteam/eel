main -> disjunction {% d => d[0] %}

parens -> "(" _ disjunction _ ")" {% d => '(' + d[2] + ')' %}
        | atom {% d => d[0] %}

disjunction -> disjunction _ "||" _ conjunction {% d => d[0] + '||' + d[4] %}
             | conjunction {% d => d[0] %}

conjunction -> conjunction _ "&&" _ negation {% d => d[0] + '&&' + d[4] %}
             | negation {% d => d[0] %}

negation -> "!" _ parens {% d => '!' + d[2] %}
          | parens {% d => d[0] %}

atom -> IDENTIFIER {% d => d[0] %}
      | NUMBER {% d => d[0] %}

IDENTIFIER -> [a-zA-Z_] [a-zA-Z_0-9]:* {% d => 'ctx.' + d[0] + d[1].join('') %}
NUMBER -> [0-9]:+ {% d => parseInt(d[0].join(''), 10) %}

_ -> [\s]:* {% d => null %}
