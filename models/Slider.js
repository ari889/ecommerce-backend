import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var sliderSchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
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
const Slider = mongoose.model('Slider', sliderSchema);

export default Slider;