/*/
 *
 *  SweetDB
 *   Ness
 *
/*/

import Reader       from './reader'
import * as Tabdown from 'tabdown-kfatehi'
import * as FS      from 'fs'
import * as PATH    from 'path'

export default class Parser {

    public code   : Array<String>  = []
    public types  : Object         = {}

    constructor (public file) {}


    public readAST (tree) {
        
        for (const i of tree) {
            
            if (i.value.trim().endsWith(':')) {
                if (i.children.length > 0) {
                    this.code.push(i.value + ' {')
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
            content = content.split(/\r?\n/g).filter(x => x !== '').join('\n')
            
            const AST = Tabdown.parse(content)

            this.readAST(AST.children)

            let parent_type: String

            for (const index in this.code) {
                let line = this.code[index].trim()

                if (line.endsWith('{')) {
                    const tokens = [
                        'scheme',
                        'schema',
                        'type',
                        'group'
                    ]
                    for (const token of tokens) {
                        if (line.startsWith(token)) {
                            const name  = line.substr(token.length, line.length).trim().match(/.*?(?=:)/)[0]
                            line        = '"' + name.toLowerCase() + '": {'
                            parent_type = token
                        }
                    }
                }

                if (line.startsWith('-')) {
                    if (this.code[parseInt(index) + 1].trim() !== '}') line += ','
                }

                if (line.startsWith('}')) {
                    if (this.code[parseInt(index) + 1]) {
                        if (this.code[parseInt(index) + 1].trim() !== '}') line += ','
                    }
                }

                console.log(line)
            }

        })

    }

}