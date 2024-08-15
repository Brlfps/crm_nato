"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Interface } from "readline";

interface ModallPropsFormuulario {
  rota: any;
  empreedimento?: number;
  clienteId?: number;
  PostName?: string;
  CorretorName?: string;
  CorretorId?: number;
}

export const ModalFormComponent = ({
  rota,
  empreedimento,
  clienteId,
  PostName,
  CorretorName,
  CorretorId,
}: ModallPropsFormuulario) => {
  const [Titulo, setTitulo] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [IdEmpreedimento, setIdEmpreedimento] = useState<number>(0);
  const [StatusAlert, setStatusAlert] = useState("");
  const [Empreedimeto, setEmpreedimeto] = useState([]);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      if (rota === "geral") {
        const request = await fetch("/api/empreendimento/getall");
        if (request.ok) {
          const response = await request.json();
          setEmpreedimeto(response);
        }
      }
    })();
  }, [rota]);

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      // backdropBlur='2px'
    />
  );

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const data: AlertsType.AlertsProps =
      rota === "geral"
        ? {
            tipo: rota.toUpperCase(),
            empreendimento: IdEmpreedimento,
            tag: "info",
            texto: Descricao,
            titulo: `${
              Empreedimeto.filter((e: any) => e.id === IdEmpreedimento).map(
                (e: any) => e.nome
              )[0]
            } - ${Titulo}`,
          }
        : {
            tipo: "CORRETOR",
            corretor: CorretorId,
            empreendimento: empreedimento,
            solicitacao_id: clienteId,
            tag: !StatusAlert ? "warning" : StatusAlert,
            texto: Descricao,
            titulo: `${PostName?.split(" ")[0]} ${
              PostName?.split(" ")[1]
            } - ${Titulo}`,
          };
    console.log(data);
    try {
      const request = await fetch(`/api/alerts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await request.json();
      console.log(response);
      if (request.ok) {
        toast({
          title: "Sucesso!",
          description: "Alerta criado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        window.location.reload();
      }
      onClose();
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao criar alerta!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box
        h={"100%"}
        borderRadius={"15px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Button
          bg={"#00713D"}
          textColor={"white"}
          variant="solid"
          _hover={{ bg: "#00631B" }}
          size="md"
          onClick={onOpen}
        >
          CRIAR ALERTA
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"3xl"}>
        {OverlayTwo()}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {PostName
              ? "Criar Alerta para " + PostName + " vendedor " + CorretorName
              : "Alerta Geral"}
          </ModalHeader>
          <ModalCloseButton />
          <FormControl>
            <ModalBody>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={rota === "geral" ? "info" : StatusAlert}
                disabled={rota === "geral" ? true : false}
                onChange={(e) => setStatusAlert(e.target.value)}
                placeholder="Selecione o status"
              >
                {rota == "geral" && <option value="info">Informação</option>}
                <option value="warning">Atenção</option>
                <option value="error">Erro</option>
              </Select>

              <FormControl id="title" isRequired mt={4}>
                <FormLabel>Título</FormLabel>
                <Input
                  value={Titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Digite o título"
                />
              </FormControl>

              {rota === "geral" && (
                <FormControl id="idEmpreedimento" isRequired mt={4}>
                  <FormLabel>Empreedimento</FormLabel>
                  <Select
                    name="idEmpreedimento"
                    value={IdEmpreedimento}
                    placeholder="Selecione o empreedimento"
                    onChange={(e) => setIdEmpreedimento(Number(e.target.value))}
                  >
                    {Empreedimeto.length > 0 &&
                      Empreedimeto.map((empreedimento: any) => (
                        <option key={empreedimento.id} value={empreedimento.id}>
                          {empreedimento.nome}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              )}

              <FormControl id="text" isRequired mt={4}>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  value={Descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Digite o texto"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Enviar
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </>
  );
};
