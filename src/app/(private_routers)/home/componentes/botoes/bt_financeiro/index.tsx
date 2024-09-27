import { Flex, Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { TbDatabaseDollar } from "react-icons/tb";

export default function BotaoPainelFinanceiro() {
  const router = useRouter();

  return (
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
        leftIcon={<TbDatabaseDollar />}
        onClick={() => router.push("/financeiro")}
      >
        PAINEL FINANCEIRO
      </Button>
    </Box>
  );
}
