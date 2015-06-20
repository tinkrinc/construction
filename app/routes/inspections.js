var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Inspection = require('../models/Inspection.js');
var authCheck = require('../includes/auth.js');

/* GET /inspection listing. */
router.get('/', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.inspections.read) {
		res.json({ user_access: false });
		return;
	}
	
	var project = req.query.project;
	
	Inspection
		.find({ 'project': project })
		.populate('project')
		.exec(function(e, inspections) {
			if(e) return next(e);
			res.json(inspections);
		});
	
});

/* GET /inspection/:id */
router.get('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.inspections.read) {
		res.json({ user_access: false });
		return;
	}

	Inspection.findById(req.params.id, function(e, inspection) {
		if(e) return next(e);
		
		inspection.populate('project', function(e) {
			if(e) return next(e);
			res.json(inspection);
		});
	});
	
});

/* POST /inspection */
router.post('/', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.inspections.create) {
		res.json({ user_access: false });
		return;
	}
	
	Inspection.create(req.body, function(e, inspection) {
		if(e) return next(e);
		
		inspection.populate('project', function(e) {
			if(e) return next(e);
			res.json(inspection);
		});
	});
	
});

/* PUT /inspection/:id */
router.put('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.inspections.update) {
		res.json({ user_access: false });
		return;
	}
	
	Inspection.findByIdAndUpdate(req.params.id, req.body, function(e, inspection) {
		if(e) return next(e);
		
		inspection.populate('project', function(e) {
			if(e) return next(e);
			res.json(inspection);
		});
	});

});

/* DELETE /inspection/:id */
router.delete('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.inspections.delete) {
		res.json({ user_access: false });
		return;
	}

	Inspection.findByIdAndRemove(req.params.id, req.body, function(e, post) {
		if(e) return next(e);
		res.json(post);
	});
  
});

module.exports = router;