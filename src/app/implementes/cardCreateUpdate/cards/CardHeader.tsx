import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import { auth } from "@/lib/auth_confg";
import { Box, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";

interface CardHeaderProps {
    SetDados: solictacao.SolicitacaoGetType
}

export async function CardHeader({ SetDados }: CardHeaderProps) {
    const session = await getServerSession(auth)
    const user = session?.user;
    const input = user?.hierarquia;
    return (
      <>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <BotaoRetorno rota="/" />
          <Box>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Criado: {new Date(SetDados.createdAt).toLocaleString("pt-BR")}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Aprovação:
              {SetDados.dt_aprovacao &&
                new Date(SetDados.dt_aprovacao).toLocaleDateString(
                  "pt-BR"
                )}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>Id: {SetDados.id}</Text>
          </Box>
          <Box alignItems="center" textAlign={{ base: "center", md: "left" }}>
            <Text fontSize={{ base: "lg", md: "2xl" }}>Dados Pessoais</Text>
            {input !== "USER" && (
              <Text fontSize={{ base: "sm", md: "md" }}>
                Corretor: {SetDados.corretor && SetDados.corretor?.nome}
              </Text>
            )}
          </Box>
        </Box>
      </>
    );
}