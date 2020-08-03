import Transpiler from './core/transpiler'
import * as FS from 'fs'
import * as path from 'path'
const db = new Transpiler(FS.readFileSync(path.resolve(path.join('tests', 'db.sweet')), 'utf-8')).transpile()

db.set('Users', {
  username: 'NessMC',
  password: '123456789'
})

console.log(db.get('Users', {
  username: 'NessMC'
}))