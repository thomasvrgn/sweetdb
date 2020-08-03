import Sweet from './core/transpiler'
const db = new Sweet().load('tests/db.sweet')

db.set('Users', {
  username: 'NessMC',
  password: '123456789',
  email: 'contact@nessmc.fr'
})

db.set_table_model('Users', 'age', {
  age: {
    type: 'number',
    required: true
  }
})

console.log(db.get('Users'))