"use client";
import { Box, Flex, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FiltroEmpreendimentoProps {
  onEmpreendimento: number | any;
}
export const EmpreendimentoFilter = ({
  onEmpreendimento,
}: FiltroEmpreendimentoProps) => {
  const [Empreendimento, setEmpreendimento] = useState<number>(0);
  const [Data, setData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const resq = await fetch(`/api/empreendimento/getall`);
      const data = await resq.json();
      setData(data);
    })();
  }, []);

  return (
    <Flex w={"100%"} justifyContent={"start"} alignItems={"center"} gap={"5px"}>
      <Box
        w={"100%"}
        h={"100%"}
        bg={"#F8F8F8"}
        pt={{ base: "10px", md: '0px' }}
      >
        <Select
          textColor={"#00713D"}
          _hover={{ borderColor: "#00613C" }}
          borderColor={"#00713D"}
          placeholder="Empreendimento"
          size="md"
          value={Empreendimento}
          onChange={(e) => {
            setEmpreendimento(Number(e.target.value));
            onEmpreendimento(Number(e.target.value));
          }}
        >
          {Data.length > 0 &&
            Data.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.nome}
              </option>
            ))}
        </Select>
      </Box>
    </Flex>
  );
};
