import { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setnewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const statuses = ["success", "error", "warning", "info"];

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success === true)
      return toast({
        status: statuses[1],
        title: "Error",
        description: message,
        isClosable: true,
        duration: 3000,
      });
    else
      toast({
        status: statuses[0],
        title: "Success",
        description: message,
        isClosable: true,
        duration: 3000,
      });

    setnewProduct({ name: "", price: "", image: "" });
  };

  return (
    <>
      <Container maxW={"container.sm"}>
        <VStack spacing={8}>
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Adiciona um novo produto
          </Heading>
          <Box
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            shadow={"md"}
            rounded={"lg"}
          >
            <VStack>
              <Input
                placeholder="Nome do Produto"
                onChange={(event) =>
                  setnewProduct({ ...newProduct, name: event.target.value })
                }
                value={newProduct.name}
                type="text"
                name="name"
                id="name"
              ></Input>
              <Input
                placeholder="Preço do Produto"
                onChange={(e) =>
                  setnewProduct({ ...newProduct, price: e.target.value })
                }
                value={newProduct.price}
                type="number"
                name="price"
                id="price"
              ></Input>
              <Input
                placeholder="Imagem do Produto"
                onChange={(e) =>
                  setnewProduct({ ...newProduct, image: e.target.value })
                }
                name="image"
                id="image"
              />
              <Button colorScheme="blue" onClick={handleAddProduct}>
                Adicionar Produto
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default CreatePage;
