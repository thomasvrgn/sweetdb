import Sweet from './core/sweet'

const db = new Sweet.Database('tests/db.sweet')
db.set('Palamazon:Users', {
  username: 'NessMC',
  password: '123456789',
  email: 'contact@nessmc.fr'
})

new Sweet.Field('Palamazon:Users', 'age', {
  age: {
    type: 'number',
    required: true
  }
})

console.log(db.get('Palamazon:Users'))

