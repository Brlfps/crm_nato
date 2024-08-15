"use client";

import CheckEmail from "@/app/componentes/checkEmail";
import CpfMask from "@/app/componentes/cpf_mask";
import { ModalConsultaRegistro } from "@/app/componentes/modal_consulra_registro";
import { SenhaComponent } from "@/app/componentes/Senha";
import { Whatsapp } from "@/app/componentes/whatsapp";
import {
  Box,
  Button,
  FormLabel,
  GridItem,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select,
  SimpleGrid,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mask, unMask } from "remask";

export default function FormEmpreendime() {
  const [Nome, setNome] = useState("");
  const [Cidade, setCidade] = useState("");
  const [Uf, setUf] = useState("");
  const [Data, setData] = useState<any>([]);
  const [Construtora, setConstrutora] = useState<number | undefined>();
  const [ConstrutoraData, setConstrutoraData] = useState<any>([]);
  const toast = useToast();
  const route = useRouter();

  useEffect(() => {
    const getConstrutora = async () => {
      const response = await fetch("/api/construtora/getall");
      const data = await response.json();
      setConstrutoraData(data);
    };
    getConstrutora();
  }, []);

  const handlesubmit = async () => {
    if (!Nome || !Cidade || !Uf || !Construtora || !Data) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const data = {
        nome: Nome,
        construtora: Construtora ? Number(Construtora) : null,
        uf: Uf,
        cidade: Cidade,
        dt_inicio: Data,
      };
      try {
        const response = await fetch("/api/empreendimento/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const dados = await response.json();
        toast({
          title: "Sucesso",
          description: "Cadastrado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        route.back();
      } catch (error: any) {
        toast({
          title: "Erro ao cadastrar",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const GetConstrutora = (e: any) => {
    const value = e.target.value;
    async () => {
      const response = await fetch(
        `/api/empreendimento/getall/filter/${Number(value)}`
      );
      const data = await response.json();
      setConstrutoraData(data);
    };
    setConstrutora(Number(value));
  };

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={6}
        mt={6}
        alignItems={"end"}
      >
        <GridItem>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setNome(e.target.value)}
          />
        </GridItem>
        <GridItem>
          <FormLabel>Cidade</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setCidade(e.target.value)}
          />
        </GridItem>
        <GridItem>
          <FormLabel>UF</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setUf(e.target.value)}
          />
        </GridItem>
        <GridItem>
          <FormLabel>Construtora</FormLabel>
          <Select
            placeholder="Selecione uma construtora"
            border="1px solid #b8b8b8cc"
            onChange={GetConstrutora}
            value={Construtora}
          >
            {ConstrutoraData.length > 0 &&
              ConstrutoraData.map((construtora: any) => (
                <option key={construtora.id} value={construtora.id}>
                  {construtora.razaosocial}
                </option>
              ))}
          </Select>
        </GridItem>

        <GridItem>
          <FormLabel>Data Inicio</FormLabel>
          <Input
            type="date"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setData(e.target.value)}
          />
        </GridItem>
      </SimpleGrid>
      <Button
        mt={5}
        mb={5}
        variant="outline"
        width="250px"
        height="50px"
        border="1px solid #b8b8b8cc"
        maxWidth="100%"
        textColor="Black"
        onClick={handlesubmit}
      >
        CRIAR CONTA
      </Button>
    </>
  );
}
function setEmpreendimentoData(data: any) {
  throw new Error("Function not implemented.");
}
