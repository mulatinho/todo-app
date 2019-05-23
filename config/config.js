/*
  Todo-App RESTful API
  (c) 2019 Alexandre Mulatinho
*/

const env  = process.env.NODE_ENV || "development";
const path = require('path')

const config = {
  development: {
    web: { port: 4000 },
    database: {
      name: 'todo_dev',
      options: {
        host: 'localhost',
        dialect: 'sqlite',
        storage: __dirname + '/../data/todo_dev.sqlite3',
        pool: { max: 5, min: 1, idle: 10000 },
        logging: console.log
      }
    }
  },
  test: {
    web: { port: 4000 },
    database: {
      name: 'todo_test',
      options: {
        host: 'localhost',
        dialect: 'sqlite',
        storage: __dirname + '/../data/todo_test.sqlite3',
        pool: { max: 5, min: 1, idle: 10000 },
        logging: console.log
      }
    }
  },
  production: {
    web: { port: 4000 },
    database: {
      name: 'todo_prod',
      options: {
        host: 'localhost',
        dialect: 'sqlite',
        storage: __dirname + '/../data/todo_prod.sqlite3',
        pool: { max: 5, min: 1, idle: 10000 },
        logging: console.log
      }
    }
  },
};

module.exports = config[env];
