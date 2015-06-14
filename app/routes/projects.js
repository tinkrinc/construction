var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Project = require('../models/Project.js');
var authCheck = require('../includes/auth.js');

/* GET /projects listing. */
router.get('/', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.projects.read) {
		res.json({ user_access: false });
		return;
	}
	
	Project
		.find()
		.populate('organization')
		.exec(function(e, projects) {
			if(e) return next(e);
			res.json(projects);
		});
	
});

/* GET /projects/id */
router.get('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.projects.read) {
		res.json({ user_access: false });
		return;
	}
	
	Project.findById(req.params.id, function(e, project) {
		if(e) return next(e);

		project.populate('organization', function(e) {
			if(e) return next(e);
			res.json(project);
		});
	});
	
});

/* POST /projects */
router.post('/', authCheck.ensure, function(req, res, next) {

	if(!req.user.role.access.projects.create) {
		res.json({ user_access: false });
		return;
	}
	
	Project.create(req.body, function(e, project) {
		if(e) return next(e);
		
		project.populate('organization', function(e) {
			if(e) return next(e);
			res.json(project);
		});
	});
	
});

/* PUT /projects/:id */
router.put('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.projects.update) {
		res.json({ user_access: false });
		return;
	}

	Project.findByIdAndUpdate(req.params.id, req.body, function(e, project) {
		if(e) return next(e);
		
		project.populate('organization', function(e) {
			if(e) return next(e);
			res.json(project);
		});
	});

});

/* DELETE /projects/:id */
router.delete('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.projects.delete) {
		res.json({ user_access: false });
		return;
	}	

	Project.findByIdAndRemove(req.params.id, req.body, function(e, post) {
		if(e) return next(e);
		res.json(post);
	});
  
});

module.exports = router;