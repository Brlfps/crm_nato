import { Box, BoxProps, FormLabel, GridItem } from "@chakra-ui/react";
import InputName from "../imputs/inputName";


interface CardGridNameProps extends BoxProps {
  Nome?: string;
};

export default function CardGridName({ Nome, ...props }: CardGridNameProps) {
    return (
      <>
        <Box {...props}>
          <FormLabel fontSize="sm" fontWeight="md" m={0}>
            Nome Completo
          </FormLabel>
          <InputName
            name="nome"
            variant="flushed"
            setValueName={Nome}
            borderColor={"gray.400"}
            px={1}
            bg={"gray.100"}
          />
        </Box>
      </>
    );
}