var mongoose = require('mongoose');
Schema = mongoose.Schema;

var ProjectSchema = new mongoose.Schema({
	name: { type: String, required: true },
	address: { type: String, required: false },
	updated_at: { type: Date, default: Date.now },
	organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true }
});

module.exports = mongoose.model('Project', ProjectSchema);