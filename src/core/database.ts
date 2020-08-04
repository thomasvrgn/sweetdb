export default class Database {

  private db_name: string = ''
  private databases: Object = {}
  private models: Object = {}
  private templates: Object = {}

  private type (variable: any): string {
    if (typeof variable === 'object') {
      if (variable instanceof Map) {
        return 'map'
      } else if (variable instanceof Array) {
        return 'array'
      }
    } else {
      return typeof variable
    }
  }

  public create_database (name: string) {
    this.databases[name] = {}
    this.db_name = name
  }

  public create_table (name: string, model: Object = {}): void {
    let db_name = '',
      table_name = ''
    if (name.split(':').length === 2) {
      db_name = name.split(':')[0]
      table_name = name.split(':')[1]
    } else {
      db_name = this.db_name
      table_name = name
    }
    if (this.databases[db_name][table_name]) throw new Error(`Table ${name} already exists!`)
    this.databases[db_name][table_name] = []
    if (!this.models[db_name]) this.models[db_name] = {}
    this.models[db_name][table_name] = model
    return
  }

  public create_field (name: string, field: string, model: Object): void {
    let db_name = '',
      table_name = ''
    if (name.split(':').length === 2) {
      db_name = name.split(':')[0]
      table_name = name.split(':')[1]
    } else {
      db_name = this.db_name
      table_name = name
    }
    this.models[db_name][table_name][field] = model[field]
    for (const item of this.databases[db_name][table_name]) {
      if (!item[field]) {
        if (model[field].type === 'map') {
          item[field] = new Map()
        } else if (model[field].type === 'array') {
          item[field] = []
        } else if (model[field].type === 'string') {
          item[field] = ''
        } else if (model[field].type === 'number') {
          item[field] = 0
        } else if (item[field].type === 'boolean') {
          item[field] = false
        }
      }
    }
  }

  public get (name: string, object: Object = {}): Array<Object> {
    const array = []
    let db_name = '',
      table_name = ''
    if (name.split(':').length === 2) {
      db_name = name.split(':')[0]
      table_name = name.split(':')[1]
    } else {
      db_name = this.db_name
      table_name = name
    }
    for (const table_item of this.databases[db_name][table_name]) {
      let verify = 0
      for (const item in object) {
        if (object[item] === table_item[item]) ++verify
      }
      if (verify === Object.keys(object).length) array.push(table_item)
    }
    return array
  }

  public remove (name: string, object: Object = {}): void {
    let db_name = '',
      table_name = ''
    if (name.split(':').length === 2) {
      db_name = name.split(':')[0]
      table_name = name.split(':')[1]
    } else {
      db_name = this.db_name
      table_name = name
    }
    const indexes = this.get(db_name + ':' + table_name, object).map(x => this.get(db_name + ':' + table_name).indexOf(x))
    this.databases[db_name][table_name] = this.databases[db_name][table_name].filter((x, index) => !indexes.includes(index))
    return
  }

  public create_template (name: string, regex: RegExp): void {
    this.templates[name] = regex
    return
  }

  public update (name: string, object: Object = {}, values: Object = {}): void {
    let db_name = '',
      table_name = ''
    if (name.split(':').length === 2) {
      db_name = name.split(':')[0]
      table_name = name.split(':')[1]
    } else {
      db_name = this.db_name
      table_name = name
    }
    const indexes = this.get(db_name + ':' + table_name, object).map(x => this.get(db_name + ':' + table_name).indexOf(x))
    this.databases[db_name][table_name].filter(function (x, index) {
      if (indexes.includes(index)) {
        for (const value in values) {
          if (x[value]) {
            x[value] = values[value]
          }
        }
      }
    })
    return
  }

  public set (name: string, informations: Object = this.models[this.db_name][name]): void {
    let db_name = '',
      table_name = ''
    if (name.split(':').length === 2) {
      db_name = name.split(':')[0]
      table_name = name.split(':')[1]
    } else {
      db_name = this.db_name
      table_name = name
    }
    this.databases[db_name][table_name].push({})
    for (const model_item in this.models[db_name][table_name]) {
      const model = this.models[db_name][table_name][model_item]
      if (!informations[model_item] && Boolean(model.required)) 
        throw new Error(`${model_item.slice(0, 1).toUpperCase() + model_item.slice(1)} field is required!`)

      if (Boolean(model.required) && this.type(informations[model_item]) !== model.type) 
        throw new Error(`${model_item.slice(0, 1).toUpperCase() + model_item.slice(1)} type must be ${model.type}, received ${this.type(informations[model_item])}.`)

      if (Boolean(model.required) && model.maximum_length && model.minimum_length && (informations[model_item].length < Number(model.minimum_length)) || informations[model_item].length > Number(model.maximum_length))
        throw new Error(`${model_item.slice(0, 1).toUpperCase() + model_item.slice(1)} length must be between ${model.length.min} and ${model.length.max}, received ${informations[model_item].length}.`)

      if (Boolean(model.required) && this.templates[model.template] && !informations[model_item].match(this.templates[model.template])) 
        throw new Error(`${model_item.slice(0, 1).toUpperCase() + model_item.slice(1)} field does not match ${model.template} template.`)

      this.databases[db_name][table_name].slice(-1)[0][model_item] = informations[model_item]
    }
    return
  }

}