import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../miscellaneousComponents/SideDrawer";
import MyChats from "../miscellaneousComponents/MyChats";
import ChatBox from "../miscellaneousComponents/ChatBox";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const userInfo = localStorage.getItem("userInfo");
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);
  return (
    <>
      <div style={{ width: "100%" }}>
        {userInfo && <SideDrawer />}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          w={"100%"}
          h={"91.5vh"}
          p={"10px"}
        >
          {userInfo && <MyChats fetchAgain={fetchAgain} />}
          {userInfo && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </div>
    </>
  );
};

export default ChatPage;
