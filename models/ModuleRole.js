const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var moduleRoleSchema = new mongoose.Schema({
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module"
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
});

//Export the model
const ModuleRole = mongoose.model('User', moduleRoleSchema);

export default ModuleRole;