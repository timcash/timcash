# edgedb
## install
```
curl https://sh.edgedb.com --proto '=https' -sSf1 | sh
```
## init the project
```
edgedb project init
```
## list types
```
edgedb list types
┌─────────────────┬──────────────────────────────┐
│      Name       │          Extending           │
├─────────────────┼──────────────────────────────┤
│ default::Movie  │ std::BaseObject, std::Object │
│ default::Person │ std::BaseObject, std::Object │
└─────────────────┴──────────────────────────────┘
```
## Generate Migration
```
edgedb migration create
```
First, we generate a migration file with edgedb migration create. This starts an interactive tool that asks a series of questions. Pay attention to these questions to make sure you aren’t making any unintended changes.
```
module default {
  type Person {
    required property first_name -> str;
    required property last_name -> str;
  }

  type Movie {
    required property title -> str;
    property year -> int64;
    link director -> Person;
    multi link actors -> Person;
  }
};
```
## insert data
from the repl
```
insert Person {
    first_name := 'Denis',
    last_name := 'Villeneuve',
};
```

## Execute Migrate
```
edgedb migrate
``

## logs
```
edgedb instance logs -n 10 -f db
```
edgedb instance logs​
Show instance logs.

edgedb instance logs [options] name
Description​
edgedb instance logs is a terminal command for displaying the logs for a given EdgeDB instance.

Options​
name
The name of the EdgeDB instance.

-n, --tail=tail
Number of the most recent lines to show.

-f, --follow
Show log’s tail and the continue watching for the new entries.