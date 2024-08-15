"use client";
import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BotoesFunction } from "../botoes/bt_group_function";

interface TabelaProps {
  onDados: {
    nome: string;
    andamento: string;
    data: string;
    empreendimento: number;
  };
}

async function handleGetUpdate() {
  const res = await fetch(`/api/solicitacao/getall`);
  const data = await res.json();
  return data;
}

export const Tabela = ({ onDados }: TabelaProps) => {
  const [Data, setData] = useState<solictacao.SolicitacaoGetType[]>([]);
  const [FilterData, setFilterData] = useState<any>([]);
  const { data: session } = useSession();
  const user = session?.user;
  const token = session?.token;

  useEffect(() => {
    (async () => {
      const data = await handleGetUpdate();
      setData(data);
    })();
  }, [token]);

  const Update = async (id: number) => {
    // const data = await handleGetUpdate();
    // setData(data);

    const newData = Data.filter((item: any) => {
      return item.id !== id;
    });
    setData(newData);
  };

  useEffect(() => {
    const { nome, andamento, empreendimento } = onDados;

    const Filter = Data.filter((item: solictacao.SolicitacaoGetType) => {
      const itemDate = item.fcweb?.dt_agenda
        ? new Date(item.fcweb.dt_agenda)
        : null;

      const matchNome = nome
        ? item.nome.toLowerCase().includes(nome.toLowerCase())
        : true;
      const matchAndamento = andamento
        ? item.fcweb?.andamento.toLowerCase().includes(andamento.toLowerCase())
        : true;

      console.log(item.empreedimento.id, empreendimento);

      const matchEmpreendimento = empreendimento
        ? item.empreedimento?.id === empreendimento
        : true;

      return matchNome && matchAndamento && matchEmpreendimento;
    });

    console.log(Filter);
    setFilterData(Filter);
  }, [Data, onDados]);

  const tabela =
    FilterData.length > 0 &&
    FilterData.map((item: solictacao.SolicitacaoGetType) => {
      console.log(item.fcweb);
      const dtAgenda =
        item &&
        item.fcweb &&
        item.fcweb.dt_agenda &&
        (() => {
          const originalDate = new Date(item.fcweb.dt_agenda);

          const saoPauloOffset = -3 * 60; // Em minutos (UTC-3)

          const currentOffset = originalDate.getTimezoneOffset(); // Em minutos

          const adjustedDate = new Date(
            originalDate.getTime() + (currentOffset - saoPauloOffset) * 60000
          );

          return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
          }).format(adjustedDate);
        })();

      const TypeValid = item.fcweb && item.fcweb.validacao;
      const HoraAgenda = item.fcweb?.hr_agenda?.split("T")[1].split(".")[0];
      const andamento = item.fcweb && item.fcweb.andamento;
      const statusPg = item.fcweb && item.fcweb.estatos_pgto;
      const colors = item.ativo ? "transparent" : "red.400";
      return (
        <Tr key={item.id} bg={colors}>
          <Td>
            <BotoesFunction id={item.id} onUpdate={Update} />
          </Td>
          {user?.hierarquia === "ADM" && <Td>{item.id}</Td>}
          <Td>{item.nome}</Td>
          <Td>
            <Box>{dtAgenda}</Box>
            <Box>{HoraAgenda}</Box>
            <Box>{TypeValid}</Box>
          </Td>
          <Td>{andamento}</Td>
          {/* <Td>{item.ass_doc && item.ass_doc}</Td> */}
          {user?.hierarquia !== "USER" && <Td>{statusPg}</Td>}
          {user?.hierarquia !== "USER" && <Td>{item.fcweb?.valorcd}</Td>}
        </Tr>
      );
    });

  return (
    <>
      {user && (
        <Flex
          w={"full"}
          bg={"white"}
          shadow={"md"}
          borderRadius={"15px"}
          p={{ base: "10px", md: "20px" }}
          alignContent={"center"}
          justifyContent={"space-evenly"}
          overflowX={{ base: "auto", md: "hidden" }}
        >
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>FUNÇÕES</Th>
                {user?.hierarquia === "ADM" && <Th>ID</Th>}
                <Th>NOME</Th>
                <Th>AGENDAMENTO</Th>
                <Th>CERTIFICADO</Th>
                {/* <Th>CCA</Th> */}
                {user?.hierarquia !== "USER" && <Th>STATUS PGMNT</Th>}
                {user?.hierarquia !== "USER" && <Th>VALOR</Th>}
              </Tr>
            </Thead>
            <Tbody>{FilterData.length > 0 && tabela}</Tbody>
          </Table>
        </Flex>
      )}
    </>
  );
};
