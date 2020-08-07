const Sweet = require('../dist/sweet')

const db = new Sweet.Load('db.sweet')

db.set('Users', {
  username: 'NessMC',
  password: '123456789',
  email: 'contact@nessmc.fr'
})

const db2 = new Sweet.Load('test.sweet')

db2.set('Users', {
  username: 'test',
  password: '123456789',
  email: 'contact@nessmc.fr'
})
