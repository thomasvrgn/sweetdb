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
    public tokens : Object         = {}
    public types  : Object         = {}

    constructor (public file) {}

    public readTokens () {

        FS.exists(PATH.resolve(PATH.join('src', 'libs', 'tokens')), bool => {
            if (bool) {
                FS.readdir(PATH.resolve(PATH.join('src', 'libs', 'tokens')), (error, content) => {
                    if (error) throw error
                    for (const file of content) {
                        const tkns_import = require('./libs/tokens/' + file.replace('.ts', '')).default
                        for (const token in tkns_import) {
                            this.tokens[token] = tkns_import[token]
                        }
                    }
                })
            }
        })

    }

    public readTypes () {

        FS.exists(PATH.resolve(PATH.join('src', 'libs', 'types')), bool => {
            if (bool) {
                FS.readdir(PATH.resolve(PATH.join('src', 'libs', 'types')), (error, content) => {
                    if (error) throw error
                    for (const file of content) {
                        const type_import = require('./libs/types/' + file.replace('.ts', '')).default
                        for (const type in type_import) {
                            this.types[type] = type_import[type]
                        }
                    }
                })
            }
        })

    }

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

        this.readTokens()
        this.readTypes()

        new Reader(this.file).read((error: Error, content) => {

            if (error) throw error
            content = content.split(/\r?\n/g).join('\n')
            
            const AST = Tabdown.parse(content)


            this.readAST(AST.children)


            for (const index in this.code) {
                let   line   = this.code[index]
                const words  = line.split(' ').filter(x => x !== '')
                let group_name
                if (line.endsWith('{')) {
                    for (const token in this.tokens) {
                        if (!Array.isArray(this.tokens[token])) this.tokens[token] = [this.tokens[token]]
                        for (const word of this.tokens[token]) {
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
                        
                        for (const type_import in this.types) {
                            if (type_import.toLowerCase() === type.toLowerCase()) {
                                line = line.replace(type, this.types[type_import])
                            }
                        }
                        line = line.replace('=>', ':')
                    } else {
                        line += ': /.*/'
                    }
                    line += ','
                }

                if (line.trim() === '}') line += ','

                line = line.split(' ').filter(x => x !== '').join(' ')
            }

        })

    }

}