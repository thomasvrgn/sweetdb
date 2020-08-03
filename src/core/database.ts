export default class Database {

  static database  = {}
  static models    = {}
  static templates = {}

  private static type (variable: any): string {
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

  public static create_table (name: string, model: Object): void {
    if (this.database[name]) throw new Error(`Table ${name} already exists!`)
    this.database[name] = []
    this.models[name] = model
    return
  }

  public static get (table: string, object: Object = {}): Array<Object> {
    const array = []
    for (const table_item of this.database[table]) {
      let verify = 0
      for (const item in object) {
        if (object[item] === table_item[item]) ++verify
      }
      if (verify === Object.keys(object).length) array.push(table_item)
    }
    return array
  }

  public static remove (table: string, object: Object = {}): void {
    const indexes = this.get(table, object).map(x => this.get(table).indexOf(x))
    this.database[table] = this.database[table].filter((x, index) => !indexes.includes(index))
    return
  }

  public static create_template (name: string, regex: RegExp): void {
    this.templates[name] = regex
    return
  }

  public static update (table: string, object: Object = {}, values: Object = {}): void {
    const indexes = this.get(table, object).map(x => this.get(table).indexOf(x))
    this.database[table].filter(function (x, index) {
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

  public static set (name: string, informations: Object = this.models[name]): void {
    this.database[name].push({})
    for (const model_item in this.models[name]) {
      const model = this.models[name][model_item]

      if (!informations[model_item] && model.required) 
        throw new Error(`${model_item.slice(0, 1).toUpperCase() + model_item.slice(1)} field is required!`)

      if (this.type(informations[model_item]) !== model.type) 
        throw new Error(`${model_item.slice(0, 1).toUpperCase() + model_item.slice(1)} type must be ${model.type}, received ${this.type(informations[model_item])}.`)

      if (model.length && (informations[model_item].length < model.length.min || informations[model_item].length > model.length.max)) 
        throw new Error(`${model_item.slice(0, 1).toUpperCase() + model_item.slice(1)} length must be between ${model.length.min} and ${model.length.max}, received ${informations[model_item].length}.`)

      if (this.templates[model.template] && !informations[model_item].match(this.templates[model.template])) 
        throw new Error(`${model_item.slice(0, 1).toUpperCase() + model_item.slice(1)} field does not match ${model.template} template.`)

      this.database[name].slice(-1)[0][model_item] = informations[model_item]
    }
    return
  }

}