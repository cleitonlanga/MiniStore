import {
  Box,
  Image,
  Heading,
  HStack,
  Text,
  VStack,
  Input,
  Button,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const toast = useToast();
  const statuses = ["success", "error", "warning", "info"];

  const [updatedProduct, setUpdateProduct] = useState(product);

  const { updateProduct } = useProductStore();
  const handleUpdateProduct = async (id, updatedProduct) => {
    const { success, message } = await updateProduct(id, updatedProduct);
    if (!success) {
      toast({
        status: statuses[1],
        title: "Error",
        description: message,
        isClosable: true,
        duration: 3000,
      });
    } else {
      toast({
        status: statuses[0],
        title: "Success",
        description: message,
        isClosable: true,
        duration: 3000,
      });
    }
    onClose();
  };

  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toast({
        status: statuses[1],
        title: "Error",
        description: message,
        isClosable: true,
        duration: 3000,
      });
    } else {
      toast({
        status: statuses[0],
        title: "Success",
        description: message,
        isClosable: true,
        duration: 3000,
      });
    }
  };

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
          src={product.image}
          alt={product.name}
          h={48}
          w="full"
          objectFit="cover"
        />
        <Box p={4}>
          <Heading as={"h3"} size={"md"} mb={2}>
            {product.name}
          </Heading>

          <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
            ${product.price}
          </Text>

          <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              colorScheme="blue"
              onClick={onOpen}
            />
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => handleDeleteProduct(product._id)}
            />
          </HStack>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualize o producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Input
                placeholder="Nome do producto"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updatedProduct, name: e.target.value })
                }
              ></Input>
              <Input
                placeholder="Preço do producto"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updatedProduct, price: e.target.value })
                }
              ></Input>
              <Input
                placeholder="Imagem do producto"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdateProduct({ ...updatedProduct, image: e.target.value })
                }
              ></Input>
            </VStack>
          </ModalBody>{" "}
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Atualizar
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={onClose}>
              cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
