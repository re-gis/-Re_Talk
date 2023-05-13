import { Box, Container, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Signup from "../Components/Signup";
import Login from "../Components/Login";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      history.push("/chats");
    }
  }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent={"center"}
        p={3}
        bg={"white"}
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text fontSize={"4xl"} fontFamily={"Work sans"} color={"black"}>
          @ReTalk
        </Text>
      </Box>

      <Box
        bg={"white"}
        p={4}
        borderRadius={"lg"}
        w={"100%"}
        borderWidth={"1px"}
        color={"black"}
      >
        <Tabs variant={"soft-rounded"}>
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
