'use client';
import { Box, BoxProps, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface CardGridDateNascimento extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

export default function CardGridDateNascimento({
  DataSolicitacao,
  ...props
}: CardGridDateNascimento) {
  const [Date, setDate] = useState<string>("");

  useEffect(() => {
    if (DataSolicitacao?.dt_nascimento) {
      setDate(DataSolicitacao?.dt_nascimento.split("T")[0]);
    }
  }, [DataSolicitacao]);
  
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md" m={0}>
          Data de Nascimento
        </FormLabel>
        <Input
          type="date"
          name="DataNascimento"
          variant="flushed"
          value={Date}
          onChange={(e) => setDate(e.target.value)}
          px={1}
          bg={"gray.100"}
          borderColor={"gray.400"}
        />
      </Box>
    </>
  );
}
