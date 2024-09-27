"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";

export default function BotaoSair() {
  const router = useRouter();

  const HandleSair = async (e: any) => {
    e.preventDefault();
    signOut({ redirect: false });
    // excluir os cookies
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    router.push("/login");
  };

  return (
    <Flex w={"100%"}>
      <Box
        w={"100%"}
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
          leftIcon={<HiOutlineLogout />}
          onClick={HandleSair}
        >
          SAIR
        </Button>
      </Box>
    </Flex>
  );
}
