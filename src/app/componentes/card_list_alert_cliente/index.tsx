"use client";
import { useEffect, useState } from "react";
import { AlertComponent } from "../alerts";
import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useAlertContext from "@/hook/useAlertContext";

interface SetDataProps {
  Id: number;
  DataAlert: any;
}

export default function CardListAlertCliente({ Id, DataAlert }: SetDataProps) {
  const [Data, setData] = useState<any>([]);
  const { data: session } = useSession();
  const user = session?.user;
  const hierarquia = user?.hierarquia;

  const { Alert } = useAlertContext();

  useEffect(() => {
      if (Alert) RequesteAlert();
    }, [Alert]);
  

  const RequesteAlert = async () => {
    const req = await fetch(`/api/alerts/solicitacao/${Id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (req.ok) {
      const res = await req.json();
      setData(res);
    }
  };

  useEffect(() => {
    if (DataAlert.length > 0) {
      setData(DataAlert);
    }
  }, [DataAlert]);

  const AtualizarAlert = (e: number) => {
    if (e === 1) RequesteAlert();
  };

  return (
    <>
      <Box
        w={{ base: "95%", md: "65%" }} // Ajuste a largura conforme necessário
        p={6} // Padding interno
        bg="white"
        borderRadius={8}
        boxShadow="2xl"
      >
        <Text fontSize={{ base: "xl", md: "2xl" }}>Alertas</Text>
        <Divider borderColor="#00713D" my={4} />
        <Stack spacing={6}>
          {Data &&
            Data.map((item: solictacao.AlertProps) => {
              const fakeStatus = true;
              const datacriate = new Date(item.createdAt).toLocaleDateString(
                "pt-BR",
                {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }
              );
              console.log(item);
              console.log(datacriate);
              return (
                <AlertComponent
                  atualizar={AtualizarAlert}
                  key={item.id}
                  msg={item.texto}
                  titulo={`${datacriate} - ${item.titulo}`}
                  status={item.tag}
                  ID={item.id}
                  DeleteAlertStatus={
                    hierarquia === "USER" ? fakeStatus : item.status
                  }
                />
              );
            })}
        </Stack>
      </Box>
    </>
  );
}
