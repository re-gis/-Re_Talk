import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();

  const { user } = ChatState();
  const userInfo = localStorage.getItem("userInfo");

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        w={"100%"}
        p={"5px 10px 5px 10px"}
        borderwidth={"5px"}
      >
        <Tooltip
          label="Search users to chat..."
          hasArrow
          placement="bottom-end"
        >
          <Button variant={"ghost"}>
            <i className="fa fa-search" aria-hidden="true"></i>
            <Text d={{ base: "none", md: "flex" }} px={"4"}>
              Search user
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize={"2xl"} fontFamily={"Work-sans"}>
          @ReTalk
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            <MenuList></MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={userInfo.name}
                src={userInfo.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModel user={userInfo}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideDrawer;
