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
            content = content.split(/\r?\n/g).join('\n');
            var AST = Tabdown.parse(content);
            _this.readAST(AST.children);
            _this.code.unshift('module.exports = {');
            _this.code.push('}');
            for (var index in _this.code) {
                var line = _this.code[index];
                var words = line.split(' ').filter(function (x) { return x !== ''; });
                var tokens = {
                    SCHEME: [
                        'scheme',
                        'schema'
                    ],
                    GROUP: 'group'
                };
                var group_name = void 0;
                if (line.endsWith('{')) {
                    for (var token in tokens) {
                        if (!Array.isArray(tokens[token]))
                            tokens[token] = [tokens[token]];
                        for (var _i = 0, _a = tokens[token]; _i < _a.length; _i++) {
                            var word = _a[_i];
                            if (line.match(new RegExp(word))) {
                                group_name = line.split(word).join('').trim().match(/.*?(?=:)/)[0];
                                line = '"' + group_name + '": {';
                            }
                        }
                    }
                }
                if (line.match(/#.*/)) {
                    line = line.replace('#', '//');
                }
                if (line.trim().startsWith('-')) {
                    line = line.slice(1, line.length).trim().split(/\/\/.*/).join('').trim();
                    if (line.includes('=>')) {
                        var splitted = line.split('=>'), name_1 = splitted[0].trim(), type = splitted[1].trim();
                        console.log(name_1, type);
                    }
                }
            }
        });
    };
    return Parser;
}());
export default Parser;
