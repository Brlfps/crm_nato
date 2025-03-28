import { Box, BoxProps, FormLabel } from "@chakra-ui/react";
import { SelectUserconstrutora } from "../dropdow/selectUserconstrutora";

interface CardGridUserEmpreedimentoProps extends BoxProps {
  UserEmpreedimento?: number | any;
}

export function CardGridUserEmpreedimento({
  UserEmpreedimento,
  ...props
}: CardGridUserEmpreedimentoProps) {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md" m={0}>
          Usuário
        </FormLabel>
        {/* <SelectUserconstrutora /> */}
      </Box>
    </>
  );
}
