!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.networkteamEel=e():t.networkteamEel=e()}(global,(function(){return function(t){var e={};function n(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(s,r,function(e){return t[e]}.bind(null,r));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){var s,r;s=this,r=function(){function t(e,n,s){return this.id=++t.highestId,this.name=e,this.symbols=n,this.postprocess=s,this}function e(t,e,n,s){this.rule=t,this.dot=e,this.reference=n,this.data=[],this.wantedBy=s,this.isComplete=this.dot===t.symbols.length}function n(t,e){this.grammar=t,this.index=e,this.states=[],this.wants={},this.scannable=[],this.completed={}}function s(t,e){this.rules=t,this.start=e||this.rules[0].name;var n=this.byName={};this.rules.forEach((function(t){n.hasOwnProperty(t.name)||(n[t.name]=[]),n[t.name].push(t)}))}function r(){this.reset("")}function o(t,e,o){if(t instanceof s){var i=t;o=e}else i=s.fromCompiled(t,e);for(var a in this.grammar=i,this.options={keepHistory:!1,lexer:i.lexer||new r},o||{})this.options[a]=o[a];this.lexer=this.options.lexer,this.lexerState=void 0;var c=new n(i,0);this.table=[c],c.wants[i.start]=[],c.predict(i.start),c.process(),this.current=0}return t.highestId=0,t.prototype.toString=function(t){function e(t){return t.literal?JSON.stringify(t.literal):t.type?"%"+t.type:t.toString()}var n=void 0===t?this.symbols.map(e).join(" "):this.symbols.slice(0,t).map(e).join(" ")+" ● "+this.symbols.slice(t).map(e).join(" ");return this.name+" → "+n},e.prototype.toString=function(){return"{"+this.rule.toString(this.dot)+"}, from: "+(this.reference||0)},e.prototype.nextState=function(t){var n=new e(this.rule,this.dot+1,this.reference,this.wantedBy);return n.left=this,n.right=t,n.isComplete&&(n.data=n.build()),n},e.prototype.build=function(){var t=[],e=this;do{t.push(e.right.data),e=e.left}while(e.left);return t.reverse(),t},e.prototype.finish=function(){this.rule.postprocess&&(this.data=this.rule.postprocess(this.data,this.reference,o.fail))},n.prototype.process=function(t){for(var e=this.states,n=this.wants,s=this.completed,r=0;r<e.length;r++){var i=e[r];if(i.isComplete){if(i.finish(),i.data!==o.fail){for(var a=i.wantedBy,c=a.length;c--;){var l=a[c];this.complete(l,i)}if(i.reference===this.index){var u=i.rule.name;(this.completed[u]=this.completed[u]||[]).push(i)}}}else{if("string"!=typeof(u=i.rule.symbols[i.dot])){this.scannable.push(i);continue}if(n[u]){if(n[u].push(i),s.hasOwnProperty(u)){var p=s[u];for(c=0;c<p.length;c++){var f=p[c];this.complete(i,f)}}}else n[u]=[i],this.predict(u)}}},n.prototype.predict=function(t){for(var n=this.grammar.byName[t]||[],s=0;s<n.length;s++){var r=n[s],o=this.wants[t],i=new e(r,0,this.index,o);this.states.push(i)}},n.prototype.complete=function(t,e){var n=t.nextState(e);this.states.push(n)},s.fromCompiled=function(e,n){var r=e.Lexer;e.ParserStart&&(n=e.ParserStart,e=e.ParserRules);var o=new s(e=e.map((function(e){return new t(e.name,e.symbols,e.postprocess)})),n);return o.lexer=r,o},r.prototype.reset=function(t,e){this.buffer=t,this.index=0,this.line=e?e.line:1,this.lastLineBreak=e?-e.col:0},r.prototype.next=function(){if(this.index<this.buffer.length){var t=this.buffer[this.index++];return"\n"===t&&(this.line+=1,this.lastLineBreak=this.index),{value:t}}},r.prototype.save=function(){return{line:this.line,col:this.index-this.lastLineBreak}},r.prototype.formatError=function(t,e){var n=this.buffer;if("string"==typeof n){var s=n.indexOf("\n",this.index);-1===s&&(s=n.length);var r=n.substring(this.lastLineBreak,s),o=this.index-this.lastLineBreak;return e+=" at line "+this.line+" col "+o+":\n\n",e+="  "+r+"\n",e+="  "+Array(o).join(" ")+"^"}return e+" at index "+(this.index-1)},o.fail={},o.prototype.feed=function(t){var e,s=this.lexer;for(s.reset(t,this.lexerState);e=s.next();){var o=this.table[this.current];this.options.keepHistory||delete this.table[this.current-1];var i=this.current+1,a=new n(this.grammar,i);this.table.push(a);for(var c=void 0!==e.text?e.text:e.value,l=s.constructor===r?e.value:e,u=o.scannable,p=u.length;p--;){var f=u[p],m=f.rule.symbols[f.dot];if(m.test?m.test(l):m.type?m.type===e.type:m.literal===c){var h=f.nextState({data:l,token:e,isToken:!0,reference:i-1});a.states.push(h)}}if(a.process(),0===a.states.length){var b=new Error(this.reportError(e));throw b.offset=this.current,b.token=e,b}this.options.keepHistory&&(o.lexerState=s.save()),this.current++}return o&&(this.lexerState=s.save()),this.results=this.finish(),this},o.prototype.reportError=function(t){var e=[],n=(t.type?t.type+" token: ":"")+JSON.stringify(void 0!==t.value?t.value:t);e.push(this.lexer.formatError(t,"Syntax error")),e.push("Unexpected "+n+". Instead, I was expecting to see one of the following:\n");var s=this.table.length-2;return this.table[s].states.filter((function(t){var e=t.rule.symbols[t.dot];return e&&"string"!=typeof e})).map((function(t){return this.buildStateStacks(t,[])[0]}),this).forEach((function(t){var n=t[0],s=n.rule.symbols[n.dot],r=this.getSymbolDisplay(s);e.push("A "+r+" based on:"),this.displayStateStack(t,e)}),this),e.push(""),e.join("\n")},o.prototype.displayStateStack=function(t,e){for(var n,s=0,r=0;r<t.length;r++){var o=t[r],i=o.rule.toString(o.dot);i===n?s++:(s>0&&e.push("    ⬆ ︎"+s+" more lines identical to this"),s=0,e.push("    "+i)),n=i}},o.prototype.getSymbolDisplay=function(t){var e=typeof t;if("string"===e)return t;if("object"===e&&t.literal)return JSON.stringify(t.literal);if("object"===e&&t instanceof RegExp)return"character matching "+t;if("object"===e&&t.type)return t.type+" token";throw new Error("Unknown symbol type: "+t)},o.prototype.buildStateStacks=function(t,e){if(-1!==e.indexOf(t))return[];if(0===t.wantedBy.length)return[[t]];var n=this;return t.wantedBy.reduce((function(s,r){return s.concat(n.buildStateStacks(r,[t].concat(e)).map((function(e){return[t].concat(e)})))}),[])},o.prototype.save=function(){var t=this.table[this.current];return t.lexerState=this.lexerState,t},o.prototype.restore=function(t){var e=t.index;this.current=e,this.table[e]=t,this.table.splice(e+1),this.lexerState=t.lexerState,this.results=this.finish()},o.prototype.rewind=function(t){if(!this.options.keepHistory)throw new Error("set option `keepHistory` to enable rewinding");this.restore(this.table[t])},o.prototype.finish=function(){var t=[],e=this.grammar.start;return this.table[this.table.length-1].states.forEach((function(n){n.rule.name===e&&n.dot===n.rule.symbols.length&&0===n.reference&&n.data!==o.fail&&t.push(n)})),t.map((function(t){return t.data}))},{Parser:o,Grammar:s,Rule:t}},t.exports?t.exports=r():s.nearley=r()},function(t,e,n){function s(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}!function(){function e(t){return t[0]}var n={Lexer:void 0,ParserRules:[{name:"expression",symbols:["conditional"],postprocess:function(t){return t[0]}},{name:"conditional",symbols:["disjunction","_",{literal:"?"},"_","expression","_",{literal:":"},"_","expression"],postprocess:function(t){return t[0]+"?"+t[4]+":"+t[8]}},{name:"conditional",symbols:["disjunction"]},{name:"parens",symbols:[{literal:"("},"_","expression","_",{literal:")"}],postprocess:function(t){return"("+t[2]+")"}},{name:"parens",symbols:["atom"],postprocess:function(t){return t[0]}},{name:"disjunction$string$1",symbols:[{literal:"|"},{literal:"|"}],postprocess:function(t){return t.join("")}},{name:"disjunction",symbols:["disjunction","_","disjunction$string$1","_","conjunction"],postprocess:function(t){return t[0]+"||"+t[4]}},{name:"disjunction",symbols:["conjunction"],postprocess:function(t){return t[0]}},{name:"conjunction$string$1",symbols:[{literal:"&"},{literal:"&"}],postprocess:function(t){return t.join("")}},{name:"conjunction",symbols:["conjunction","_","conjunction$string$1","_","comparison"],postprocess:function(t){return t[0]+"&&"+t[4]}},{name:"conjunction",symbols:["comparison"],postprocess:function(t){return t[0]}},{name:"comparison",symbols:["comparison","_","COMPARISON_OP","_","sumcalc"],postprocess:function(t){return t[0]+t[2]+t[4]}},{name:"comparison",symbols:["sumcalc"],postprocess:function(t){return t[0]}},{name:"sumcalc",symbols:["sumcalc","_","SUM_OP","_","prodcalc"],postprocess:function(t){return t[0]+t[2]+t[4]}},{name:"sumcalc",symbols:["prodcalc"],postprocess:function(t){return t[0]}},{name:"prodcalc",symbols:["prodcalc","_","PROD_OP","_","negation"],postprocess:function(t){return t[0]+t[2]+t[4]}},{name:"prodcalc",symbols:["negation"],postprocess:function(t){return t[0]}},{name:"negation",symbols:[{literal:"!"},"_","negation"],postprocess:function(t){return"!"+t[2]}},{name:"negation",symbols:["parens"],postprocess:function(t){return t[0]}},{name:"propaccessdot$ebnf$1",symbols:[]},{name:"propaccessdot$ebnf$1$subexpression$1",symbols:[{literal:"."},"IDENTIFIER"]},{name:"propaccessdot$ebnf$1",symbols:["propaccessdot$ebnf$1","propaccessdot$ebnf$1$subexpression$1"],postprocess:function(t){return t[0].concat([t[1]])}},{name:"propaccessdot",symbols:["IDENTIFIER","propaccessdot$ebnf$1"],postprocess:function(t){return t[1].length?'helper.getVal(ctx, "'+[t[0]].concat(s(t[1].map((function(t){return t[1]})))).join(".")+'")':"ctx."+t[0]}},{name:"atom",symbols:["propaccessdot"],postprocess:function(t){return t[0]}},{name:"atom",symbols:["NUMBER"],postprocess:function(t){return t[0]}},{name:"atom",symbols:["dqstring"],postprocess:function(t){return t[0]}},{name:"atom",symbols:["sqstring"],postprocess:function(t){return t[0]}},{name:"IDENTIFIER$ebnf$1",symbols:[]},{name:"IDENTIFIER$ebnf$1",symbols:["IDENTIFIER$ebnf$1",/[a-zA-Z_0-9]/],postprocess:function(t){return t[0].concat([t[1]])}},{name:"IDENTIFIER",symbols:[/[a-zA-Z_]/,"IDENTIFIER$ebnf$1"],postprocess:function(t){return t[0]+t[1].join("")}},{name:"NUMBER$ebnf$1",symbols:[{literal:"-"}],postprocess:e},{name:"NUMBER$ebnf$1",symbols:[],postprocess:function(t){return null}},{name:"NUMBER$ebnf$2",symbols:[/[0-9]/]},{name:"NUMBER$ebnf$2",symbols:["NUMBER$ebnf$2",/[0-9]/],postprocess:function(t){return t[0].concat([t[1]])}},{name:"NUMBER",symbols:["NUMBER$ebnf$1","NUMBER$ebnf$2"],postprocess:function(t){return parseInt((t[0]||"")+t[1].join(""),10)}},{name:"COMPARISON_OP$string$1",symbols:[{literal:"="},{literal:"="}],postprocess:function(t){return t.join("")}},{name:"COMPARISON_OP",symbols:["COMPARISON_OP$string$1"],postprocess:function(t){return t[0]}},{name:"COMPARISON_OP$string$2",symbols:[{literal:"!"},{literal:"="}],postprocess:function(t){return t.join("")}},{name:"COMPARISON_OP",symbols:["COMPARISON_OP$string$2"],postprocess:function(t){return t[0]}},{name:"COMPARISON_OP$string$3",symbols:[{literal:"<"},{literal:"="}],postprocess:function(t){return t.join("")}},{name:"COMPARISON_OP",symbols:["COMPARISON_OP$string$3"],postprocess:function(t){return t[0]}},{name:"COMPARISON_OP$string$4",symbols:[{literal:">"},{literal:"="}],postprocess:function(t){return t.join("")}},{name:"COMPARISON_OP",symbols:["COMPARISON_OP$string$4"],postprocess:function(t){return t[0]}},{name:"COMPARISON_OP",symbols:[{literal:"<"}],postprocess:function(t){return t[0]}},{name:"COMPARISON_OP",symbols:[{literal:">"}],postprocess:function(t){return t[0]}},{name:"SUM_OP",symbols:[{literal:"+"}],postprocess:function(t){return t[0]}},{name:"SUM_OP",symbols:[{literal:"-"}],postprocess:function(t){return t[0]}},{name:"PROD_OP",symbols:[{literal:"*"}],postprocess:function(t){return t[0]}},{name:"PROD_OP",symbols:[{literal:"/"}],postprocess:function(t){return t[0]}},{name:"PROD_OP",symbols:[{literal:"%"}],postprocess:function(t){return t[0]}},{name:"dqstring$ebnf$1",symbols:[]},{name:"dqstring$ebnf$1",symbols:["dqstring$ebnf$1","dstrchar"],postprocess:function(t){return t[0].concat([t[1]])}},{name:"dqstring",symbols:[{literal:'"'},"dqstring$ebnf$1",{literal:'"'}],postprocess:function(t){return'"'+t[1].join("")+'"'}},{name:"dstrchar",symbols:[/[^\\"\n]/],postprocess:e},{name:"dstrchar",symbols:[{literal:"\\"},"strescape"],postprocess:function(t){return t.join("")}},{name:"sqstring$ebnf$1",symbols:[]},{name:"sqstring$ebnf$1",symbols:["sqstring$ebnf$1","sstrchar"],postprocess:function(t){return t[0].concat([t[1]])}},{name:"sqstring",symbols:[{literal:"'"},"sqstring$ebnf$1",{literal:"'"}],postprocess:function(t){return"'"+t[1].join("")+"'"}},{name:"sstrchar",symbols:[/[^\\'\n]/],postprocess:e},{name:"sstrchar",symbols:[{literal:"\\"},"strescape"],postprocess:function(t){return t.join("")}},{name:"strescape",symbols:[/["'\\\/bfnrt]/],postprocess:e},{name:"strescape",symbols:[{literal:"u"},/[a-fA-F0-9]/,/[a-fA-F0-9]/,/[a-fA-F0-9]/,/[a-fA-F0-9]/],postprocess:function(t){return t.join("")}},{name:"_$ebnf$1",symbols:[]},{name:"_$ebnf$1",symbols:["_$ebnf$1",/[\s]/],postprocess:function(t){return t[0].concat([t[1]])}},{name:"_",symbols:["_$ebnf$1"],postprocess:function(t){return null}}],ParserStart:"expression"};void 0!==t.exports?t.exports=n:window.grammar=n}()},function(t,e,n){"use strict";n.r(e);var s=n(0),r=n.n(s),o=n(1),i=n.n(o),a=r.a.Grammar.fromCompiled(i.a),c={getVal:function(t,e){return e.split(".").reduce((function(t,e){return t&&t[e]}),t)}};function l(t){var e=new r.a.Parser(a);if(e.feed(t),!e.results||0===e.results.length)throw new Error("empty expression");var n="return ".concat(e.results[0],";"),s=new Function("helper","ctx",n);return function(t){return s(c,t)}}n.d(e,"compile",(function(){return l}))}])}));