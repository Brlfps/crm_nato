import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import { Box, Flex } from "@chakra-ui/react";

import CreateAlertGeral from "@/app/componentes/bt_creat_Alert_geral";

export default function PainelFinanceiro() {
  return (
    <>
      <Box
        w={{ base: "90%", md: "80%", lg: "70%" }}
        h={"90.9dvh"}
        m={"auto"}
        overflowY={"auto"}
      >
        {/* botoes */}
        <Flex py={5} gap={5}>
          <Box zIndex={1} position="initial">
            <BotaoRetorno rota="/" />
          </Box>
          <Flex>
            <CreateAlertGeral />
          </Flex>
        </Flex>
      </Box>

      {/* dashboard */}
      <Box></Box>
    </>
  );
}
