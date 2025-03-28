import Usuarios from "@/app/componentes/usuarios_component";
import { auth } from "@/lib/auth_confg";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";

async function GetUser() {
  try {
    const session = await getServerSession(auth);

    if (!session) {
      const data = { status: 401, message: "Unauthorized", data: null };
      return data;
    }

    const reqest = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    if (!reqest.ok) {
      const data = { status: 400, message: "Invalid credentials", data: null };
      return data;
    }
    const data = await reqest.json();
    const users = data.filter((user: any) => user.hierarquia !== "ADM");

    return {
      status: 200,
      message: "Success",
      data: users,
    };
  } catch (error: any) {
    return { status: 500, message: "error", data: error };
  }
}
export default async function UsuariosPage() {
  const Dados = await GetUser();
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
          <Heading>Usuários</Heading>
          <Link
            href={"/usuarios/cadastrar"}
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
              Criar Usuário
            </Box>
          </Link>
        </Flex>
        <Divider my={5} />
        <Box ml={4}>
          <Text fontSize="25px" fontWeight="bold" color="#333333">
            USUARIOS CADASTRADOS
          </Text>
        </Box>
        <Box w={"100%"}>
          <Box>{Dados?.status === 200 ? <Usuarios data={Dados?.data} /> : <></>}</Box>
        </Box>
      </Flex>
    </>
  );
}
