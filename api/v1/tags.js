/*
	Todo-App RESTful API
		(c) 2019 Alexandre Mulatinho
*/

function GetUser(request, callback) {
	var in_session_token = request.cookies.todoid || null;
	if (!in_session_token) { return callback(null); }

	db.user.findOne({
		where: { session_token: in_session_token },
		attributes: {exclude: [ "password", "session_token" ]}
	}).then(function(user) {
		if (!user) { console.log('-- user with session_token "' + in_session_token + '" not found here.');	return callback(null); }
		return callback(user);
	}).catch(error => { console.log(error) });
}

exports.get = function(request, response) {
	const task_id = request.params.id || null;

  GetUser(request, function(userNow) {
    if (!userNow) { return response.status(401).json({}); }

		if (task_id != null) {
			db.task.findOne({
				where: { id: task_id }
			}).then(taskFound => {
				if (!taskFound) { return response.render('404'); }

				response.render('tasks/index', { user: userNow, task: taskFound })
			}).catch(error => { console.log(error) });
		} else {
			db.task.findAll({}).then(taskList => {
				return response.render('tasks/index', { user: userNow, taskList: taskList, page: 0 })
			}).catch(error => { console.log(error) });
		}

  })
}

exports.create = function(request, response) {
  return response.status(501).json({})
}

exports.update = function(request, response) {
  return response.status(501).json({})
}

exports.destroy = function(request, response) {
  return response.status(501).json({})
}
