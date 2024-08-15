import {
  Box,
  Button,
  Divider,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  List,
  ListItem,
  Link,
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaIdCard } from "react-icons/fa";
import { mask, unMask } from "remask";


interface CpfProps {
  onCpfChange: (cpf: string) => void;
}

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export const ModalConsultaRegistro = ({ onCpfChange }: CpfProps) => {
  const [CPF, setCPF] = useState("");
  const [CPFMask, setCPFMask] = useState("");
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [IsContinue, setIsContinue] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter(); // Inicializando o useRouter

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handleClose = () => {
    onClose();
    router.push("/"); // Redirecionando para a página inicial
  };

  const handleSubmit = async () => {
    if (!CPF) {
      toast({
        title: "Erro!",
        description: "O CPF é obrigatório!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (CPF.length < 11) {
      toast({
        title: "Erro!",
        description: "Faltam caracteres no CPF!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      try {
        const request = await fetch(`/api/consulta/cpf/${CPF}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (request.ok) {
          const response = await request.json();
          console.log(response);

          if (response.exists) {
            setSolicitacoes(response.solicitacoes);
            toast({
              title: "CPF já cadastrado!",
              description: "O CPF informado já está registrado.",
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: "CPF disponível.",
              description: "Você pode prosseguir com o cadastro.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setIsContinue(true);
            onCpfChange(CPF);
            onClose();
          }
        }
      } catch (error) {
        toast({
          title: "Erro!",
          description: "Erro ao verificar o CPF!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose} // Usando handleClose aqui
      isCentered
      size={{ base: "70%", md: "xl" }}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(12px)" />
      <ModalContent
        bg="white"
        borderRadius="2xl"
        boxShadow="2xl"
        p={{ base: 4, md: 6 }}
        maxW={{ base: "90%", md: "container.md" }}
      >
        <ModalHeader
          fontSize={{ base: "lg", md: "2xl" }}
          fontWeight="bold"
          color="teal.600"
          textAlign="center"
          borderBottom="2px"
          borderColor="gray.200"
          pb={4}
        >
          Forneça o CPF do cliente
        </ModalHeader>
        <ModalBody py={{ base: 4, md: 6 }} px={{ base: 4, md: 8 }}>
          <Box mb={6}>
            <FormLabel
              fontWeight="bold"
              color="teal.600"
              fontSize={{ base: "md", md: "lg" }}
            >
              CPF
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaIdCard} color="gray.400" />}
              />
              <Input
                type="text"
                value={CPFMask}
                onChange={(e) => {
                  const valor = e.target.value;
                  const valorLimpo = unMask(valor);
                  const masked = mask(valorLimpo, ["999.999.999-99"]);
                  setCPFMask(masked);
                  setCPF(valorLimpo);
                }}
                onBlur={() => handleSubmit()}
                placeholder="Digite o CPF"
                focusBorderColor="teal.400"
                bg="gray.50"
                borderRadius="md"
                pl={10}
                fontSize={{ base: "sm", md: "md" }}
                _placeholder={{ color: "gray.500" }}
                h={{ base: "12", md: "14" }}
                maxW="full"
              />
            </InputGroup>
          </Box>
          {solicitacoes.length > 0 && (
            <Box mt={6}>
              <FormLabel
                fontWeight="bold"
                color="teal.600"
                fontSize={{ base: "md", md: "lg" }}
              >
                Solicitações existentes
              </FormLabel>
              <List spacing={3}>
                {solicitacoes.map((solicitacao: any) => (
                  <Flex
                    key={solicitacao.id}
                    justifyContent="space-between"
                    alignItems="center"
                    p={{ base: 3, md: 4 }}
                    bg="gray.50"
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                    transition="background-color 0.2s"
                    boxShadow="sm"
                    flexDirection={{ base: "column", md: "row" }}
                  >
                    <Box>
                      <Link
                        href={`/solicitacoes/${solicitacao.id}`}
                        color="teal.600"
                        fontWeight="bold"
                      >
                        {solicitacao.nome}
                      </Link>
                    </Box>
                    <Box mt={{ base: 2, md: 0 }}>
                      {" "}
                      <Link
                        href={`/solicitacoes/${solicitacao.id}`}
                        color="teal.600"
                        fontWeight="bold"
                      >
                        {solicitacao.id}
                      </Link>
                    </Box>
                  </Flex>
                ))}
              </List>
            </Box>
          )}
        </ModalBody>
        <Divider />
        <ModalFooter>
          {IsContinue && (
            <Button colorScheme="teal" onClick={onClose} mr={3}>
              Continuar cadastro
            </Button>
          )}
          <Button variant="outline" colorScheme="teal" onClick={handleClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
