/*/
 *
 *  SweetDB
 *   Ness
 *
/*/

import Reader       from './reader'
import * as Tabdown from 'tabdown-kfatehi'

export default class Parser {

    public code: Array<String> = []

    constructor (public file) {}

    public readAST (tree) {
        
        for (const i of tree) {
            
            if (i.value.trim().endsWith(':')) {
                if (i.children.length > 0) {
                    this.code.push(i.value.slice(0, i.value.length - 1) + ' {')
                    this.readAST(i.children)
                    this.code.push('}')
                } else {
                    this.code.push(i.value)
                }
            } else {
                this.code.push(i.value)
            }
            
        }
    }

    public parse () {

        new Reader(this.file).read((error: Error, content) => {

            if (error) throw error
            content = content.split(/\r?\n/g).join('\n')
            
            const AST = Tabdown.parse(content)

            this.readAST(AST.children)

            console.log(this.code.join('\n'))

        })

    }

}