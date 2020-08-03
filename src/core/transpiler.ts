import { Tokenizer } from './parser'
import Tokens from './tokens/tokens'
import { Token } from './scanner'
import Tabdown from './tabdown'

export default class Transpiler {

  private content: Array<string> = []
  private code: Array<string> = []

  constructor (file_content: string = '') {

    Tokenizer.addTokenSet(Tokens)

    this.content = file_content.split(/\n/g).filter(x => x.trim().length > 0)

  }


  public async transpile () {


  }

}