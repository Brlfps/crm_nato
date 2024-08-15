"use client";

import { Box, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FiltroCpfProps {
  onCpf: string | any;
  setBlank: any;
}

export const CpfFilter = ({ onCpf, setBlank }: FiltroCpfProps) => {
  const [FilterCpf, setFilterCpf] = useState<string>("");

  useEffect(() => {
    if (setBlank === true && FilterCpf) {
      setFilterCpf("");
    }
    onCpf(FilterCpf);
  }, [FilterCpf, onCpf, setBlank]);

  return (
    <Flex w={"100%"} justifyContent={"start"} alignItems={"center"} gap={"5px"}>
      <Box w={"full"} h={"100%"} bg={"#F8F8F8"}>
        <Input
          textColor={"#00713D"}
          _hover={{ borderColor: "#00613C" }}
          borderColor={"#00713D"}
          placeholder="Cpf"
          size="md"
          type="text"
          value={FilterCpf}
          onChange={(e) => {
            setFilterCpf(e.target.value);
            onCpf(e.target.value);
          }}
        />
      </Box>
    </Flex>
  );
};
