import Sweet from './core/interpreter'
const sweet = new Sweet()
sweet.load('tests/db.sweet')
sweet.load('tests/test.sweet')

sweet.set('Palamazon:Users', {
  username: 'NessMC',
  password: '123456789',
  email: 'contact@nessmc.fr'
})

sweet.create_field('Palamazon:Users', 'age', {
  age: {
    type: 'number',
    required: true
  }
})

console.log(sweet.get('Palamazon:Users'))

