import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    // title: String,
    title:{ type: String, required: true},
    message: String,

    name: String,
    creator: String,

    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const postMessage = mongoose.model('PostMessage', postSchema);

export default postMessage;