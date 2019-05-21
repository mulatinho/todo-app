/*
  Todo-App RESTful API
  (c) 2019 Alexandre Mulatinho
*/

const env  = process.env.NODE_ENV || "development";
const path = require('path')

var config = {
  development: {
    web: { port: 4000 },
    database: {
      name: 'todo_dev',
      options: {
        host: 'localhost',
        dialect: 'sqlite',
        storage: __dirname + '/../data/todo_dev.sqlite3',
        pool: { max: 5, min: 1, idle: 10000 }
      }
    }
  },
  test: {

  }
};

module.exports = config[env];
