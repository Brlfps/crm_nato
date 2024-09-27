"use client";

import { BtnExcluirUser } from "@/app/componentes/btm_exluir_user";
import { BtnResetSenha } from "@/app/componentes/btn_reset_senha";
import { Box, Flex, IconButton, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { mask } from "remask";

interface UsuariosType {
  data: any;
}

export default function Usuarios({ data }: UsuariosType) {
  const [Usuarios, setUsuarios] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
   if(data){
    setUsuarios(data);
   }
  }, [data]);

  return (
    <>
      <Flex w={"100%"} mb={8} justifyContent="center" alignItems="center">
       
      </Flex>
      <Flex gap={4} flexWrap={"wrap"}>
        {Usuarios.map((solicitacao: UsuariosType.GetAllUsers) => {
          return (
            <Box
              key={solicitacao.id}
              border="3px solid #E8E8E8"
              borderRadius="8px"
              p={3}
              flexDir="column"
              w={{ base: "100%", md: "30%", lg: "20em" }}
              fontSize={"0.8rem"}
            >
              <Flex w="100%" flexDir={"column"} gap={4}>
                <Flex gap={2}>
                  <Text  fontWeight="bold" fontSize="sm">
                    ID:
                  </Text>
                  {solicitacao.id}
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    NOME:
                  </Text>
                  {solicitacao.nome}
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    FUNÇÃO:
                  </Text>
                  {solicitacao.cargo}
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    HIERARQUIA:
                  </Text>
                  {solicitacao.hierarquia}
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    Telefone:
                  </Text>
                  {mask(solicitacao.telefone, [
                    "(99) 9 9999-9999",
                    "(99) 9999-9999",
                  ])}
                  <IconButton
                    icon={<FaCopy />}
                    aria-label="copy"
                    size={"xs"}
                    bg={"blue.500"}
                    color={"white"}
                    onClick={() => {
                      navigator.clipboard.writeText(solicitacao.telefone);
                      toast({
                        title: "Numero copiado!",
                        status: "info",
                        duration: 2000,
                        position: "top-right",
                      })
                    }}
                  />
                </Flex>
              </Flex>
              <Flex w="100%" flexWrap={"wrap"} gap={4} mt={2}>
                <Flex gap={2} >
                  <Text fontWeight="bold" fontSize="sm">
                    Construtora:
                  </Text>

                  {solicitacao.construtora
                    ?.map((item: any) => item.fantasia)
                    .join(", ")}
                </Flex>

                {/* <Flex flexDir={"column"} gap={2} >
                  <Text fontWeight="bold" fontSize="sm" textAlign={"left"}>
                    Empreendimento:
                  </Text>
                  {solicitacao.empreendimento
                    ?.map((item: any) => item.nome)
                    .join(", ")}
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    Financeiro:
                  </Text>
                  {solicitacao.Financeira?.map(
                    (item: any) => item.fantasia
                  ).join(", ")}
                </Flex> */}
              </Flex>
              <Flex mt={3} gap={2} w="100%" justifyContent="end">
                <BtnResetSenha ID={solicitacao.id} />
                <BtnExcluirUser id={solicitacao.id} />
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </>
  );
}
