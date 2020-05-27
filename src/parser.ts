/*/
 *
 *  SweetDB
 *   Ness
 *
/*/

import Reader from './reader'

export default class Parser {

    constructor (public file) {

        this.file = file

    }

    public parse () {

        new Reader(this.file).read((error, content) => {
            if (error) throw error
            console.log(content)
        })

    }


}