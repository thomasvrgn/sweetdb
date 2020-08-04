import Database from './database/database'
import Interpreter from './interpreter'

export default {
  Database: Interpreter,
  Field: Database.Field,
  Table: Database.Table,
  Template: Database.Template
}