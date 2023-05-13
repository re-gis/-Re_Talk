import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Stack,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chat");
    } catch (error) {
      toast({
        title: "Invalid Credentials",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <VStack spacing={"5px"} color={"black"}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <InputRightElement>
              <Button
                mr={"5px"}
                h={"1.75rem"}
                size={"sm"}
                onClick={handleClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="blue"
          width={"100%"}
          style={{ marginTop: 15 }}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          variant={"solid"}
          colorScheme="red"
          width={"100%"}
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </>
  );
};

export default Login;
