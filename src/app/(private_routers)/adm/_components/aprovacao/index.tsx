"use client";

import {
  Box,
  Container,
  Heading,
  IconButton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
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
import { FaCheck, FaTimes } from "react-icons/fa";

export default function Aprovacao({ onDados }: any) {
  const [Aprovacao, setAprovacao] = useState<any>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/usuario/getall`);
      const data = await response.json();
      const filter = data.filter(
        (solicitacao: any) => solicitacao.status === false
      );
      setAprovacao(filter);
    })();
  }, []);

  const handleAprovar = async (id: number) => {
    const response = await fetch(`/api/usuario/put/${id}`, {
      method: "PUT",
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
        description: "Solicitação aprovada com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      if (refresh > 0) {
        window.location.reload();
      }
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={8}>
        Aprovação de Solicitações
      </Heading>
      <Stack spacing={4}>
        {Aprovacao.map((solicitacao: any) => {
          return (
            <Box
              key={solicitacao.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
            >
              <Box
                display={{ base: "block", md: "flex" }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  w={{ base: "100%", md: "50%" }}
                  mb={{ base: 4, md: 0 }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Text fontWeight="bold" fontSize="md">
                    NOME:
                  </Text>
                  {solicitacao.nome}
                </Box>
                <Box
                  w={{ base: "100%", md: "25%" }}
                  mb={{ base: 4, md: 0 }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Text fontWeight="bold" fontSize="md">
                    FUNÇÃO:
                  </Text>
                  {solicitacao.cargo}
                </Box>
                <Box
                  w={{ base: "100%", md: "25%" }}
                  mb={{ base: 4, md: 0 }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Text fontWeight="bold" fontSize="md">
                    STATUS:
                  </Text>
                  {solicitacao.status.toString()}
                </Box>
                <Box
                  w={{ base: "100%", md: "25%" }}
                  textAlign={{ base: "center", md: "right" }}
                >
                  <Text fontWeight="bold" fontSize="md">
                    APROVAR:
                  </Text>
                  <Box
                    display="flex"
                    justifyContent={{ base: "center", md: "flex-end" }}
                  >
                    <IconButton
                      onClick={() => handleAprovar(solicitacao.id)}
                      aria-label="Aprovar"
                      icon={<FaCheck />}
                      colorScheme="green"
                      size="sm"
                      mr={2}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
}
