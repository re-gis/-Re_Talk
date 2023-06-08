import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModel from "../miscellaneousComponents/ProfileModel";
import UpdateGroupModal from "../miscellaneousComponents/UpdateGroupModal";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import "../miscellaneousComponents/style.css";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const {
    user,
    selectedChat,
    setSelectedChat,
    notifications,
    setNotifications,
  } = ChatState();
  const userInfo = localStorage.getItem("userInfo");
  const u = JSON.parse(userInfo);
  const toast = useToast();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit('join chat', selectedChat._id)
    } catch (error) {
      toast({
        title: "Error occurred!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };


   useEffect(() => {
     socket = io(ENDPOINT);
     socket.emit("setup", u);
     socket.on("connected", () => setSocketConnected(true));
     socket.on('typing', () => setIsTyping(true))
     socket.on('stop typing', () => setIsTyping(false))
   }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat
  }, [selectedChat]);


  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        if(!notifications.includes(newMessageReceived)) {
          setNotifications([newMessageReceived, ...notifications])
          setFetchAgain(!fetchAgain)
        }
      } else {
        setMessages([...messages, newMessageReceived])
      }
    })
  }, [])


  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit('stop typing', selectedChat._id)
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        socket.emit("new message", data)
        setNewMessage("");
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error occurred!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

 

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if(!socketConnected) return

    if(!typing) {
      setTyping(true)
      socket.emit('typing', selectedChat._id)
    }

    let lastTypingTime = new Date().getTime()
    let timerLength = 3000

    setTimeout(() => {
      let timeNow = new Date().getTime()
      let timeDiff = timeNow - lastTypingTime

      if(timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id)
        setTyping(false)
      }
    }
    , timerLength)
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily={"Work Sans"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg={"#e8e8e8"}
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflowY={"hidden"}
          >
            {loading ? (
              <Spinner
                size={"xl"}
                w={20}
                h={20}
                alignSelf={"center"}
                margin={"auto"}
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping ? (
                <div>
                  Typing...
                </div>
              ) : (
                <></>
              )}
              
              <Input
                variant={"filled"}
                bg="#e0e0e0"
                placeholder="Enter a message..."
                value={newMessage}
                onChange={typingHandler}
              />
              {/* {} */}
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"} pb={3} fontFamily={"Work Sans"}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
