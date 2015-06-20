var mongoose = require('mongoose');
Schema = mongoose.Schema;

var UnitSchema = new mongoose.Schema({
	number: { type: Number, required: true },
	bedrooms: { type: Number, required: false },
	bathrooms: { type: Number, required: false },
	updated_at: { type: Date, default: Date.now },
	project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
});

module.exports = mongoose.model('unit', UnitSchema);