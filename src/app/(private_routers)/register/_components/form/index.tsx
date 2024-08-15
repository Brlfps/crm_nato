"use client";

import CheckEmail from "@/app/componentes/checkEmail";
import CpfMask from "@/app/componentes/cpf_mask";
import { ModalConsultaRegistro } from "@/app/componentes/modal_consulra_registro";
import { SenhaComponent } from "@/app/componentes/Senha";
import { Whatsapp } from "@/app/componentes/whatsapp";
import {
  Box,
  Button,
  FormLabel,
  GridItem,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select,
  SimpleGrid,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mask, unMask } from "remask";

export default function FormRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [Empreendimento, setEmpreendimento] = useState<number | undefined>();
  const [EmpreendimentoData, setEmpreendimentoData] = useState<any>([]);
  const [Construtora, setConstrutora] = useState<number | undefined>();
  const [ConstrutoraData, setConstrutoraData] = useState<any>([]);
  const [DataNascimento, setDataNascimento] = useState<Date | string | any>();
  const [Cargo, setCargo] = useState("");
  const [Hierarquia, setHierarquia] = useState("");
  const [Email, setEmail] = useState("");
  const [Load, setLoad] = useState<boolean>(false);
  const [checkEmail, setcheckEmail] = useState<string>("");
  const [codigo, setcodigo] = useState<boolean>(false);
  const [Nome, setNome] = useState("");
  const toast = useToast();
  const route = useRouter();

  useEffect(() => {
    const getConstrutora = async () => {
      const response = await fetch("/api/construtora/getall");
      const data = await response.json();
      setConstrutoraData(data);
    };
    getConstrutora();
  }, []);

  const handlesubmit = async () => {
    if (
      !username ||
      !Email ||
      !Nome ||
      // !Empreendimento ||
      // !Construtora ||
      !password ||
      !confirmPassword
    ) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "Senhas diferentes",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const data = {
        username: username,
        password: password,
        telefone: tel,
        email: Email,
        cpf: cpf,
        nome: Nome,
        cargo: Cargo,
        construtora: Construtora ? [Number(Construtora)] : [],
        empreendimento: Empreendimento ? [Number(Empreendimento)] : [],
        hierarquia: Hierarquia,
        obs: "",
      };
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const dados = await response.json();
        toast({
          title: "Sucesso",
          description: "Cadastrado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        route.back();
      } catch (error: any) {
        toast({
          title: "Erro ao cadastrar",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const VerificadorEmail = (e: any) => {
    const value = e.target.value;
    if ("NT-" + value === checkEmail) {
      setcheckEmail("");
      setcodigo(true);
    } else {
      setcheckEmail(value);
      setcodigo(false);
    }
  };

  const GetConstrutora = (e: any) => {
    const value = e.target.value;
    (async () => {
      const response = await fetch(
        `/api/empreendimento/getall/filter/${Number(value)}`
      );
      const data = await response.json();
      setEmpreendimentoData(data);
    })();
    setConstrutora(Number(value));
  };

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={6}
        mt={6}
        alignItems={"end"}
      >
        <GridItem>
          <FormLabel>Nome Completo</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setNome(e.target.value)}
          />
        </GridItem>
        <GridItem>
          <FormLabel>CPF</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setCpf(e.target.value)}
          />
        </GridItem>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={6}
        mt={6}
        alignItems={"end"}
      >
        <GridItem>
          <FormLabel>Usuario</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setUsername(e.target.value)}
          />
        </GridItem>
        <GridItem>
          <FormLabel>Whatsapp com DDD</FormLabel>
          <Whatsapp setValue={tel} onValue={setTel} />
        </GridItem>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={6}
        mt={6}
        alignItems={"end"}
      >
        <GridItem>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <Input
              type="text"
              border="1px solid #b8b8b8cc"
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <InputRightElement width="8rem">
              <CheckEmail onvalue={setcheckEmail} email={Email} nome={Nome} />
            </InputRightElement>
          </InputGroup>
        </GridItem>

        <GridItem>
          <FormLabel>Codigo email</FormLabel>
          <InputGroup>
            <InputLeftAddon>NT-</InputLeftAddon>
            <Input type="text" onChange={VerificadorEmail} />
          </InputGroup>
        </GridItem>
      </SimpleGrid>

      <Box
        mt={6}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="full"
      >
        <Box w={{ base: "100%", md: "48%" }} mb={{ base: 4, md: 0 }}>
          <FormLabel>Construtora</FormLabel>
          <Select
            placeholder="Selecione uma construtora"
            border="1px solid #b8b8b8cc"
            onChange={GetConstrutora}
            value={Construtora}
          >
            {ConstrutoraData.length > 0 &&
              ConstrutoraData.map((construtora: any) => (
                <option key={construtora.id} value={construtora.id}>
                  {construtora.razaosocial}
                </option>
              ))}
          </Select>
        </Box>
        <Box w={{ base: "100%", md: "48%" }}>
          <FormLabel>Empreendimento</FormLabel>
          <Select
            placeholder="Selecione uma construtora"
            border="1px solid #b8b8b8cc"
            isDisabled={!Construtora}
            onChange={(e: any) => setEmpreendimento(e.target.value)}
            value={Empreendimento}
          >
            {EmpreendimentoData.length > 0 &&
              EmpreendimentoData.map((empreedimento: any) => (
                <option key={empreedimento.id} value={empreedimento.id}>
                  {empreedimento.nome}
                </option>
              ))}
          </Select>
        </Box>
      </Box>

      <Box
        mt={6}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="full"
      >
        <Box w={{ base: "100%", md: "48%" }} mb={{ base: 4, md: 0 }}>
          <FormLabel>Cargo</FormLabel>
          <Select
            placeholder="Selecione um Cargo"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setCargo(e.target.value)}
          >
            <option value="vendedor">Vendedor</option>
            <option value="construtor">Construtor</option>
            <option value="gerente">Gerente</option>
            <option value="financeiro">Financeiro</option>
            <option value="admin">Admin</option>
          </Select>
        </Box>
        <Box w={{ base: "100%", md: "48%" }}>
          <FormLabel>Hierarquia</FormLabel>
          <Select
            placeholder="Selecione uma Hierarquia"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setHierarquia(e.target.value)}
          >
            <option value="USER">Vendedor</option>
            <option value="CONST">Construtora</option>
            <option value="CONST">Financeira</option>
            <option value="ADM">Administrador</option>
          </Select>
        </Box>
      </Box>

      <Box
        mt={6}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="full"
      >
        <Box w={{ base: "100%", md: "48%" }} mb={{ base: 4, md: 0 }}>
          <FormLabel>Senha</FormLabel>
          <SenhaComponent
            setvalue={password}
            onvalue={(e: any) => setPassword(e)}
          />
        </Box>
        <Box w={{ base: "100%", md: "48%" }}>
          <FormLabel>Confirme Sua Senha</FormLabel>
          <SenhaComponent
            setvalue={confirmPassword}
            onvalue={(e: any) => setConfirmPassword(e)}
          />
        </Box>
      </Box>
      <Button
        mt={5}
        mb={5}
        variant="outline"
        width="250px"
        height="50px"
        border="1px solid #b8b8b8cc"
        maxWidth="100%"
        textColor="Black"
        onClick={handlesubmit}
      >
        CRIAR CONTA
      </Button>
    </>
  );
}
