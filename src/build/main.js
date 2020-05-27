/*/
 *
 *  SweetDB
 *   Ness
 *
/*/
import Parser from './src/parser';
new Parser('tests/type').parse(function (code) { return console.log(code); });
