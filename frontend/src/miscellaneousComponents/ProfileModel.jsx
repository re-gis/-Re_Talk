import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const ProfileModel = ({ user, children }) => {
  const o = JSON.stringify(user)
  const au = JSON.parse(o)
  const us = localStorage.getItem("userInfo");
  // const userInfo = JSON.parse(us)
  const u = JSON.parse(us);
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        ></IconButton>
      )}
      <Modal
        size={"lg"}
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent h={"410px"}>
          <ModalHeader
            fontSize={"40px"}
            fontFamily={"Work-sans"}
            d="flex"
            justifyContent={"center"}
          >
            {user ? au : u.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Image
              borderRadius={"full"}
              boxSize={"150px"}
              src={u.pic}
              alt={user ? au : u.name}
            ></Image>
            <Text fontSize={"28px"} fontFamily={"Work-sans"}>
              Email: {u.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
