"use client";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  IconButton,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RxCross2, RxCrosshair2 } from "react-icons/rx";
import { BeatLoader } from "react-spinners";

interface FinanceiroProps {
  FinanceDisabled: boolean;
  FinanceiroValue: any;
}

export default function SelectMultFinanceiro({
  FinanceDisabled,
  FinanceiroValue,
}: FinanceiroProps) {
  const [Financeiro, setFinanceiro] = useState<number | undefined>();
  const [FinanceiroData, setFinanceiroData] = useState<any>([]);
  const [FinanceiroArray, setFinanceiroArray] = useState<any>([]);
  const [FinanceiroArrayTotal, setFinanceiroArrayTotal] = useState<any>([]);

  useEffect(() => {
    FinanceiroValue(FinanceiroArray);
  }, [FinanceiroArray]);

  const GetFinanceiras = async () => {
    const response = await fetch(`/api/financeira/getall`);
    const data = await response.json();
    setFinanceiroData(data);
  };

  const HandleSelectFinanceiro = () => {
    const value = Financeiro;

    const Filtro = FinanceiroData.filter(
      (financeiro: any) => financeiro.id === Number(value)
    );
    const Ids = Filtro.map((financeiro: any) => financeiro.id);

    setFinanceiroArray([...FinanceiroArray, ...Ids]);
    setFinanceiroArrayTotal([...FinanceiroArrayTotal, ...Filtro]);
  };

  const RendBoard = FinanceiroArrayTotal.map((financeiro: any) => {
    const PrimeiroNome =
      financeiro.fantasia.split(" ")[0] || financeiro.fantasia;
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
          <Text fontSize={"0.6rem"}>{PrimeiroNome}</Text>
          <Icon
            as={RxCross2}
            fontSize={"0.8rem"}
            onClick={() => {
              setFinanceiroArray(
                FinanceiroArray.filter((item: any) => item !== financeiro.id)
              );
              setFinanceiroArrayTotal(
                FinanceiroArrayTotal.filter((item: any) => item !== financeiro)
              );
            }}
            cursor={"pointer"}
          />
        </Flex>
      </>
    );
  });

  useEffect(() => {
    GetFinanceiras();
  }, []);
  return (
    <>
      <FormLabel>Financeira</FormLabel>
      <Flex gap={3}>
        <Select
          placeholder="Selecione uma financeira"
          border="1px solid #b8b8b8cc"
          isDisabled={FinanceDisabled}
          onChange={(e: any) => setFinanceiro(e.target.value)}
          value={Financeiro}
        >
          {FinanceiroData.length > 0 &&
            FinanceiroData.map((financeiro: any) => (
              <option key={financeiro.id} value={financeiro.id}>
                {financeiro.fantasia}
              </option>
            ))}
        </Select>
        <Button
          colorScheme="green"
          leftIcon={<FaPlus />}
          isLoading={FinanceDisabled}
          spinner={<BeatLoader size={8} color="white" />}
          onClick={HandleSelectFinanceiro}
        >
          Adicionar
        </Button>
      </Flex>
      <Flex gap={3} mt={4} flexWrap="wrap">{RendBoard}</Flex>
    </>
  );
}
