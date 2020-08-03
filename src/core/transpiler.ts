import { Tokenizer } from './parser'
import Tokens from './tokens/tokens'
import { Token } from './scanner'
import Tabdown from './tabdown'

export default class Transpiler {

  private content: Array<string> = []
  private code: Array<string> = []

  constructor (file_content: string = '') {

    Tokenizer.addTokenSet(Tokens)

    this.content = file_content.split(/\r?\n/g).filter(x => x.trim().length > 0)

  }


  public async transpile () {

    for (const index in this.content) {
      if (this.content.hasOwnProperty(index)) {
        let line: string = this.content[index],
          tokens: Array<Token> = Tokenizer.tokenize(line),
          context: Array<string> = [],
          built: any = []

        for (const token_index in tokens) {
          if (tokens.hasOwnProperty(token_index)) {
            const item: Token = tokens[token_index],
              value: string = item.value,
              token: string = item.token

            if (!token) throw new Error(value)

            switch (token) {
              case 'DATABASE': {
                console.log(value)
                break
              }
            }

          }
        }

        this.code.push(built.join(''))

      }

    }

  }

}