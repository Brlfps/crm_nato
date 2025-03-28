import { Box, BoxProps, FormLabel, Text } from "@chakra-ui/react";
import SelectCorretor from "../dropdow/selectCorretor";
import DropCorretor from "../dropdow/dropCorretor";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";

interface CardGridCorretorProps extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

export default async function CardGridCorretor({
  DataSolicitacao,
  ...props
}: CardGridCorretorProps) {
  const session = await getServerSession(auth);
  const user = session?.user;
  const Hierarquia = user?.hierarquia;
  return (
    <>{
      Hierarquia === "ADM" && (
        <Box {...props}>
          <FormLabel fontSize="sm" fontWeight="md" m={0}>
            Corretor
          </FormLabel>
          {DataSolicitacao.corretor?.nome && (
            <Text>{DataSolicitacao.corretor.nome}</Text>
          )}
          {DataSolicitacao.corretor?.id && (
            <DropCorretor
              value={DataSolicitacao.corretor.id}
              Id={DataSolicitacao.id}
            />
          )}
          {!DataSolicitacao.corretor && <SelectCorretor />}
        </Box>
      )}
    </>
  );
}
