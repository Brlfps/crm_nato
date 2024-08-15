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
  Spacer,
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

export default function EmpreendimentoPage({ onDados }: any) {
  const [Usuarios, setUsuarios] = useState<any>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/empreendimento/getall`);
      const data = await response.json();
      console.log(data);
      setUsuarios(data);
    })();
  }, []);

  const handleExcluir = async (id: number) => {
    const response = await fetch(`/api/empreendimento/delete/${id}`, {
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
    <Flex
      flexDir="column"
      minH="100vh"
      background="#F8F8F8"
      overflowY="auto"
      alignItems="center"
      py={10}
      px={4}
      w={"100%"}
    >
      <Flex mb={8} justifyContent="center" alignItems="center">
        <Box ml={4}>
          <Text
            fontSize="25px"
            fontWeight="bold"
            color="#333333"
            textAlign="center"
          >
            EMPREENDIMENTO CADASTRADOS
          </Text>
        </Box>
      </Flex>
      <Stack spacing={4} w="100%" maxW="1200px">
        {Usuarios.map((solicitacao: any) => (
          <Box
            key={solicitacao.id}
            border="3px solid #E8E8E8"
            borderRadius="8px"
            p={8}
            textAlign="center"
            flexDir="column"
            alignItems="center"
            mb={8}
            w="100%"
          >
            <Box
              display={{ base: "block", md: "flex" }}
              justifyContent="space-between"
              alignItems="start"
              gap={10}
              w="100%"
            >
              <Box
                mb={{ base: 4, md: 0 }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Text fontWeight="bold" fontSize="md">
                  NOME:
                </Text>
                {solicitacao.nome}
              </Box>

              <Box textAlign={{ base: "center", md: "right" }}>
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
                          fontWeight="bold"
                          fontSize="20px"
                          textAlign="center"
                        >
                          Você tem certeza de que deseja deletar Este
                          Empreendimento?
                        </Text>
                      </ModalBody>
                      <ModalFooter>
                        <Button leftIcon={<IoIosArrowBack />} onClick={onClose}>
                          Cancelar
                        </Button>
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
        ))}
      </Stack>
    </Flex>
  );
}
