import React from "react";
import { ChatState } from "../context/ChatProvider";
import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  // const {user} = ChatState()
  const userInfo = localStorage.getItem("userInfo");
  const u = JSON.parse(userInfo);
  return (
    <Box
      onClick={handleFunction}
      cursor={"pointer"}
      bg={"#e8e8e8"}
      _hover={{ backgroundColor: "#38b2ac", color: "white" }}
      w={"100%"}
      display={"flex"}
      px={3}
      py={2}
      mb={2}
      borderRadius={"lg"}
    >
      <Avatar mr={2} size={"sm"} cursor={"pointer"} name={u.name} src={u.pic} />
      <Box>
        <Text>{u.name}</Text>
        <Text fontSize={'xs'}>
            <b>Email: </b> {u.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
