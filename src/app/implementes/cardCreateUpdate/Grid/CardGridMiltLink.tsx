import { Box, BoxProps, Flex, FormLabel, Text } from "@chakra-ui/react";
import DropMultiLink from "../dropdow/dropMultiLink";

interface CardGridUpdateCnhProps extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

export default function CardGridMultLink({
  DataSolicitacao,
  ...props
}: CardGridUpdateCnhProps) {
  return (
    <Box {...props}>
      <FormLabel fontSize="sm" fontWeight="md">
        DOCUMENTOS A SER ASSINADOS
      </FormLabel>
      <Flex w={"100%"}>
      <DropMultiLink value={DataSolicitacao.mult_link} />
      </Flex>
    </Box>
  );
}
