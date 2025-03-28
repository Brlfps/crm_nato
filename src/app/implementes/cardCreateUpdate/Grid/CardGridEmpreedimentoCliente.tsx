import { Box, BoxProps, FormLabel, Text } from "@chakra-ui/react";
import DropEmpreendimento from "../dropdow/dropEmpreendimento";
import SelectEmpreedimento from "../dropdow/selectEmpreedimento";
import UserCompraProvider from "@/provider/UserCompra";

interface CardGridEmpreedimentoProps extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

export default function CardGridEmpreedimentoCliente({
  DataSolicitacao,
  ...props
}: CardGridEmpreedimentoProps): JSX.Element {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md" m={0}>
          Empreendimento
        </FormLabel>
        {DataSolicitacao.empreedimento?.nome && (
          <Text>{DataSolicitacao.empreedimento.nome}</Text>
        )}
        {DataSolicitacao.empreedimento?.id && (
          <DropEmpreendimento
            id={DataSolicitacao.id}
            value={DataSolicitacao.empreedimento.id}
          />
        )}
        {!DataSolicitacao.empreedimento && <SelectEmpreedimento />}
      </Box>
    </>
  );
}
