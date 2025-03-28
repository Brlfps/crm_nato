"use client";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@chakra-ui/react";
import BotaoNovaSolicita from "../bt_nvsolicita";
import BotaoSair from "../bt_sair";
import { useSession } from "next-auth/react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import BotaoPainelAdm from "../bt_paineladm";
import BotaoUser from "../bt_user";
import BotaoHome from "../bt_home";
import BotaoPainelFinanceiro from "../bt_financeiro";

export default function BotaoJuncao() {
  const { data: session } = useSession();
  const but = session?.user?.hierarquia;
  const [isLargerThanTablet] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex
      pt={"20px"}
      pb={"20px"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      w={"100%"}
      bg={"#00713D"}
    >
      <Box
        alignItems={"center"}
        justifyContent={"flex-end"}
        borderRadius={"15px"}
        display={"flex"}
        gap={"20px"}
      >
        {isLargerThanTablet ? (
          <>
            <BotaoHome />
            <BotaoNovaSolicita />
            {but === "ADM" && (
              <>
                <BotaoPainelAdm />
                <BotaoPainelFinanceiro />
              </>
            )}
            {but === "CCA" && <BotaoPainelFinanceiro />}
            {but === "CONT" && <BotaoPainelFinanceiro />}
          </>
        ) : (
          <Menu>
            <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
              Menu
            </MenuButton>
            <MenuList>
              <MenuItem>
                <BotaoNovaSolicita />
              </MenuItem>
              {but === "ADM" && (
                <MenuItem>
                  <BotaoPainelAdm />
                </MenuItem>
              )}
              {but === "CCA" && (
                <MenuItem>
                  <BotaoPainelFinanceiro />
                </MenuItem>
              )}
              {but === "CONT" && (
                <MenuItem>
                  <BotaoPainelFinanceiro />
                </MenuItem>
              )}
              <MenuItem>
                <BotaoSair />
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
      <Box display={"flex"}>
        {but === "ADM" && <BotaoUser />}
        <BotaoSair />
      </Box>
    </Flex>
  );
}
