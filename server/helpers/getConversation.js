const ConversationModel = require("../models/conversation.model");


const getConversation = async function(currentUserId) {
    if (!currentUserId)
        return []
    const currentUserConversation = await ConversationModel.findOne({
        $or: [
            {sender: currentUserId},
            {receiver: currentUserId},
        ]
    }).sort({updatedAt: -1}).populate(['sender', 'receiver', 'messages']);

    const conversations = currentUserConversation.map((conv) => {
        const countUnSeenMessages = conv.messages.reduce((prev, (msg) => {
            const msgSenderId = msg.mesByUserId.toString();
            if (msgSenderId !== currentUserId)
                return prev = prev + (msg.seen ? 0 : 1)
            return prev
        }), 0)
        return {
            _id: conv?._id,
            sender: conv?.sender,
            receiver: conv?.receiver,
            unseenMsg: countUnSeenMessages,
            lastMsg: conv.messages[conv?.messages?.length - 1]
        }
    })
    return conversations;
}

module.exports = getConversation;