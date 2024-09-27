"use client";
import { Flex, Box, Button, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { SiGoogleforms } from "react-icons/si";

export default function BotaoUser() {
  const router = useRouter();

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
        <IconButton
          icon={<FaUserGroup />}
          size="md"
          textColor={"white"}
          variant={"link"}
          onClick={() => router.push("/usuarios")}
          aria-label={""}
        ></IconButton>
      </Box>
    </Flex>
  );
}
