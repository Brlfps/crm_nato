"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { SiGoogleforms } from "react-icons/si";

export default function BotaoNovaSolicita() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/solicitacoes");
  };

  return (
    <Flex>
      <Box
        h={"100%"}
        borderRadius={"15px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Button
          textColor={"white"}
          variant="link"
          size="sm"
          leftIcon={<SiGoogleforms />}
          onClick={handleClick}
        >
          NOVA SOLICITAÇÃO
        </Button>
      </Box>
    </Flex>
  );
}
