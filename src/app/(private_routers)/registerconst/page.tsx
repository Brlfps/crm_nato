import { Stack, Text, Box, Button, Flex } from "@chakra-ui/react";

import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import { ModalConsultaRegistro } from "@/app/componentes/modal_consulra_registro";

import FormEmpreendime from "../registeremp/form_empreendimento";
import FormConstutora from "./form_const";

export default function RegisterConst() {
  return (
    <Flex
      minH="100vh"
      w="100%"
      overflowY="auto"
      justifyContent="center"
      alignItems="center"
      bg="#F8F8F8"
      py="2rem"
    >
      <Box
        border="3px solid #E8E8E8"
        borderRadius="8px"
        padding={8} // Usa valores de espaçamento padrão do Chakra
        w={{ base: "90%", sm: "80%", md: "60em" }} // Responsivo para diferentes tamanhos de tela
        maxW="60em" // Define um tamanho máximo
        textAlign="center"
      >
        <Flex
          w="100%"
          justifyContent="center"
          mb={5}
          flexDirection={{ base: "column", sm: "row" }} // Muda a direção do flex em telas menores
          alignItems="center" // Centraliza o conteúdo verticalmente em telas pequenas
        >
          <Box zIndex={1} position="initial" mb={{ base: 4, sm: 0 }}>
            <BotaoRetorno />
          </Box>
          <Box width="100%">
            <Text
              fontWeight="regular"
              fontSize={{ base: "24px", md: "32px" }} // Responsivo para diferentes tamanhos de texto
              color="#333333"
            >
              Cadastro de Construtora
            </Text>
          </Box>
        </Flex>
        <FormConstutora/>
      </Box>
    </Flex>
  );
}
