/*/
 *
 *  SweetDB
 *   Ness
 *
/*/

import Reader       from './reader'
import * as Tabdown from 'tabdown-kfatehi'
import { type } from 'os'

export default class Parser {

    public code   : Array<String>  = []
    public output : Array<String>  = []
    public types  : Array<Object>  = []

    constructor (public file) {}


    public readAST (tree) {
        
        for (const i of tree) {
            
            if (i.value.trim().endsWith(':')) {
                if (i.children) {
                    if (i.children.length > 0) {
                        this.code.push(i.value + ' {')
                        this.readAST(i.children)
                        this.code.push('}')
                    } else {
                        console.log('EMPTY CHILDREN')
                    }
                } else {
                    console.log('Null Error at line', (this.code.length + 1).toString())
                    console.log('Children cannot be empty.')
                    console.log(i.value)
                    console.log(new Array(i.value.length).fill('^').join(''))
                }
            } else {
                this.code.push(i.value)
            }
            
        }
    }

    public parse (callback: Function) {

        new Promise ((resolve, reject) => {
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
                        parent_type = undefined
                        const tokens = [
                            'scheme',
                            'schema',
                            'type',
                            'group'
                        ]
                        for (const token of tokens) {
                            if (line.startsWith(token)) {
                                const name  = token + '::' + line.substr(token.length, line.length).trim().match(/.*?(?=:)/)[0].replace(/\s/g, '_')
                                line        = '"' + name.toLowerCase() + '": {'
                                parent_type = token
                            }
                        }
                        if (!parent_type) {
                            console.log('Syntax error at line', index)
                            console.log('Unexpected parent element:', line.split(' ')[0])
                            console.log(line.split('{').join('').trim())
                            const error: Array<String|Array<String>> = new Array(line.split('{').join('').trim().length).fill(' ')
                            error.splice(line.indexOf(line.split(' ')[0]), line.split(' ')[0].length, ['^', '^', '^', '^'])
                            console.log(error.flat().join(''))
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
                        if (this.code[parseInt(index) + 1].trim() !== '}') {
                            if (line.includes('#')) {
                                const comment = line.slice(line.indexOf('#'))
                                const first   = line.slice(0, line.indexOf('#')).trim()
                                line = first.trim() + ',' + comment
                            } else {
                                line += ','
                            }
                        }
                    }
                    
                    if (line.includes('#'))  line = line.replace('#', '//')
                    if (line.includes('<-')) line = line.replace('<-', '/*')
                    if (line.includes('->')) line = line.replace('->', '*/')

                    if (line.startsWith('}')) {
                        if (this.code[parseInt(index) + 1]) {
                            if (this.code[parseInt(index) + 1].trim() !== '}') line += ','
                        }
                    }

                    this.output.push(line)
                }
                this.output.push('}')
                
                resolve(this.output)
            })
        }).then(code => {
            callback(code)
        }) 

    }

}