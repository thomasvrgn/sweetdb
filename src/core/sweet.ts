import Database from './database/database'
import Interpreter from './interpreter'

export default {
  Database: Interpreter,
  Field: Database.Field,
  Table: Database.Table,
  Template: Database.Template,
  Save: Database.Save
};

// (new Database.Save).load()

process.on('beforeExit', async function () {
  await (new Database.Save()).save()
  process.exit()
})

