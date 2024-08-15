"use client";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import { ModalPrimeAsses } from "@/app/componentes/prime_asses";
import { FiltroComponent } from "./home/componentes/filter/filtro_geral";
import PerfilHome from "./home/componentes/perfil_home";
import { Tabela } from "./home/componentes/tabela";


export default function HomePage() {
  const [Data, setData] = useState<any>([]);

  const HandleFilter = (e: SetStateAction<any>) => {
    if (e) {
      setData(e);
    }
  };

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
      <ModalPrimeAsses />
      <Box
        w={{ base: "90%", md: "80%", lg: "70%" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack spacing={4} w="100%" bg="#F8F8F8" padding="10px">
          <Box justifyContent="center" alignItems="center">
            <PerfilHome />
          </Box>
          <Box justifyContent="center" alignItems="center">
            <FiltroComponent onData={HandleFilter} />
          </Box>
          <Box justifyContent="center" alignItems="center">
            <Tabela onDados={Data} />
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
