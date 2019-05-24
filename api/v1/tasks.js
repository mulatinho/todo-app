/*
  Todo-App RESTful API
    (c) 2019 Alexandre Mulatinho
*/

// function CheckUser(request, callback) {
//   var in_session_token = request.cookies.todoid || null;
//   if (!in_session_token) { return callback(null); }
//
//   db.user.findOne({
//     where: { session_token: in_session_token },
//     attributes: {exclude: [ "password", "session_token" ]}
//   }).then(function(user) {
//     if (!user) { console.log('-- user with session_token "' + in_session_token + '" not found here.');  return callback(null); }
//     return callback(user);
//   }).catch(error => { console.log(error) });
// }

exports.get = function(request, response) {
  const task_id = request.params.id || null;
  let page      = request.query.page || 0;
  let search    = request.query.search || '';
  let orderBy   = request.query.order || 'DESC';
  let offset    = page * 20;

  CheckUser(request, function(userNow) {
    if (!userNow) { return response.status(401).render('401'); }

    if (task_id != null) {
      db.task.findOne({
        where: { id: task_id },
        include: [
          { model: db.user, attributes: [ 'id', 'name', 'email', 'avatar_url' ], as: 'user' }
        ]
      }).then(taskFound => {
        if (!taskFound) { return response.render('404'); }

        response.render('tasks/index', { user: userNow, task: taskFound, page: page })
      }).catch(error => { console.log(error) });
    } else {
      db.task.findAll({
        where: {
          [db.Sequelize.Op.or]: [
            { title: { [db.Sequelize.Op.like]: `%${search}%` } },
            { tags: { [db.Sequelize.Op.like]:  `%${search}%` } }
          ]
        },
        limit: 20,
        offset: offset,
        include: [
          { model: db.user, attributes: [ 'id', 'name', 'email', 'avatar_url' ], as: 'user' }
        ],
        order: [ [ 'createdAt', orderBy ] ]
      }).then(taskList => {
        return response.render('tasks/index', { user: userNow, taskList: taskList, page: page })
      }).catch(error => { console.log(error) });
    }

  })
}

exports.create = function(request, response) {
  const inputData = [ "taskTitle", "taskDescription", "taskTags" ]
  let data = {}
  if (!validBodyInput(request, data, inputData, ["taskTitle"])) { return response.status(400).json({}) }

  CheckUser(request, function(userNow) {
    if (!userNow) { return response.status(401).render('401'); }

    db.task.findOrCreate({
      where: { title: data.taskTitle, user_id: userNow.id }
    }).spread((taskNew, isNew) => {
      if (isNew) {
        taskNew.description = data.taskDescription
        taskNew.tags        = data.taskTags

        taskNew.save().then(() => {});
      }

      return response.json({})
    }).catch(error => { console.log(error) });
  })
}

exports.update = function(request, response) {
  const todoid = request.params.id || null;
  const inputData = [ "taskTitle", "taskDescription", "taskTags" ]
  let data = {}

  if (!validBodyInput(request, data, inputData, ["taskTitle"])) { return response.status(400).json({}) }

  CheckUser(request, function(userNow) {
    if (!userNow) { return response.status(401).render('401'); }

    db.task.findOne({
      where: { id: todoid }
    }).then((taskFound) => {
      if (!taskFound) { return response.status(404).render('404'); }

      taskFound.title       = data.taskTitle
      taskFound.description = data.taskDescription
      taskFound.tags        = data.taskTags

      taskFound.save().then(() => {});

      console.log(taskFound, "YEAHHH")

      return response.json(taskFound)
    }).catch(error => { console.log(error) });
  })
}

exports.destroy = function(request, response) {
  const todoid = request.params.id || null;

  CheckUser(request, function(userNow) {
    if (!userNow) { return response.status(401).render('401'); }

    db.task.findOne({
      where: { id: todoid }
    }).spread((taskFound, isNew) => {
      if (!taskFound) { return response.status(404).render('404'); }

      taskFound.destroy().then(() => {});

      return response.json({})
    }).catch(error => { console.log(error) });
  })
}

exports.watch = function(request, response) {
  const task_id = request.params.id || null;
  let page      = request.query.page || 0;
  let search    = request.query.search || '';
  let orderBy   = request.query.order || 'DESC';
  let offset    = page * 20;

  CheckUser(request, function(userNow) {
    if (!userNow) { return response.status(401).render('401'); }

    db.task.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { title: { [db.Sequelize.Op.like]: `%${search}%` } },
          { tags: { [db.Sequelize.Op.like]:  `%${search}%` } }
        ]
      },
      limit: 20,
      offset: offset,
      include: [
        { model: db.user, attributes: [ 'id', 'name', 'email', 'avatar_url' ], as: 'user' }
      ],
      order: [ [ 'createdAt', orderBy ] ]
    }).then(taskList => {
      return response.json(taskList)
    }).catch(error => { console.log(error) });
  })
}
