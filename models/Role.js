import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const roleSchema = new mongoose.Schema({
    role_name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    deletable: {
        type: String,
        default: '2' // 1 = Yes, 2 = No
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
const Role = mongoose.model('Role', roleSchema);

export default Role;