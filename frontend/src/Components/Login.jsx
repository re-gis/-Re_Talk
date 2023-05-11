import React, { useState } from "react";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const postDetails = (files) => {
    // const data = new FormData();
    // data.append("file", files);
    // data.append("upload_preset", "retalk");
    // data.append("cloud_name", "retalk");
    // fetch("https://api.cloudinary.com/v1_1/retalk/image/upload", {
    //     method: "post",
  };

  const handleSubmit = () => {};
  return (
    <>
      <VStack spacing={"5px"} color={"black"}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setEmail(e.target.value)}
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
        >Get Guest User Credentials</Button>
      </VStack>
    </>
  );
};

export default Login;
