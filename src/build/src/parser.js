/*/
 *
 *  SweetDB
 *   Ness
 *
/*/
import Reader from './reader';
var Parser = /** @class */ (function () {
    function Parser(file) {
        this.file = file;
        this.file = file;
    }
    Parser.prototype.parse = function () {
        new Reader(this.file).read(function (error, content) {
            if (error)
                throw error;
            console.log(content);
        });
    };
    return Parser;
}());
export default Parser;
