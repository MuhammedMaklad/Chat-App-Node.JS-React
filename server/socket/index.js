

const express = require("express");
const app = express();
const {Server} = require("socket.io");
const {createServer} = require("node:http");
const UserModel = require("../models/user.model");
const getUserFromToken = require("../helpers/getUserFromToken");
const {StatusCodes} = require("http-status-codes");
const ConversationModel = require("../models/conversation.model");
const MessageModel = require("../models/message.model");
const getConversation = require("../helpers/getConversation");

// socket connection
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" ,
        credentials : true
    } });


// online users
let onlineUsers = new Set();
io.on("connection",async (socket) => {
    console.log("new connection with id " + socket.id);
    const token = socket.handshake.auth.token;
    const user = await getUserFromToken(token);
    // if(user.logout){
    //     socket.emit("error" , {
    //         message: "UnAuthorized Access",
    //         statusCode: StatusCodes.UNAUTHORIZED,
    //         success:false,
    //         error :true,
    //     })
    //     return;
    // }
    // create room to this user
    socket.join(user?._id?.toString())
    onlineUsers.add(user?._id.toString());

    // getOnlineUsers
    io.emit("getOnlineUsers", Array.from(onlineUsers))


    // handle chat messages & user
    socket.on("message-page", async (userId) => {

        const userDetails = await UserModel.findById(userId);
        if(!userDetails){
            socket.emit("error",{
                message: "User not found",
                statusCode: StatusCodes.NOT_FOUND,
                success:false,
                error :true,
            })
            return;
        }
        const payload = {
            _id:userDetails?._id,
            userName:userDetails?.name,
            userEmail:userDetails?.email,
            profilePicture:userDetails?.profilePicture,
            online:onlineUsers.has(userId)
        }
        // sending receiver-user details when user in messaging page
        socket.emit("message-user", payload);

        // get previous messages in chat
        const getConversation = await ConversationModel.find({
            $or:[
                {sender:user._id, receiver: userId},
                {sender:userId, receiver: user._id}
            ]
        }).populate("messages").sort({updatedAt: -1});

        const messages = (getConversation?.messages) ?? [];
        socket.emit("previous-messages", messages);
    })

    // handle Sending Message
    socket.on("send-message", async (data) => {
        // check if there are conversation between sender and receiver
        let conversation = await ConversationModel.find({
            $or:[
                {sender:data.sender,receiver:data.receiver},
                {sender:data.receiver,receiver:data.sender}
            ]
        })
        if(!conversation){
            conversation = new ConversationModel({
                sender: data?.sender,
                receiver: data?.receiver
            })
            conversation = await conversation.save();
        }
        const message = new MessageModel({
            text : data.text,
            imageUrl : data.imageUrl,
            videoUrl : data.videoUrl,
            msgByUserId :  data?.msgByUserId,
        })
        const savedMessage = await message.save();

        const updateConversation = await ConversationModel.updateOne({
            _id: conversation?._id
        },{
            $push:{messages: savedMessage?._id}
        })

        const getConversationMessage = await ConversationModel.findOne({
            $or:[
                { sender : data?.sender, receiver : data?.receiver },
                { sender : data?.receiver, receiver :  data?.sender}
            ]
        }).populate("messages").sort({updatedAt: -1});

        io.to(data?.sender).emit('message',getConversationMessage?.messages || [])
        io.to(data?.receiver).emit('message',getConversationMessage?.messages || [])

        //send conversation
        const conversationSender = await getConversation(data?.sender)
        const conversationReceiver = await getConversation(data?.receiver)

        io.to(data?.sender).emit('conversation',conversationSender)
        io.to(data?.receiver).emit('conversation',conversationReceiver)
    })


    // all conversation when user scroll
    socket.on("scroll",async (currentUserId)=> {
        if(!currentUserId) {
            socket.emit("error", {message: "invalid user"})
            return
        }
        const conversations = await getConversation(currentUserId);
        socket.emit("all-conversation", conversations);
    })

    // on seen messages
    socket.on("seen-messages", async (msgByUserId) => {
        let conversation = await ConversationModel.findOne({
            $or:[
                {sender:msgByUserId, receiver: user._id},
                {sender:user._id, receiver: msgByUserId}
            ]
        });
        const conversationMessageId = conversation?.messages ?? [];

        const updatedMessages = await MessageModel.updateMany({
            _id:{$in:conversationMessageId},
            msgByUserId:msgByUserId
        },{
            $set:{
                seen:true
            }
        });

        // resend conversation
        const conversationSender = await getConversation(user?._id?.toString())
        const conversationReceiver = await getConversation(msgByUserId)

        io.to(user?._id?.toString()).emit('conversation',conversationSender)
        io.to(msgByUserId).emit('conversation',conversationReceiver)
    })

    // handle user logout
    socket.on("disconnect",()=> {
        onlineUsers.delete(user?._id.toString());
        console.log("user disconnected with id " + socket.id);
    })
})
module.exports = {app, server}