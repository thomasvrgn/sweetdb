/*/
 *
 *  SweetDB
 *   Ness
 *
/*/
import Reader from './reader';
import * as Tabdown from 'tabdown-kfatehi';
var Parser = /** @class */ (function () {
    function Parser(file) {
        this.file = file;
        this.code = [];
        this.types = {};
    }
    Parser.prototype.readAST = function (tree) {
        for (var _i = 0, tree_1 = tree; _i < tree_1.length; _i++) {
            var i = tree_1[_i];
            if (i.value.trim().endsWith(':')) {
                if (i.children.length > 0) {
                    this.code.push(i.value + ' {');
                    this.readAST(i.children);
                    this.code.push('}');
                }
                else {
                    this.code.push(i.value);
                }
            }
            else {
                this.code.push(i.value);
            }
        }
    };
    Parser.prototype.parse = function () {
        var _this = this;
        new Reader(this.file).read(function (error, content) {
            if (error)
                throw error;
            content = content.split(/\r?\n/g).filter(function (x) { return x !== ''; }).join('\n');
            var AST = Tabdown.parse(content);
            _this.readAST(AST.children);
            var parent_type;
            for (var index in _this.code) {
                var line = _this.code[index].trim();
                if (line.endsWith('{')) {
                    var tokens = [
                        'scheme',
                        'schema',
                        'type',
                        'group'
                    ];
                    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                        var token = tokens_1[_i];
                        if (line.startsWith(token)) {
                            var name_1 = line.substr(token.length, line.length).trim().match(/.*?(?=:)/)[0];
                            line = '"' + name_1.toLowerCase() + '": {';
                            parent_type = token;
                        }
                    }
                }
                if (line.startsWith('-')) {
                    if (_this.code[parseInt(index) + 1].trim() !== '}')
                        line += ',';
                }
                if (line.startsWith('}')) {
                    if (_this.code[parseInt(index) + 1]) {
                        if (_this.code[parseInt(index) + 1].trim() !== '}')
                            line += ',';
                    }
                }
                console.log(line);
            }
        });
    };
    return Parser;
}());
export default Parser;
