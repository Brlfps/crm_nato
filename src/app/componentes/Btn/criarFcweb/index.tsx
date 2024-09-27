"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, useState, useRef } from "react";

interface CriarFcwebProps {
  Id: number;
}

export function CriarFcweb({ Id }: CriarFcwebProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [Loading, setLoading] = useState(false);
  const toast = useToast();
  const { data: session } = useSession();
  const user = session?.user;
  const hierarquia = user?.hierarquia;
  const route = useRouter();

  const handleSubmit: FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    onClose();
    setLoading(true);
    try {
      const response = await fetch("/api/fcweb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Id }),
      });
    //   const json = await response.json();
      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "FCWEB criado com sucesso!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    //   setData(json);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro!",
        description: "Ocorreu um erro ao criar o FCWEB!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      route.refresh();
    }
  };

  return (
    <>
      {hierarquia === "ADM" && (
        <>
          <Button colorScheme="cyan" isLoading={Loading} onClick={onOpen}>
            Criar FCWEB
          </Button>
          <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
            leastDestructiveRef={cancelRef}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Criar FCWEB
                </AlertDialogHeader>

                <AlertDialogBody>
                  Tem certeza que deseja criar o FCWEB?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    colorScheme="red"
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button colorScheme="green" onClick={handleSubmit} ml={3}>
                    Criar
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )}
    </>
  );
}
