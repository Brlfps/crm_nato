"use client";
import useUserCompraContext from "@/hook/useUserCompraContext";
import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { BeatLoader } from "react-spinners";

interface DropCorretorProps {
  value: number;
  Id: number;
}

export default function DropCorretor({ value, Id }: DropCorretorProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const hierarquia = user?.hierarquia;
  const [Data, setData] = useState<any>([]);
  const [Corretor, setCorretor] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const route = useRouter();
  const { ContrutoraCX, EmpreedimentoCX } = useUserCompraContext();
  useEffect(() => {
    if (hierarquia === "ADM") {
      if (ContrutoraCX > 0 && EmpreedimentoCX > 0) {
        (async () => {
          const req = await fetch(
            `/api/usuario/search?construtora=${ContrutoraCX}&empreedimento=${EmpreedimentoCX}`
          );
          const res = await req.json();
          setData(res);
        })();
      }
    }
    if (value) {
      setCorretor(value);
    }
  }, [ContrutoraCX, EmpreedimentoCX]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/solicitacao/update/${Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          corretor: Number(Corretor),
        }),
      });

      if (response.ok) {
        toast({
          title: "Financeira alterado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        route.refresh();
      }
    } catch (error) {
      toast({
        title: "Erro ao alterar o Financeira",
        description: JSON.stringify(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <>
 
        <Box>
          <Popover>
            <PopoverTrigger>
              <Button variant="link" colorScheme="gray">
                Alterar Corretor
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Alterar Corretor</PopoverHeader>
              <PopoverBody display={"flex"} gap={3} alignItems={"center"}>
                <Select
                  size={"sm"}
                  borderRadius={"10px"}
                  placeholder="Selecione"
                  name="corretor"
                  value={Corretor}
                  onChange={(e) => setCorretor(Number(e.target.value))}
                >
                  {Data.map((item: any) => (
                    <option key={item.id} value={Number(item.id)}>
                      {item.nome}
                    </option>
                  ))}
                </Select>
                <IconButton
                  icon={<FaPlus />}
                  aria-label={"substituir"}
                  colorScheme={"teal"}
                  size={"sm"}
                  onClick={handleUpdate}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
    </>
  );
}
