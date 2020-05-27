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
    public output : Array<String>  = []

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

            this.output.push('module.exports = {')

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
                    const line_formatted = line.slice(1, line.length).trim()

                    if (line_formatted.includes('=>')) {
                        const line_splitted  = line_formatted.split('=>'),
                              property       = line_splitted[0].trim(),
                              value: any     = Number(line_splitted[1].trim()) ? parseInt(line_splitted[1].trim()) : line_splitted[1].trim()
                              line           = line.replace('=>', ':').replace(property, '"' + property + '"').slice(1)
                        switch (property) {

                            case 'regex': {
                                line = line.replace(value, '/' + value + '/')
                                break
                            }

                        }
                              
                    } else {
                        const property       = line_formatted.trim()
                    }
                    if (this.code[parseInt(index) + 1].trim() !== '}') line += ','
                }

                if (line.startsWith('}')) {
                    if (this.code[parseInt(index) + 1]) {
                        if (this.code[parseInt(index) + 1].trim() !== '}') line += ','
                    }
                }
                this.output.push(line)
            }
            this.output.push('}')
            console.log(this.output.join('\n'))
        })

    }

}