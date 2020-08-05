import Database from './database/database'
import Interpreter from './interpreter'

module.exports = {
  Database: Interpreter,
  Field: Database.Field,
  Table: Database.Table,
  Template: Database.Template,
  Save: Database.Save
}

process.on('beforeExit', async function () {
  
  await (new Database.Save()).save()
  process.exit()
})

