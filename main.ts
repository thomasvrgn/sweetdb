/*/
 *
 *  SweetDB
 *   Ness
 *
/*/

import Parser   from './src/parser'
import Beautify from 'js-beautify'

new Parser('tests/db').parse(code => console.log(Beautify(code.join('\n'))))