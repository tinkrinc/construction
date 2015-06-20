var mongoose = require('mongoose');
Schema = mongoose.Schema;

var InspectionSchema = new mongoose.Schema({
	updated_at: { type: Date, default: Date.now },
	project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
});

module.exports = mongoose.model('Inspection', InspectionSchema);