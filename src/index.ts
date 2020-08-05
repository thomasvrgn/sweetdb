import Sweet from './core/sweet'

const db = new Sweet.Database('tests/db.sweet')

console.log(db.get('Palamazon:Users'))

db.set('Users', {
  username: 'iTrooz_',
  password: 'bruhtestestestsetqs',
  email: 'contact@itrooz.fr',
  age: 72
})

