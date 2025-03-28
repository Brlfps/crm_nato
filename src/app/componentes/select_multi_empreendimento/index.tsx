"use client";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RxCross2, RxCrosshair2 } from "react-icons/rx";
import { BeatLoader } from "react-spinners";

interface EmpreendimentoProps {
  EmpreendimentoDisabled: boolean;
  EmpreendimentoValue: any;
  ConstrutoraId: number | undefined;
}

export default function SelectMultiEmpreendimento({
  EmpreendimentoDisabled,
  EmpreendimentoValue,
  ConstrutoraId,
}: EmpreendimentoProps) {
  const [Empreendimento, setEmpreendimento] = useState<number | undefined>();
  const [EmpreendimentoData, setEmpreendimentoData] = useState<any>([]);
  const [EmpreendimentoArray, setEmpreendimentoArray] = useState<any>([]);
  const [EmpreendimentoArrayTotal, setEmpreendimentoArrayTotal] = useState<any>([]);

  useEffect(() => {
    EmpreendimentoValue(EmpreendimentoArray);
  }, [EmpreendimentoArray]);

  const GetEmpreendimento = async () => {
    const response = await fetch(
      `/api/empreendimento/getall/filter/${ConstrutoraId}`
    );
    const data = await response.json();
    setEmpreendimentoData(data);
  };

  const HandleSelectEmpreendimento = () => {
    const value = Empreendimento;

    const Filtro = EmpreendimentoData.filter(
      (e: any) => e.id === Number(value)
    );
    const Ids = Filtro.map((e: any) => e.id);

    setEmpreendimentoArray([...EmpreendimentoArray, ...Ids]);
    setEmpreendimentoArrayTotal([...EmpreendimentoArrayTotal, ...Filtro]);
  };

  const RendBoard = EmpreendimentoArrayTotal.map((e: any) => {
    return (
      <>
        <Flex
          gap={1}
          border="1px solid #b8b8b8cc"
          p={1}
          alignItems={"center"}
          borderRadius={9}
          bg={"blue.200"}
        >
          <Text fontSize={"0.6rem"}>{e.nome}</Text>
          <Icon
            as={RxCross2}
            fontSize={"0.8rem"}
            onClick={() => {
              setEmpreendimentoArray(
                EmpreendimentoArray.filter((item: any) => item !== e.id)
              );
              setEmpreendimentoArrayTotal(
                EmpreendimentoArrayTotal.filter((item: any) => item !== e)
              );
            }}
            cursor={"pointer"}
          />
        </Flex>
      </>
    );
  });

  useEffect(() => {
    GetEmpreendimento();
  }, [ConstrutoraId]);
  return (
    <>
      <FormLabel>Empreendimento</FormLabel>
      <Flex gap={3}>
        <Select
          placeholder="Selecione o Empreendimento"
          border="1px solid #b8b8b8cc"
          isDisabled={EmpreendimentoDisabled}
          onChange={(e: any) => setEmpreendimento(e.target.value)}
          value={Empreendimento}
        >
          {EmpreendimentoData.length > 0 &&
            EmpreendimentoData.map((e: any) => (
              <option key={e.id} value={e.id}>
                {e.nome}
              </option>
            ))}
        </Select>
        <Button
          colorScheme="green"
          leftIcon={<FaPlus />}
          isLoading={EmpreendimentoDisabled}
          spinner={<BeatLoader size={8} color="white" />}
          onClick={HandleSelectEmpreendimento}
        >
          Adicionar
        </Button>
      </Flex>
      <Flex gap={3} mt={4} flexWrap="wrap">
        {RendBoard}
      </Flex>
    </>
  );
}
