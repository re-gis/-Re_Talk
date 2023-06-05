import Chat from "../Models/chat.Model.js";
import Message from "../Models/message.Model.js";
import { User } from "../Models/user.Model.js";

export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId)
    return res.status(400).send({ message: "Invalid data" });

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    return res.status(201).json(message);
  } catch (err) {
    return res.status(500).send({ message: "Internal server error..." });
  }
};

export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    return res.status(201).json(messages);
  } catch (error) {
    return res.status(500).send({ messsage: "Internal server error..." });
  }
};
