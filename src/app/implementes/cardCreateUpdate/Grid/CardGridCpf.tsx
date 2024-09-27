import { Box, BoxProps, FormLabel, Text } from "@chakra-ui/react";
import InputCpf from "../imputs/inputCpf";

interface CardGridCpfProps extends BoxProps {
  CPF?: string;
}


export default async function CardGridCpf({ CPF, ...props }: CardGridCpfProps) {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md" m={0}>
          CPF
        </FormLabel>
        {CPF && (
          <Text px={1} py={2} bg={"gray.100"} borderBottom={"1px solid #A0AEC0"}>
            {CPF}
          </Text>
        )}
        {!CPF && (
          <InputCpf
            variant="flushed"
            setValueCpf={CPF}
            px={1}
            bg={"gray.100"}
            borderColor={"gray.400"}
          />
        )}
      </Box>
    </>
  );
}