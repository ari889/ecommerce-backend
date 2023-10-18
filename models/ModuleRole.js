import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var moduleRoleSchema = new mongoose.Schema({
    module_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module"
    },
    role_id: {
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
const ModuleRole = mongoose.model('ModuleRole', moduleRoleSchema);

export default ModuleRole;