import React from "react";
import {
  Text,
  Flex,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useTheme } from "../contexts/ThemeContext";

const CardDrawer: React.FC<any> = ({ children }) => {
  const [theme] = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   const btnRef = React.useRef();

  console.log(theme.color[0]);
  return (
    <>
      <Button mt={2} onClick={onOpen}>
        <Text textColor="#000">Show Card</Text>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        // size={{ base: "full", md: "lg" }}
        size="lg"
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody bg="#484d57">
            <Flex mt="80px" justify="center" align="center">
              {children}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CardDrawer;
