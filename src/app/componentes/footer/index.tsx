"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FaPhoneVolume } from "react-icons/fa";

export default function FooterComponent() {
  const bg = "#00713D";

  return (
    <Flex
      w="100%"
      p="20px"
      bg={bg}
      justifyContent={{ base: "center", md: "space-evenly" }}
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
      gap="5px"
      textAlign="center"
    >
      <Flex
        w={{ base: "100%", md: "33%" }}
        h="100%"
        gap="1rem"
        alignItems="center"
        justifyContent={{ base: "center", md: "flex-start" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Text color="white">Precisa de Ajuda?</Text>
        <Button
          variant="link"
          color="white"
          leftIcon={<FaPhoneVolume />}
          size="sm"
        >
          (16) 3325-4134
        </Button>
      </Flex>

      <Flex
        gap="1rem"
        justifyContent="center"
        mt={{ base: "10px", md: "0" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Button variant="link" color="white" size="sm">
          Termos de Uso
        </Button>
        <Button variant="link" color="white" size="sm">
          Documentação
        </Button>
        <Button variant="link" color="white" size="sm">
          Politica de Privacidade
        </Button>
      </Flex>

      <Flex
        w={{ base: "100%", md: "33%" }}
        h="100%"
        gap="1rem"
        alignItems="center"
        justifyContent={{ base: "center", md: "flex-end" }}
        flexDirection={{ base: "column", md: "row" }}
        mt={{ base: "10px", md: "0" }}
      >
        <Text color="white">Copyright © 2024 Rede BrasilRP</Text>
      </Flex>
    </Flex>
  );
}
