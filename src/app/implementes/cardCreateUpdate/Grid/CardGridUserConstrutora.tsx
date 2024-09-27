import { Box, BoxProps, FormLabel } from "@chakra-ui/react";
import { SelectUserconstrutora } from "../dropdow/selectUserconstrutora";

interface CardGridUserConstrutoraProps extends BoxProps {
  UserConstrutora?: number | any;
}

export function CardGridUserConstrutora({
  UserConstrutora,
  ...props
}: CardGridUserConstrutoraProps) {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md" m={0}>
          Usuário
        </FormLabel>
        <SelectUserconstrutora setValue={UserConstrutora} />
      </Box>
    </>
  );
}
