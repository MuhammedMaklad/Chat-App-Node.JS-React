
const mongoose = require('mongoose')
const Schema =mongoose.Schema;

const messageSchema = new Schema({
    text: {type: String, default: ""},
    imageUrl: {type: String, default: ""},
    videoUrl: {type: String, default: ""},
    seen: {type: Boolean, default: false},
    msgByUserId: {type: mongoose.Types.ObjectId, ref: 'User', require: true}
},{timestamps:true});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;