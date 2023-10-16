const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const roleSchema = new mongoose.Schema({
    role_name: {
        type: String,
        required: true
    },
    deletable: {
        type: String,
        default: '2' // 1 = Yes, 2 = No
    }
}, {
    timestamps: true
});

//Export the model
const Role = mongoose.model('Role', roleSchema);

export default Role;