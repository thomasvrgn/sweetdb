import Sweet from './core/transpiler'
const db = new Sweet().load('tests/db.sweet')

db.set('Users', {
  username: 'NessMC',
  password: '123456789'
})

console.log(db.get('Users', {
  username: 'NessMC'
}))