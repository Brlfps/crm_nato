import Construtora from "@/app/componentes/construtora_compoment";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";

const prisma = new PrismaClient();

/**
 * Get construtora
 * @type {ConstrutoraType}
 * @param { number } id 
 * @param { string } cnpj
 * @param { string } razaosocial
 * @param { string | null } tel
 * @param { string | null } email
 * @param { Date | string | any } createdAt
 * @param { string | null } fantasia
 *
 * @returns { id: number, cnpj: string, razaosocial: string, tel: string | null, email: string | null, createdAt: Date | string | any, fantasia: string | null }
 *
 */
export type ConstrutoraType = {
  id: number;
  cnpj: string;
  razaosocial: string;
  tel: string | null;
  email: string | null;
  createdAt: Date | string | any;
  fantasia: string | null;
};

async function GetConstrutora() {
  try {
    const request = await prisma.nato_empresas.findMany({
      where: {
        atividade: "CONST",
      },
      select: {
        id: true,
        cnpj: true,
        email: true,
        razaosocial: true,
        createdAt: true,
        tel: true,
        fantasia: true,
      },
    });
    return { status: 200, message: "success", data: request };
  } catch (error: any) {
    return { status: 500, message: "error", data: error };
  }
}

export const metadata: Metadata = {
  title: "Construtoras",
  description: "sistema de gestão de vendas de imóveis",
};
export default async function ConstrutoraPage() {
  const Dados = await GetConstrutora();
  return (
    <>
      <Flex
        w={"100%"}
        minH={"90.9dvh"}
        px={{ base: 2, md: "10rem" }}
        py={5}
        flexDir={"column"}
      >
        <Flex w={"100%"} justifyContent={"space-around"}>
          <Heading>Construtora</Heading>
          <Link
            href={"/construtora/cadastrar"}
            _hover={{ textDecoration: "none" }}
          >
            <Box
              py={2}
              px={7}
              border="3px solid green.600"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500" }}
              boxShadow={"lg"}
              cursor={"pointer"}
            >
              Criar Construtora
            </Box>
          </Link>
        </Flex>
        <Divider my={5} />
        <Box ml={4}>
          <Text fontSize="25px" fontWeight="bold" color="#333333">
            CONTRUTORA CADASTRADAS
          </Text>
        </Box>
        <Box w={"100%"}>
          <Box>
            {Dados?.status === 200 ? <Construtora data={Dados?.data} /> : <></>}
          </Box>
        </Box>
      </Flex>
    </>
  );
}
