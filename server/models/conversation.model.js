
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const conversationSchema = new Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
}, {timestamps:true});

const ConversationSchema = mongoose.model("Conversation", conversationSchema);

module.exports = ConversationSchema;