import UserCreate from "@/actions/user/create";
import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import { CardCreateUpdate } from "@/app/implementes/cardCreateUpdate";
import UserRegisterProvider from "@/provider/UserRegister";
import { Box, Divider, Flex, Heading, Input } from "@chakra-ui/react";

export default function CadastrarUsuario() {
  return (
    <>
      <Flex
        w={"100%"}
        minH={"90.9dvh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          w={"70%"}
          bg={"gray.50"}
          borderRadius={"1rem"}
          boxShadow={"lg"}
          p={8}
        >
          <Flex justifyContent={"space-between"}>
            <Box>
              <BotaoRetorno rota="/usuarios" />
            </Box>
            <Heading>Criar Usuário</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardCreateUpdate.Form action={UserCreate}>
            <Flex w={"full"} flexWrap={"wrap"} gap={5}>
              <UserRegisterProvider>
                <CardCreateUpdate.GridCpf w={"15rem"} />
                <CardCreateUpdate.GridName w={"35rem"} />
                <CardCreateUpdate.GridUser w={"15rem"} />
                <CardCreateUpdate.GridRegisterTel w={"10rem"} />
                <CardCreateUpdate.GridEmail w={"25rem"} />
                <CardCreateUpdate.GridUserConstrutora w={"23rem"} />

                <Box>
                  construtora
                  <Input type="text" />
                </Box>
                <Box>
                  empreendimento
                  <Input type="text" />
                </Box>
                <Box>
                  financeiro
                  <Input type="text" />
                </Box>
                <Box>
                  cargo
                  <Input type="text" />
                </Box>
                <Box>
                  hierarquia
                  <Input type="text" />
                </Box>
                <Box>
                  senha
                  <Input type="text" />
                </Box>
                <Box>
                  confirmar senha
                  <Input type="text" />
                </Box>
              </UserRegisterProvider>
            </Flex>
            <Divider my={4} borderColor="gray.300" />
            <Flex w={"full"} justifyContent={"end"}></Flex>
          </CardCreateUpdate.Form>
        </Box>
      </Flex>
    </>
  );
}
