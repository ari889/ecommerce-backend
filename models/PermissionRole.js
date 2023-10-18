import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var permissionRoleSchema = new mongoose.Schema({
    permission_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission"
    },
    role_id: {
        type: mongoose.Schema.ObjectId,
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
const PermissionRole = mongoose.model('PermissionRole', permissionRoleSchema);

export default PermissionRole;