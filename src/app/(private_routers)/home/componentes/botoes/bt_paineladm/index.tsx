"use client";
import { Flex, Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export default function BotaoPainelAdm() {
  const router = useRouter();

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
          leftIcon={<AiFillProduct />}
          onClick={() => router.push("/adm")}
        >
          PAINEL ADM
        </Button>
      </Box>
    </Flex>
  );
}
