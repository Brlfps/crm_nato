"use client";

import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

export default function ConstrutoraPage({ onDados }: any) {
  const [Usuarios, setUsuarios] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/construtora/getall`);
      const data = await response.json();
      setUsuarios(data);
    })();
  }, []);

  const handleExcluir = async (id: number) => {
    const response = await fetch(`/api/construtora/delete/${id}`, {
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
      <Flex mb={8} justifyContent="center" alignItems="center">
        <Box ml={4}>
          <Text fontSize="25px" fontWeight="bold" color="#333333">
            CONSTRUTORA CADASTRADOS
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
              p={10}
              textAlign="center"
              flexDir="column"
              alignItems="center"
              mb={8}
            >
              <Box
                display={{ base: "block", md: "flex" }}
                justifyContent="space-between"
                alignItems="start"
                gap={10}
              >
                <Box
                  w={{ base: "100%", md: "100%" }}
                  mb={{ base: 4, md: 0 }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Text fontWeight="bold" fontSize="md">
                    NOME:
                  </Text>
                  {solicitacao.razaosocial}
                </Box>
                <Box
                  w={{ base: "100%", md: "40%" }}
                  mb={{ base: 4, md: 0 }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Text fontWeight="bold" fontSize="md">
                    CNPJ:
                  </Text>
                  {solicitacao.cnpj}
                </Box>
                <Box
                  w={{ base: "100%", md: "40%" }}
                  mb={{ base: 4, md: 0 }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Text fontWeight="bold" fontSize="md">
                    TEL:
                  </Text>
                  {solicitacao.tel}
                </Box>
                <Box
                  w={{ base: "100%", md: "100%" }}
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
