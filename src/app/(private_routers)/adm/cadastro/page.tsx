"use client";

import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import Aprovacao from "../_components/aprovacao";
import Usuarios from "../_components/usuario";
import EmpreendimentoPage from "../_components/empreendimento";
import ConstrutoraPage from "../_components/construtora";

export default function PageCadastrados() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      flexDir="column"
      h="100%"
      background="#F8F8F8"
      overflowY={"auto"}
      alignItems="center"
      py={10}
      px={4} // Adicionei um padding lateral para melhorar o espaçamento em telas menores
    >
      <Box
        border="3px solid #E8E8E8"
        borderRadius="8px"
        p={8}
        w={useBreakpointValue({ base: "100%", md: "80%", lg: "60em" })}
        textAlign="center"
        flexDir="column"
        alignItems="center"
        mb={8}
      >
        <Flex mb={8} justifyContent="center" alignItems="center">
          <Box zIndex={1} position="initial">
            <BotaoRetorno />
          </Box>
          <Box ml={4}>
            <Text fontSize="32px" fontWeight="bold" color="#333333">
              PAINEL ADMINISTRATIVO
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box
        p={8}
        w={useBreakpointValue({ base: "100%", md: "80%", lg: "60em" })}
        textAlign="center"
        display={{ base: "block", md: "flex" }} // Mudança de 'none' para 'block' para garantir que o componente seja exibido em telas menores
        flexDir="column"
        alignItems="center"
        mt={8}
      >
        <Usuarios />
        <EmpreendimentoPage />
        <ConstrutoraPage />
      </Box>
    </Flex>
  );
}
