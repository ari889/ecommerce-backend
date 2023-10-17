import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const moduleSchema = new mongoose.Schema({
    menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
    },
    type: {
        type: String,
        default: '2', // 1 = Divider, 2 = Module
    },
    module_name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    divider_title: {
        type: String,
        required: false,
    },
    icon_class: {
        type: String,
        required: false,
    },
    order: {
        type: Number,
        required: false,
        default: 0
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        default: null
    },
    target: {
        type: String,
        default: "_self"
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
const Module = mongoose.model('Module', moduleSchema);

export default Module;