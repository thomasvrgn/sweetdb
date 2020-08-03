import Sweet from './core/transpiler'
import * as FS from 'fs'
import * as path from 'path'
const db = new Sweet().load(FS.readFileSync(path.resolve(path.join('tests', 'db.sweet')), 'utf-8'))

db.set('Users', {
  username: 'NessMC',
  password: '123456789'
})

console.log(db.get('Users', {
  username: 'NessMC'
}))