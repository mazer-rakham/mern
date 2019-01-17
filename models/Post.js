const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const PostSchema = new Schema({
    user: {
        // set the user object to the Schema tyoe and grab the ID from the collection users
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    }
})