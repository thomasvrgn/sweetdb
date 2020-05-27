/*/
 *
 *  SweetDB
 *   Ness
 *
/*/
import * as FS from 'fs';
var Reader = /** @class */ (function () {
    function Reader(file) {
        this.file = file;
        this.file = file + '.sweet';
    }
    Reader.prototype.read = function (callback) {
        FS.readFile(this.file, 'UTF-8', function (error, content) {
            callback(error, content);
        });
    };
    return Reader;
}());
export default Reader;
