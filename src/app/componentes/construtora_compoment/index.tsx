"use client";

import { ConstrutoraType } from "@/app/(private_routers)/construtora/page";
import { BtnExcluirUser } from "@/app/componentes/btm_exluir_user";
import { BtnResetSenha } from "@/app/componentes/btn_reset_senha";
import { Box, Flex, IconButton, Text, useToast } from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa6";
import { mask } from "remask";

interface TypeConstrutora {
  data: ConstrutoraType[];
}

export default function Construtora({ data }: TypeConstrutora) {
  const toast = useToast();

  return (
    <>
      <Flex
        w={"100%"}
        mb={8}
        justifyContent="center"
        alignItems="center"
      ></Flex>
      <Flex gap={4} flexWrap={"wrap"}>
        {data.map((c: ConstrutoraType) => {
          return (
            <Box
              key={c.id}
              border="3px solid #E8E8E8"
              borderRadius="8px"
              p={3}
              flexDir="column"
              w={{ base: "100%", md: "30%", lg: "20em" }}
              fontSize={"0.8rem"}
            >
              <Flex w="100%" flexDir={"column"} gap={4}>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    ID:
                  </Text>
                  {c.id}
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    Fantasia:
                  </Text>
                  {c.fantasia}
                </Flex>
                {/* <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    FUNÇÃO:
                  </Text>
                  {c.cargo}
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    HIERARQUIA:
                  </Text>
                  {c.hierarquia}
                </Flex> */}
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    Telefone:
                  </Text>
                  {c.tel ? mask(c.tel, ["(99) 9 9999-9999", "(99) 9999-9999"]) : ""}
                  <IconButton
                    icon={<FaCopy />}
                    aria-label="copy"
                    size={"xs"}
                    bg={"blue.500"}
                    color={"white"}
                    onClick={() => {
                      navigator.clipboard.writeText(c.tel || "");
                      toast({
                        title: "Numero copiado!",
                        status: "info",
                        duration: 2000,
                        position: "top-right",
                      });
                    }}
                  />
                </Flex>
              </Flex>
              <Flex mt={3} gap={2} w="100%" justifyContent="end">
                <BtnResetSenha ID={c.id} />
                <BtnExcluirUser id={c.id} />
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </>
  );
}
