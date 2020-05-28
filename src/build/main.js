/*/
 *
 *  SweetDB
 *   Ness
 *
/*/
import Parser from './src/parser';
import Beautify from 'js-beautify';
new Parser('tests/db').parse(function (code) { return console.log(Beautify(code.join('\n'))); });
