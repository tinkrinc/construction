var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Unit = require('../models/Unit.js');
var authCheck = require('../includes/auth.js');

/* GET /units listing. */
router.get('/', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.projects.read) {
		res.json({ user_access: false });
		return;
	}
	
	Unit
		.find()
		.populate('project')
		.exec(function(e, units) {
			if(e) return next(e);
			res.json(units);
		});
	
});

/* GET /units/id */
router.get('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.projects.read) {
		res.json({ user_access: false });
		return;
	}
	
	Unit.findById(req.params.id, function(e, unit) {
		if(e) return next(e);

		unit.populate('project', function(e) {
			if(e) return next(e);
			res.json(unit);
		});
	});
	
});

/* POST /units */
router.post('/', authCheck.ensure, function(req, res, next) {

	if(!req.user.role.access.projects.create) {
		res.json({ user_access: false });
		return;
	}
	
	Unit.create(req.body, function(e, unit) {
		if(e) return next(e);
		
		unit.populate('project', function(e) {
			if(e) return next(e);
			res.json(unit);
		});
	});
	
});

/* PUT /units/:id */
router.put('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.projects.update) {
		res.json({ user_access: false });
		return;
	}

	Unit.findByIdAndUpdate(req.params.id, req.body, function(e, unit) {
		if(e) return next(e);
		
		unit.populate('project', function(e) {
			if(e) return next(e);
			res.json(unit);
		});
	});

});

/* DELETE /units/:id */
router.delete('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.projects.delete) {
		res.json({ user_access: false });
		return;
	}	

	Unit.findByIdAndRemove(req.params.id, req.body, function(e, post) {
		if(e) return next(e);
		res.json(post);
	});
  
});

module.exports = router;