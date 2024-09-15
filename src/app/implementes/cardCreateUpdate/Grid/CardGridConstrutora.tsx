import { Box, BoxProps, FormLabel, Text } from "@chakra-ui/react";
import DropConstrutora from "../dropdow/dropConstrutora";
import SelectConstrutora from "../dropdow/selectConstrutora";


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
        <FormLabel fontSize="sm" fontWeight="md">
          Construtora
        </FormLabel>
        {DataSolicitacao.construtora && (
          <Text pt={3}>{DataSolicitacao.construtora.fantasia}</Text>
        )}
        {DataSolicitacao.construtora && <DropConstrutora value={DataSolicitacao.construtora.id} />}
        {!DataSolicitacao && <SelectConstrutora />}
      </Box>
    </>
  );
}