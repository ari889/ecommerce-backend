const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const permissionSchema = new mongoose.Schema({
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module"
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
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
const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;