"use client";

import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { METHODS } from "http";
import { useRouter } from "next/navigation";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

export default function Usuarios({ onDados }: any) {
  const [Usuarios, setUsuarios] = useState<any>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/usuario/getall`);
      const data = await response.json();
      console.log(data);
      const filter = data.filter((solicitacao: any) => solicitacao.status);
      setUsuarios(filter);
    })();
  }, []);

  const handleExcluir = async (id: number) => {
    const response = await fetch(`/api/usuario/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: true,
      }),
    });

    if (response.ok) {
      toast({
        title: "Sucesso!",
        description: "Usuario excluído com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      window.location.reload();
    }
  };

  return (
    <>
      <Flex w={"100%"} mb={8} justifyContent="center" alignItems="center">
        <Box ml={4}>
          <Text fontSize="25px" fontWeight="bold" color="#333333">
            USUARIOS CADASTRADOS
          </Text>
        </Box>
      </Flex>
      <Stack spacing={4}>
        {Usuarios.map((solicitacao: any) => {
          return (
            <Box
              key={solicitacao.id}
              border="3px solid #E8E8E8"
              borderRadius="8px"
              p={8}
              textAlign="center"
              flexDir="column"
              alignItems="center"
              mb={8}
              w={"full"}
            >
              <Box
                display={{ base: "block", md: "flex" }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  w={{ base: "100%", md: "40%" }}
                  mb={{ base: 4, md: 0 }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Text fontWeight="bold" fontSize="md">
                    NOME:
                  </Text>
                  {solicitacao.nome}
                </Box>
                <Box
                  w={{ base: "100%", md: "15%" }}
                  mb={{ base: 4, md: 0 }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Text fontWeight="bold" fontSize="md">
                    FUNÇÃO:
                  </Text>
                  {solicitacao.cargo}
                </Box>

                <Box
                  w={{ base: "100%", md: "40%" }}
                  mb={{ base: 4, md: 0 }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Text fontWeight="bold" fontSize="md">
                    Construtora:
                  </Text>
                  {solicitacao.construtora.map((item: any) => (
                    <Text>
                      {item.razaosocial.split(" ")[0] +
                        " " +
                        item.razaosocial.split(" ")[1]}
                    </Text>
                  ))}
                </Box>

                <Box
                  w={{ base: "100%", md: "35%" }}
                  mb={{ base: 4, md: 0 }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Text fontWeight="bold" fontSize="md">
                    Empreendimento:
                  </Text>
                  {solicitacao.empreendimento.map((item: any) => (
                    <Text>{item.nome}</Text>
                  ))}
                </Box>
                <Box
                  w={{ base: "100%", md: "8%" }}
                  textAlign={{ base: "center", md: "right" }}
                >
                  <Text fontWeight="bold" fontSize="md">
                    Excluir
                  </Text>

                  <Box
                    display="flex"
                    justifyContent={{ base: "center", md: "flex-end" }}
                  >
                    <ButtonGroup variant="solid" size="sm" spacing={3}>
                      <IconButton
                        colorScheme="red"
                        variant="outline"
                        icon={<BsFillTrashFill />}
                        aria-label="Delete"
                        onClick={onOpen}
                      />
                    </ButtonGroup>

                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />

                      <ModalContent>
                        <ModalBody p={10}>
                          <Text
                            fontWeight={"bold"}
                            fontSize={"20px"}
                            textAlign={"center"}
                          >
                            Você tem certeza de que deseja deletar Este usuario?
                          </Text>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            leftIcon={<IoIosArrowBack />}
                            onClick={onClose}
                          />

                          <Button
                            leftIcon={<BsFillTrashFill />}
                            onClick={() => handleExcluir(solicitacao.id)}
                            colorScheme="red"
                          >
                            Confirmar Exclusão
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </>
  );
}
