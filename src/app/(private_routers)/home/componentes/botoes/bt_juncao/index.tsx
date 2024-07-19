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
import BotaoCadastro from "../bt_cadastro";
import BotaoNovaSolicita from "../bt_nvsolicita";
import BotaoSair from "../bt_sair";
import { useSession } from "next-auth/react";
import { ModalFormComponent } from "@/app/componentes/modal";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import BotaoPainelAdm from "../bt_paineladm";

export default function BotaoJuncao() {
  const { data: session } = useSession();
  const but = session?.user?.hierarquia;
  const [isLargerThanTablet] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex w={"100%"}>
      <Box h={"100%"} borderRadius={"15px"} display={"flex"} gap={"20px"}>
        {isLargerThanTablet ? (
          <>
            <BotaoNovaSolicita />
            {but === "ADM" && <BotaoPainelAdm />}
            <BotaoSair />
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
              <MenuItem>
                <BotaoSair />
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
    </Flex>
  );
}
