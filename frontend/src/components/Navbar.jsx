import { Container, Flex, Text, HStack, useColorMode, Button } from "@chakra-ui/react";
import { LuPlusSquare} from "react-icons/lu";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";




function Navbar() {
    const {colorMode, toggleColorMode} = useColorMode();
    

  return (
    <>
      <Container maxW={"1140px"} px={4}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Text
            bgGradient="linear(to-l, cyan.400, blue.500)"
            bgClip="text"
            fontSize={{ base: "22", sm: "28" }}
            fontWeight="extrabold"
            textTransform={"uppercase"}
            textAlign={"center"}
          >
            <Link to={"/"}> Mini Store</Link>
          </Text>
          <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
              <Button>
                <LuPlusSquare fontSize={20} />
              </Button>
            </Link>
            <Link>
                <Button onClick={toggleColorMode}> 
                   {colorMode === "light" ?  <MdOutlineDarkMode />:<MdLightMode />}
                   
                </Button>
            </Link>
          </HStack>
        </Flex>
      </Container>
    </>
  );
}

export default Navbar;
