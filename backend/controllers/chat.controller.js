import Chat from "../Models/chat.Model.js";
import { User } from "../Models/user.Model.js";

export const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).send({ message: "No user id!" });
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    return res.status(200).send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id })
        .populate("users", "-password")
        .populate("latestMessage");
      return res.status(200).send(fullChat);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Something went wrong!" });
    }
  }
};

export const fetchChats = async (req, res) => {
  try {
    Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        return res.status(200).send(result);
      });
  } catch (error) {
    console.log(error);
  }
};

export const createGroupChat = async (req, res) => {
  if (!req.body.name || !req.body.users)
    return res.status(400).send({ message: "Please fill out all fields!" });

  const users = JSON.parse(req.body.users);

  if (users.length < 2)
    return res.status(400).send({
      message: "More than 2 users are required to form a group chat!",
    });

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json(fullGroupChat);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  if (!chatId) return res.status(400).send({ message: "Something occurred!" });
  if (!chatName)
    return res.status(400).send({ message: "Group name required!" });

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) return res.status(404).send({ message: "Chat not found!" });
  return res.status(201).json(updatedChat);
};

export const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const addedUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!addedUser) return res.status(404).send({ message: "Chat not found!" });
  return res.status(201).json(addedUser);
};

export const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const removedUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
    

  if (!removedUser) return res.status(404).send({ message: "Chat not found!" });
  return res.status(201).json(removedUser);
};
