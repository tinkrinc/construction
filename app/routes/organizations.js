var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Organization = require('../models/Organization.js');
var authCheck = require('../includes/auth.js');

/* GET /organization listing. */
router.get('/', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.organizations.read) {
		res.json({ user_access: false });
		return;
	}
	
	Organization.find(function(e, organizations) {
		if(e) return next(e);
		res.json(organizations);
	});
	
});

/* GET /organization/:id */
router.get('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.organizations.read) {
		res.json({ user_access: false });
		return;
	}

	Organization.findById(req.params.id, function(e, organization) {
		if(e) return next(e);
		res.json(organization);
	});
	
});

/* POST /organization */
router.post('/', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.organizations.create) {
		res.json({ user_access: false });
		return;
	}
	
	Organization.create(req.body, function(e, organization) {
		if(e) return next(e);
		res.json(organization);
	});
	
});

/* PUT /organization/:id */
router.put('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.organizations.update) {
		res.json({ user_access: false });
		return;
	}
	
	Organization.findByIdAndUpdate(req.params.id, req.body, function(e, organization) {
		if(e) return next(e);
		res.json(organization);
	});

});

/* DELETE /organization/:id */
router.delete('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.organizations.delete) {
		res.json({ user_access: false });
		return;
	}

	Organization.findByIdAndRemove(req.params.id, req.body, function(e, post) {
		if(e) return next(e);
		res.json(post);
	});
  
});

module.exports = router;