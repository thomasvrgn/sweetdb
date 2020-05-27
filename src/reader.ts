/*/
 *
 *  SweetDB
 *   Ness
 *
/*/

import * as FS from 'fs'

export default class Reader {

    constructor (public file: FS.PathLike) {
        this.file = file + '.sweet'
    }

    public read (callback: Function) {

        FS.readFile(this.file, 'UTF-8', (error, content) => {
            callback(error, content)
        })
        
    }


}