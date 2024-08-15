"use client";

import { Box, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FiltroNomeProps {
  onNome: string | any;
  setBlank: any;
}

export const NomeFilter = ({ onNome, setBlank }: FiltroNomeProps) => {
  const [FilterNome, setFilterNome] = useState<string>("");

  useEffect(() => {
    if (setBlank === true && FilterNome) {
      setFilterNome("");
    }
    onNome(FilterNome);
  }, [FilterNome, onNome, setBlank]);

  return (
    <Flex w={"100%"} justifyContent={"start"} alignItems={"center"} >
      <Box w={"full"} h={"100%"} bg={"#F8F8F8"}>
        <Input
          textColor={"#00713D"}
          _hover={{ borderColor: "#00613C" }}
          borderColor={"#00713D"}
          placeholder="Nome Completo"
          size="md"
          type="text"
          value={FilterNome}
          onChange={(e) => {
            setFilterNome(e.target.value);
            onNome(e.target.value);
          }}
        />
      </Box>
    </Flex>
  );
};
