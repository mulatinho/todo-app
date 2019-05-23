/*
	Todo-App RESTful API
		(c) 2019 Alexandre Mulatinho
*/

(function () {

  GetUser = function (request, callback) {
  	var in_session_token = request.cookies.todoid || null;
  	if (!in_session_token) { return callback(null); }

  	db.user.findOne({
  		where: { session_token: in_session_token },
  		attributes: {exclude: [ "password", "session_token" ]}
  	}).then(function(user) {
  		if (!user) { return callback(null); }
  		return callback(user);
  	}).catch(error => { console.log(error) });
  }

  htmlEntities = function(str) {
  	return String(str).replace(/&/g, '&amp;').replace(/</g,
  	'&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  validBodyInput = function(request, data, fields, obligatory = []) {
  	var result = true;

  	fields.forEach(function(entry) {
  		if (request.body[entry] !== undefined && request.body[entry] !== null && request.body[entry] !== '') {
  			data[entry] = htmlEntities(request.body[entry]);
  		} else {
  			obligatory.forEach(function(elem) {
  				if (elem == entry) { result = false; return; }
  			});
  		}
  	});

  	return result;
  }

  validQueryInput = function(request, data, fields, obligatory = []) {
  	var result = true;

  	fields.forEach(function(entry) {
  		if (request.query[entry] !== undefined && request.query[entry] !== null && request.query[entry] !== '') {
  			data[entry] = htmlEntities(request.query[entry]);
  		} else {
  			obligatory.forEach(function(elem) {
  				if (elem == entry) { result = false; }
  			});
  		}
  	});

  	return result;
  }

})();
