import {
  Box,
  Image,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const ProductCard = ({ products }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");


  return (
    <>
      <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
      >
        <Image
          src={products.image}
          alt={products.name}
          h={48}
          w={"full"}
          objectFit={"cover"}
        />
        <Box p={4}>
          <Heading as={"h3"} size={"md"} mb={2}>
            {products.name}
            <Text fontweight={"bold"} fontsize={"xl"} color={textColor} mb={4}>
              ${products.price}
            </Text>

            <HStack spacing={2}>
              <IconButton
                icon={<EditIcon />}
                colorScheme="blue"
              />
              <IconButton icon={<DeleteIcon />} colorScheme="red" />
            </HStack>
          </Heading>
        </Box>
      </Box>
    </>
  );
};

export default ProductCard;
