import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const menuSchema = new mongoose.Schema({
    menu_name: {
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
        default: '2', // 1 = Yes, 2 = No
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
const Menu = mongoose.model('Menu', menuSchema);

export default Menu;