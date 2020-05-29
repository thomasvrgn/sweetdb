/*/
 *
 *  SweetDB
 *   Ness
 *
/*/
import Parser from './src/parser';
import Beautify from 'js-beautify';
import * as Terser from 'terser';
new Parser('tests/db').parse(function (code) {
    console.log(Beautify(code.join('\n')));
    console.log(Terser.minify(code.join('\n')).code);
});
