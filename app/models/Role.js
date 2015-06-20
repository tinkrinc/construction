var mongoose = require('mongoose');
Schema = mongoose.Schema;

var RoleSchema = new mongoose.Schema({
	name: String,
	access: {
		users: { 
			create: { type: Boolean, default: false },
			read: { type: Boolean, default: false },
			update: { type: Boolean, default: false },
			delete: { type: Boolean, default: false }
		},
		roles: { 
			create: { type: Boolean, default: false },
			read: { type: Boolean, default: false },
			update: { type: Boolean, default: false },
			delete: { type: Boolean, default: false }
		},
		organizations: { 
			create: { type: Boolean, default: false },
			read: { type: Boolean, default: false },
			update: { type: Boolean, default: false },
			delete: { type: Boolean, default: false }
		},
		projects: { 
			create: { type: Boolean, default: false },
			read: { type: Boolean, default: false },
			update: { type: Boolean, default: false },
			delete: { type: Boolean, default: false }
		},
		inspections: { 
			create: { type: Boolean, default: false },
			read: { type: Boolean, default: false },
			update: { type: Boolean, default: false },
			delete: { type: Boolean, default: false }
		}
	},
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Role', RoleSchema);