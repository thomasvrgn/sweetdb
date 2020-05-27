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
                    this.code.push(i.value.slice(0, i.value.length - 1) + ' {');
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
            console.log(_this.code.join('\n'));
        });
    };
    return Parser;
}());
export default Parser;
