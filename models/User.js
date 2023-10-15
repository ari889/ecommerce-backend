import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    shop_name: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: '0' // 0 = Male, 1 = Female, 2 = Other
    },
    birthday: {
        type: Date
    }
}, {
    timestamps: true
});

//Export the model
const User = mongoose.model('User', userSchema);

export default User;