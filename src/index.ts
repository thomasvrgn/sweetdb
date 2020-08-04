import Sweet from './core/transpiler'
const sweet = new Sweet()
sweet.load('tests/db.sweet')
sweet.load('tests/test.sweet')

sweet.database.set('Palamazon:Users', {
  username: 'NessMC',
  password: '123456789',
  email: 'contact@nessmc.fr'
})

sweet.database.create_field('Palamazon:Users', 'age', {
  age: {
    type: 'number',
    required: true
  }
})

console.log(sweet.database.get('Palamazon:Users'))