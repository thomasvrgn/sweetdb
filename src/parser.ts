/*/
 *
 *  SweetDB
 *   Ness
 *
/*/

import Reader       from './reader'
import * as Tabdown from 'tabdown-kfatehi'
import { copyFile } from 'fs'

export default class Parser {

    public code: Array<String> = []

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
            content = content.split(/\r?\n/g).join('\n')
            
            const AST = Tabdown.parse(content)


            this.readAST(AST.children)

            this.code.unshift('module.exports = {')
            this.code.push('}')

            for (const index in this.code) {
                let   line   = this.code[index]
                const words  = line.split(' ').filter(x => x !== '')
                const tokens = {
                    SCHEME : [
                        'scheme',
                        'schema'
                    ],
                    GROUP  : 'group'
                }
                let group_name
                if (line.endsWith('{')) {
                    for (const token in tokens) {
                        if (!Array.isArray(tokens[token])) tokens[token] = [tokens[token]]
                        for (const word of tokens[token]) {
                            if (line.match(new RegExp(word))) {
                                group_name = line.split(word).join('').trim().match(/.*?(?=:)/)[0]
                                line = '"' + group_name + '": {'
                            }
                        }
                        
                    }
                }
                if (line.match(/#.*/)) {
                    line = line.replace('#', '//')
                }
                if (line.trim().startsWith('-')) {
                    line = line.slice(1, line.length).trim().split(/\/\/.*/).join('').trim()
                    if (line.includes('=>')) {
                        const splitted = line.split('=>'),
                              name     = splitted[0].trim(),
                              type     = splitted[1].trim()

                        console.log(name, type)
                    }
                }


            }

        })

    }

}