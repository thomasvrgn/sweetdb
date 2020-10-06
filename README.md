<h3 align="center">SweetDB</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/nessmc/sweetdb.svg)](https://github.com/nessmc/sweetdb/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/nessmc/sweetdb.svg)](https://github.com/nessmc/sweetdb/pulls)
[![License](https://img.shields.io/badge/license-Creative%20commons-blue.svg)](/LICENSE)
[![BCH compliance](https://bettercodehub.com/edge/badge/nessmc/sweetdb?branch=master)](https://bettercodehub.com/)
[![Discord](https://discordapp.com/api/guilds/738827425043185717/widget.png?style=shield)](https://discord.gg/discord-invite)
 
</div>

---

<p align="center"> 
    Simple, usable and beginny-friendly  database manager written in Typescript
    <br> 
</p>

## 📝 Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Manual installation](#manual)
-   [Build](#build)
-   [Usage](#usage)
-   [TODO](./TODO.md)
-   [Contributing](./CONTRIBUTING.md)
-   [Authors](#authors)

## 🧐 About <a name = "about"></a>

SweetDB is a data storage system written in Typescript. It has its own schematics format and it's stored temporarily.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes. See
[Manual installation](#manual) for notes on how to install the project on a live
system.

### Prerequisites

To install SweetDB, you will need:

```
Node.JS > 13
NPM > 6
```

### Installing

---

## 🔧 Running the tests <a name = "tests"></a>

To run the tests:

```
 yarn test
```

### Break down into end to end tests

No tests for the moment.

### And coding style tests

The linter is present in order to allow anyone to be able to contribute while
being in the main coherence of the code.

```
 yarn lint
```

## 🎈 Usage <a name="usage"></a>

No usage informations for the moment.

## 🚀 Manual installation <a name = "manual"></a>

To deploy SweetDB, do:

```bash
 $ git clone git@github.com:nessmc/sweetdb.git

 # OR

 $ git init
 $ git remote add origin git@github.com:nessmc/sweetdb.git
 $ git pull

 # OR

 $ docker pull nessmcfr/sweetdb
 $ docker run nessmcfr/sweetdb
```

## 🚀 Build <a name = "build"></a>

To build the project, do:

```bash
 $ yarn bundle 
 # That generate file called bundle.js, just run it with : node dist/bundle.js

 # OR

 $ docker-compose build
 # OR
 $ yarn docker:build

 $ docker run sweetdb_app
 # OR
 $ yarn docker:start

```

## ✍️ Authors <a name = "authors"></a>

-   [@NessMC](https://github.com/NessMC) - Idea & Initial work

See also the list of
[contributors](https://github.com/nessmc/sweetdb/contributors) who
participated in this project.
