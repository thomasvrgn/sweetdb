import Database from './database/database'
import Interpreter from './interpreter'

module.exports = {
  Load: Interpreter,
  Field: Database.Field,
  Table: Database.Table,
  Template: Database.Template,
  Save: Database.Save,
  Database: Database.Database
}

process.on('beforeExit', async function () {
  
  await (new Database.Save()).save()
  process.exit()
})

