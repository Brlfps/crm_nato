import { Box, BoxProps, Flex, FormLabel, Link, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";

interface CardGridUpdateCnhProps extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

export default async function CardGridIdfcweb({
  DataSolicitacao,
  ...props
}: CardGridUpdateCnhProps) {
  const session = await getServerSession(auth);
  const user = session?.user;
  const Hierarquia = user?.hierarquia;
  return (
    <>
      <Box {...props}>
        {Hierarquia !== "ADM" && (
          <FormLabel fontSize="sm" fontWeight="md" m={0}>
            Protocolo
          </FormLabel>
        )}
        {Hierarquia === "ADM" && (
          <FormLabel fontSize="sm" fontWeight="md" m={0}>
            Protocolo/IDFcweb
          </FormLabel>
        )}
        {Hierarquia !== "ADM" && <Text>{DataSolicitacao.id_fcw}</Text>}
        {Hierarquia === "ADM" && (
          <Link
            ps={1}
            href={`https://redebrasilrp.com.br/fcw2/abrir_ficha.php?fc=${DataSolicitacao.id_fcw}`}
            target="_blank"
            fontWeight={"bold"}
            color="teal.600"
          >
            {DataSolicitacao.id_fcw}
          </Link>
        )}
      </Box>
    </>
  );
}
