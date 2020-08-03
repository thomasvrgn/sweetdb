import Transpiler from './core/transpiler'
import * as FS from 'fs'
import * as path from 'path'
new Transpiler(FS.readFileSync(path.resolve(path.join('tests', 'db.sweet')), 'utf-8')).transpile()