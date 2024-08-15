"use client";

import { signOut, useSession } from "next-auth/react";
import Loading from "../loading";
import { Box, Flex } from "@chakra-ui/react";
import { redirect, useRouter } from "next/navigation";
import BotaoJuncao from "./home/componentes/botoes/bt_juncao";
import FooterComponent from "../componentes/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const user = session?.user;
  const route = useRouter();

  if (!user)
    return (
      <>
        <Loading />
      </>
    );

  (async () =>
    await Promise.resolve(setTimeout((resolve: any) => resolve, 3000)))();
  console.log(user);
  if (!user) {
    route.push("/login");
    signOut({ redirect: false });
  }
  return (
    <Box overflowY={"auto"} h={"100vh"} w={"100vw"} >
      <BotaoJuncao />
      {user && children}
      <FooterComponent />
    </Box>
  );
}
