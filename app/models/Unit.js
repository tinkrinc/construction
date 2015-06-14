var mongoose = require('mongoose');

var UnitSchema = new mongoose.Schema({
	number: { type: Number, required: true },
	rooms: { type: Number, required: false },
	baths: { type: Number, required: false },
	updated_at: { type: Date, default: Date.now },
	project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
});

module.exports = mongoose.model('unit', UnitSchema);