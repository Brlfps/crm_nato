import { Box, BoxProps, FormLabel, Text } from "@chakra-ui/react";
import DropConstrutora from "../dropdow/dropConstrutora";
import SelectConstrutora from "../dropdow/selectConstrutora";
import UserCompraProvider from "@/provider/UserCompra";

interface CardGridConstrutoraProps extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

export default function CardGridConstrutora({
  DataSolicitacao,
  ...props
}: CardGridConstrutoraProps): JSX.Element {
  return (
    <>

        <Box {...props}>
          <FormLabel fontSize="sm" fontWeight="md" m={0}>
            Construtora
          </FormLabel>
          {DataSolicitacao.construtora?.fantasia && (
            <Text>{DataSolicitacao.construtora.fantasia}</Text>
          )}
          {DataSolicitacao.construtora?.id && (
            <DropConstrutora
              value={DataSolicitacao.construtora.id}
              Id={DataSolicitacao.id}
            />
          )}
          {!DataSolicitacao.construtora && <SelectConstrutora />}
        </Box>

    </>
  );
}
