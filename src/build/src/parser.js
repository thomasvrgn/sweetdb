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
        this.output = [];
        this.types = [];
    }
    Parser.prototype.readAST = function (tree) {
        for (var _i = 0, tree_1 = tree; _i < tree_1.length; _i++) {
            var i = tree_1[_i];
            if (i.value.trim().endsWith(':')) {
                if (i.children) {
                    if (i.children.length > 0) {
                        this.code.push(i.value + ' {');
                        this.readAST(i.children);
                        this.code.push('}');
                    }
                    else {
                        console.log('EMPTY CHILDREN');
                    }
                }
                else {
                    console.log('Null Error at line', (this.code.length + 1).toString());
                    console.log('Children cannot be empty.');
                    console.log(i.value);
                    console.log(new Array(i.value.length).fill('^').join(''));
                }
            }
            else {
                this.code.push(i.value);
            }
        }
    };
    Parser.prototype.parse = function (callback) {
        var _this = this;
        new Promise(function (resolve, reject) {
            new Reader(_this.file).read(function (error, content) {
                if (error)
                    throw error;
                content = content.split(/\r?\n/g).filter(function (x) { return x !== ''; }).join('\n');
                var AST = Tabdown.parse(content);
                _this.readAST(AST.children);
                var parent_type;
                _this.output.push('module.exports = {');
                for (var index in _this.code) {
                    var line = _this.code[index].trim();
                    if (line.endsWith('{')) {
                        parent_type = undefined;
                        var tokens = [
                            'scheme',
                            'schema',
                            'type',
                            'group'
                        ];
                        for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                            var token = tokens_1[_i];
                            if (line.startsWith(token)) {
                                var name_1 = token + '::' + line.substr(token.length, line.length).trim().match(/.*?(?=:)/)[0].replace(/\s/g, '_');
                                line = '"' + name_1.toLowerCase() + '": {';
                                parent_type = token;
                            }
                        }
                        if (!parent_type) {
                            console.log('Syntax error at line', index);
                            console.log('Unexpected parent element:', line.split(' ')[0]);
                            console.log(line.split('{').join('').trim());
                            var error_1 = new Array(line.split('{').join('').trim().length).fill(' ');
                            error_1.splice(line.indexOf(line.split(' ')[0]), line.split(' ')[0].length, ['^', '^', '^', '^']);
                            console.log(error_1.flat().join(''));
                        }
                    }
                    if (line.includes('#'))
                        line = line.replace('#', '//');
                    if (line.includes('<-'))
                        line = line.replace('<-', '/*');
                    if (line.includes('->'))
                        line = line.replace('->', '*/');
                    if (line.startsWith('-')) {
                        var line_formatted = line.slice(1, line.length).trim();
                        if (line_formatted.includes('=>')) {
                            var line_splitted = line_formatted.split('=>'), property = line_splitted[0].trim(), value = Number(line_splitted[1].trim()) ? parseInt(line_splitted[1].trim()) : line_splitted[1].trim().split('//')[0].split('/*')[0].trim();
                            line = line.replace('=>', ':').replace(property, '"' + property + '"').slice(1);
                            switch (property) {
                                case 'regex': {
                                    line = line.replace(value, '/' + value + '/');
                                    break;
                                }
                                default: {
                                    line = line.replace(value, '"' + value + '"');
                                    break;
                                }
                            }
                        }
                        else {
                            var property = line_formatted.trim();
                            line = '"' + property + '": "String"';
                        }
                        if (_this.code[parseInt(index) + 1].trim() !== '}') {
                            if (line.includes('//')) {
                                var comment = line.slice(line.indexOf('//'));
                                var first = line.slice(0, line.indexOf('//')).trim();
                                line = first.trim() + ',' + comment;
                            }
                            else {
                                line += ',';
                            }
                        }
                    }
                    if (line.startsWith('}')) {
                        if (_this.code[parseInt(index) + 1]) {
                            if (_this.code[parseInt(index) + 1].trim() !== '}' && !_this.code[parseInt(index) + 1].trim().startsWith('#') && !_this.code[parseInt(index) + 1].trim().startsWith('<-')) {
                                line += ',';
                            }
                        }
                    }
                    _this.output.push(line);
                }
                _this.output.push('}');
                resolve(_this.output);
            });
        }).then(function (code) {
            callback(code);
        });
    };
    return Parser;
}());
export default Parser;
