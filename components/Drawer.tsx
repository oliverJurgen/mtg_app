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

  return (
    <>
      <Button mt={2} onClick={onOpen}>
        <Text textColor="#000">Show Card</Text>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="lg"
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
