/*/
 *
 *  SweetDB
 *   Ness
 *
/*/

import Parser   from './src/parser'
import Beautify from 'js-beautify'

new Parser('tests/type').parse(code => console.log(Beautify(code.join('\n'))))