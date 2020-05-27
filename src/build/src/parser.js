/*/
 *
 *  SweetDB
 *   Ness
 *
/*/
import Reader from './reader';
import * as Tabdown from 'tabdown-kfatehi';
import * as FS from 'fs';
import * as PATH from 'path';
var Parser = /** @class */ (function () {
    function Parser(file) {
        this.file = file;
        this.code = [];
        this.tokens = {};
        this.types = {};
    }
    Parser.prototype.readTokens = function () {
        var _this = this;
        FS.exists(PATH.resolve(PATH.join('src', 'libs', 'tokens')), function (bool) {
            if (bool) {
                FS.readdir(PATH.resolve(PATH.join('src', 'libs', 'tokens')), function (error, content) {
                    if (error)
                        throw error;
                    for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
                        var file = content_1[_i];
                        var tkns_import = require('./libs/tokens/' + file.replace('.ts', '')).default;
                        for (var token in tkns_import) {
                            _this.tokens[token] = tkns_import[token];
                        }
                    }
                });
            }
        });
    };
    Parser.prototype.readTypes = function () {
        var _this = this;
        FS.exists(PATH.resolve(PATH.join('src', 'libs', 'types')), function (bool) {
            if (bool) {
                FS.readdir(PATH.resolve(PATH.join('src', 'libs', 'types')), function (error, content) {
                    if (error)
                        throw error;
                    for (var _i = 0, content_2 = content; _i < content_2.length; _i++) {
                        var file = content_2[_i];
                        var type_import = require('./libs/types/' + file.replace('.ts', '')).default;
                        for (var type in type_import) {
                            _this.types[type] = type_import[type];
                        }
                    }
                });
            }
        });
    };
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
        this.readTokens();
        this.readTypes();
        new Reader(this.file).read(function (error, content) {
            if (error)
                throw error;
            content = content.split(/\r?\n/g).join('\n');
            var AST = Tabdown.parse(content);
            _this.readAST(AST.children);
            for (var index in _this.code) {
                var line = _this.code[index];
                var words = line.split(' ').filter(function (x) { return x !== ''; });
                var group_name = void 0;
                if (line.endsWith('{')) {
                    for (var token in _this.tokens) {
                        if (!Array.isArray(_this.tokens[token]))
                            _this.tokens[token] = [_this.tokens[token]];
                        for (var _i = 0, _a = _this.tokens[token]; _i < _a.length; _i++) {
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
                        for (var type_import in _this.types) {
                            if (type_import.toLowerCase() === type.toLowerCase()) {
                                line = line.replace(type, _this.types[type_import]);
                            }
                        }
                        line = line.replace('=>', ':');
                    }
                    else {
                        line += ': /.*/';
                    }
                    line += ',';
                }
                if (line.trim() === '}')
                    line += ',';
                line = line.split(' ').filter(function (x) { return x !== ''; }).join(' ');
            }
        });
    };
    return Parser;
}());
export default Parser;
