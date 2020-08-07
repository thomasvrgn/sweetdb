# SweetDB
SweetDB is a data manager and data store written in TypeScript. With Sweet you have the choice between storing data in a dynamic and temporary way or in a static and permanent way. Designing a database has become simple with the implementation of a file system specific to Sweet. No knowledge is now necessary to create and manage a database.

## Install it

```bash
 # With NPM
 $ npm i sweetdb

 # Cloning repository
 $ git clone https://github.com/NessMC/sweetdb
 $ cd sweetdb
 
 # Installing NPM dependencies.
 $ npm install
 
 # Building SweetDB
 $ npm run build
 
 # Starting SweetDB
 $ npm run start
```



## Use it

First of all, you need to create your database template. For this, you will proceed to the creation of a Sweet file. Creating, editing and modifying this kind of files doesn't require any real programming knowledge.

```
# database.sweet

#Database name
database App {
	# Table name
	table Users {
		# Field name
		field username {
            - type => string # Value type must be string
            - required => true # Field is required
            - maximum length => 16 # Field maximum length is 16
            - minimum length => 4 # Field minimum length is 4
		}
        field password {
            - type => string
            - required => true
            - maximum length => 32
            - minimum length => 8
        }
	}
}
```

You must then load this file in your Javascript code. 

```js
const Sweet = require('sweetdb'),
		db = new Sweet.Database('path/to/file.sweet')
```

You can now interact with your database easily:

```js
db.set('Users',  {
	username:  'NessMC',
	password:  '123456789',
	email:  'contact@nessmc.fr'
})

console.log(db.get('Users', {
	username: 'NessMC'
})

/*
[
	{
		username: 'NessMC',
		password: '123456789',
		email: 'contact@nessmc.fr'
	}
]
*/
```

## Create templates

With Sweet, you can create templates for your fields. This allows the validation of data matching with the template. Their operation is based on regex.

```
# template.sweet
template email {
	- regex => (\w|\d)+@(\w|\d)+\.\w{2}
}
```

You can of course use it in the previously defined file containing the template of your database.

```
# database.sweet

database App {
	table Users {
		field email {
            - type => string
            - template => email
            - required => true
            - minimum length => 5
        }
	}
}
```

## Javascript methods

### Create database

```ts
class Database {
	constructor (name: string)
}
// Create a database with the specified name.
```

Example:

```ts
new Sweet.Database('app')
```

### Create table

```ts
class Table {
	constructor (name: string, model: Object = {})
}
// Create a table with the specified name
```

Example:

```ts
new Sweet.Table('App:Users')
// OR
new Sweet.Table('Users')
```

### Create_field

```ts
class Field {
	constructor (name: string, field: string, model: Object)
}
// Create or update field
```

Example:

```ts
new Sweet.Field('App:Users', 'age', {
	age: {
		type: 'number',
		required: true
	}
})
```

### Create template

```ts
class Template {
	constructor (name: string, regex: RegExp)
}
// Creating template
```

Example:

```ts
new Sweet.Template('email', /someRegexHere/)
```

### Get values

```ts
class Database {
	public get (name: string, object = {}) : Array<Object>
}
// Getting informations from specified database.
```

Example:

```ts
database.get('Users', {
	username: 'NessMC'
})
// OR
database.get('Users')
```

### Remove values

```ts
class Database {
	public remove (name: string, object = Object = {}) : void	
}

// Removing informations from specified database.
```

Example:

```ts
database.remove('Users', {
	username: 'NessMC'
})
// OR
database.remove('Users')
```

### Update values

```ts
class Database {
	public update (name: string, object = Object = {}) : void	
}
// Updating informations from specified database.
```

Example:

```ts
database.update('Users', {
	username: 'NessMC'
})
// OR
database.update('Users')
```

### Set values

```ts
class Database {
	public set (name: string, object = Object = {}) : void	
}
// Setting informations from specified database.
```

Example:

```ts
database.set('Users', {
	username: 'NessMC',
	password: '321654987'
})
```