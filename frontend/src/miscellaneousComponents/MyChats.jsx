import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, Button, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "../Components/ChatLoading";

const MyChats = () => {
  const userInfo = localStorage.getItem("userInfo");
  const u = JSON.parse(userInfo);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + u.token,
        },
      };
      const { data } = await axios.get(`/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Internal server error...",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(u);
    fetchChats();
  }, []);

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir={"column"}
        alignItems={"center"}
        p={3}
        bg={"white"}
        w={{ base: "100%", md: "31%" }}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily={"Work sans"}
          display={"flex"}
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          My Chats
          <Button
            display={"flex"}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          ></Button>
        </Box>

        <Box
          display={"flex"}
          flexDir={"column"}
          p={3}
          bg={"#f8f8f8"}
          w={"100%"}
          borderRadius={"lg"}
          h={"100%"}
          overflowY={"hidden"}
        >
          {chats ? (
            <h1>hello</h1>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;
