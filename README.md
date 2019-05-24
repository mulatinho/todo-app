# A simple task management

[![Build Status](https://travis-ci.org/mulatinho/todo-app.svg?branch=master)](http://travis-ci.org/mulatinho/todo-app)

## Introduction

This is a simple task management made in node.js with express.js as backend, and using bootstrap, fontawesome, pug and jquery as frontend to make it responsive and lightweight.

## How to Execute

To execute this software you just need to type these commands:

    $ npm install
    $ npm start

Then you go at your browser and put the link **http://localhost:4000**

## Live demo

http://todo-app-todo-app.apps.us-east-2.online-starter.openshift.com

## How to Run Tests

To run all tests of this software you just need

    $ npm run test
    
## Watch tasks endpoint

Get your token

    curl -vv \
      -H 'Content-Type: application/json' \
      -X POST http://localhost:8080/sessions/signup \
      -d '{ "inputName": "John", "inputEmail": "john.rambo@example.com", "inputPassword": "someAmazingPassword" }'

This will give you a session token

    { session_token: "e69fb1e9a50ce060a03549b3afb5d33c521dfc5fb0d8e49af2ea0c662aff9643" }

Then you can browse your tasks whenever you want

    curl -vv \
      -H 'Content-Type: application/json' \
      -H 'Authorization: e69fb1e9a50ce060a03549b3afb5d33c521dfc5fb0d8e49af2ea0c662aff9643' \
      http://localhost:8080/watch-tasks

This will produce something like that

      [{"id":"4dbdbaa9-9029-4705-9cdb-936016a0cd25","title":"xczvxzx","description":"zxczxczxcxc","end_date":null,"tags":"none","active":true,"createdAt":"2019-05-23T21:49:58.605Z","updatedAt":"2019-05-23T21:49:58.616Z","user_id":"854c67da-9509-4a2c-bed9-836e338eaa52","task_id":null,"user":{"id":"854c67da-9509-4a2c-bed9-836e338eaa52","name":"afassafa","email":"saafs","avatar_url":null}}]

You could also pass filters like page and search

    curl -vv \
      -H 'Content-Type: application/json' \
      -H 'Authorization: e69fb1e9a50ce060a03549b3afb5d33c521dfc5fb0d8e49af2ea0c662aff9643' \
      http://localhost:8080/watch-tasks?page=2&search=title

## Screenshots

![](https://i.imgur.com/O07C4kG.png)

![](https://i.imgur.com/yFF5acC.png)

![](https://i.imgur.com/sw1hDOW.png)

