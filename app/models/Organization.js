var mongoose = require('mongoose');

var OrganizationSchema = new mongoose.Schema({
	name: { type: String, required: true },
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Organization', OrganizationSchema);