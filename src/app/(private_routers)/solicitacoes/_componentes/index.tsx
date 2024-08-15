"use client";
import CpfMask from "@/app/componentes/cpf_mask";
import { SelectComponent } from "@/app/componentes/select";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  chakra,
  Select,
  SimpleGrid,
  Stack,
  Tooltip,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import CheckEmail from "@/app/componentes/checkEmail";
import { Whatsapp } from "@/app/componentes/whatsapp";
import { SelectCorretor } from "@/app/componentes/select_user";
import Loading from "@/app/loading";
import VerificadorFileComponent from "@/app/componentes/file";
import { ModalConsultaRegistro } from "@/app/componentes/modal_consulra_registro";
import { mask, unMask } from "remask";

interface relacionamentoProps {
  onvalue: any;
  ishidden: any;
}

export default function SolicitacaoForm({
  onvalue,
  ishidden,
}: relacionamentoProps) {
  const [nome, setnome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfdois, setCpfdois] = useState("");
  const [ConstrutoraID, setConstrutoraID] = useState(0);
  const [FinanceiraID, setFinanceiraID] = useState(0);
  const [empreendimento, setempreendimento] = useState(0);
  const [CorretorId, setCorretorId] = useState(0);
  const [email, setemail] = useState("");
  const [uploadCnh, setCnhFile] = useState<string>("");
  const [uploadRg, setRgFile] = useState<string>("");
  const [relacionamento, setrelacionamento] = useState<string>("nao");
  const [Voucher, setVoucher] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [teldois, SetTeldois] = useState<string>("");
  const [teste, setTeste] = useState<any>([]);
  const [DataNascimento, setDataNascimento] = useState<Date | string | any>();
  const [Load, setLoad] = useState<boolean>(false);
  const [checkEmailString, setcheckEmailString] = useState<string>("");
  const [codigo, setcodigo] = useState<boolean>(false);
  const [Whatappdois, setWhatappdois] = useState<string>("");
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handlesubmit = async () => {
    if (!codigo) {
      toast({
        title: "Erro",
        description: "Falha na verificação de Email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (!nome || !cpf || !email || !relacionamento) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const data: solictacao.SolicitacaoPost = {
        nome: nome,
        telefone: tel,
        cpf: cpf,
        telefone2: teldois,
        email: email,
        uploadRg: uploadRg,
        uploadCnh: uploadCnh,
        corretor: user?.hierarquia === "ADM" ? CorretorId : Number(user?.id),
        construtora: Number(ConstrutoraID),
        empreedimento: Number(empreendimento),
        dt_nascimento: DataNascimento,
        relacionamento: cpfdois ? [cpfdois] : [],
        rela_quest: relacionamento === "sim" ? true : false,
        voucher: Voucher,
        Financeira: Number(FinanceiraID),
      };

      try {
        setLoad(true);
        const response = await fetch("/api/solicitacao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          toast({
            title: "Sucesso",
            description: "Solicitacao enviada com sucesso",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setLoad(false);
          router.push("/home");
        }
      } catch (error) {}
    }
  };

  if (user?.empreendimento.length === 1 && !empreendimento) {
    setempreendimento(user.empreendimento[0].id);
  }

  if (user?.construtora.length === 1 && !ConstrutoraID) {
    setConstrutoraID(user.construtora[0].id);
  }

  if (user?.Financeira?.length === 1 && !FinanceiraID) {
    setFinanceiraID(user.Financeira[0].id);
  }

  const VerificadorEmail = (e: any) => {
    const value = e.target.value;
    if ("NT-" + value == checkEmailString) {
      setcodigo(true);
      toast({
        title: "Sucesso",
        description: "Email verificado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setcheckEmailString(value);
      setcodigo(false);
      toast({
        title: "Erro",
        description: "Falha na verificação de Email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCpfChange = (cpf: string) => {
    setCpf(cpf);
  };

  useEffect(() => {
    if (
      relacionamento === "sim" &&
      cpfdois.length === 11 &&
      nome &&
      cpf &&
      email &&
      tel &&
      DataNascimento
    ) {
      if (!codigo) {
        toast({
          title: "Erro",
          description: "Falha na verificação de Email",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        ishidden("sim");

        const data: solictacao.SolicitacaoPost = {
          nome: nome,
          cpf: cpf,
          telefone: tel,
          telefone2: teldois,
          dt_nascimento: DataNascimento,
          email: email,
          uploadRg: uploadRg,
          uploadCnh: uploadCnh,
          corretor: user?.hierarquia === "ADM" ? CorretorId : Number(user?.id),
          relacionamento: [cpfdois],
          cpfdois: cpfdois,
          construtora: Number(ConstrutoraID),
          empreedimento: Number(empreendimento),
          Financeira: Number(FinanceiraID),

          rela_quest: relacionamento === "sim" ? true : false,
          voucher: Voucher,
        };
        onvalue(data);
      }
    }

    if (relacionamento === "nao" || cpfdois.length < 11) {
      ishidden("nao");
    }
  }, [
    ConstrutoraID,
    CorretorId,
    DataNascimento,
    Voucher,
    codigo,
    cpf,
    cpfdois,
    email,
    empreendimento,
    ishidden,
    nome,
    onvalue,
    relacionamento,
    tel,
    teldois,
    toast,
    uploadCnh,
    uploadRg,
    user?.hierarquia,
    user?.id,
  ]);
  console.log("teste", user);

  if (Load) {
    return <Loading />;
  }

  const WhatsAppMask = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    SetTeldois(unMask(masked));
    setWhatappdois(masked);
  };

  return (
    <Stack spacing={4} p={4} maxWidth="900px" mx="auto">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={6}>
        <Box>
          <FormLabel>CPF</FormLabel>
          <CpfMask desativado setvalue={cpf} onvalue={setCpf} />
        </Box>
        <Box>
          <FormLabel>
            <Flex alignItems={"flex-start"}>
              Nome Completo{" "}
              <chakra.p color={"red"} fontSize={"9px"}>
                (Obrigatório)
              </chakra.p>
            </Flex>
          </FormLabel>
          <Input type="text" onChange={(e) => setnome(e.target.value)} />
        </Box>
      </SimpleGrid>

      <ModalConsultaRegistro onCpfChange={handleCpfChange} />

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={6}
        mt={6}
        alignItems={"end"}
      >
        <GridItem>
          <FormLabel>
            <Flex alignItems={"flex-start"}>
              Data de Nascimento{" "}
              <chakra.p color={"red"} fontSize={"9px"}>
                (Obrigatório)
              </chakra.p>
            </Flex>
          </FormLabel>
          <Input
            type="date"
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </GridItem>
        <GridItem>
          <FormLabel>
            <Flex alignItems={"flex-start"}>
              Whatsapp com DDD{" "}
              <chakra.p color={"red"} fontSize={"9px"}>
                (Obrigatório)
              </chakra.p>
            </Flex>
          </FormLabel>
          <Whatsapp setValue={tel} onValue={setTel} />
        </GridItem>
        <GridItem>
          <FormLabel>Whatsapp com DDD 2</FormLabel>
          <Input type="text" onChange={WhatsAppMask} value={Whatappdois} />
        </GridItem>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={6}
        mt={6}
        alignItems={"end"}
      >
        <GridItem colSpan={{ base: 1, md: 1, lg: 2 }}>
          <FormLabel>
            <Flex alignItems={"flex-start"}>
              Email{" "}
              <chakra.p color={"red"} fontSize={"9px"}>
                (Obrigatório)
              </chakra.p>
            </Flex>
          </FormLabel>
          <InputGroup>
            <Input
              type="text"
              border="1px solid #b8b8b8cc"
              onChange={(e: any) => setemail(e.target.value)}
            />
            <InputRightElement width="8rem">
              <CheckEmail
                onvalue={(e: any) => setcheckEmailString(e)}
                email={email}
                nome={nome}
              />
            </InputRightElement>
          </InputGroup>
        </GridItem>
        <GridItem>
          <FormLabel>Codigo email</FormLabel>
          <InputGroup>
            <InputLeftAddon>NT-</InputLeftAddon>
            <Input
              type="text"
              onChange={VerificadorEmail}
              textTransform={"uppercase"}
            />
          </InputGroup>
        </GridItem>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mt={6}>
        {user?.construtora && (
          <Box>
            <FormLabel>Construtora</FormLabel>
            <SelectComponent
              hierarquia={user.hierarquia}
              tag="construtora"
              SetValue={user.construtora.map((item: any) => ({
                id: item.id,
                nome: item.razaosocial,
              }))}
              onValue={(e: any) => setConstrutoraID(e)}
            />
          </Box>
        )}
        {user?.Financeira && (
          <Box>
            <FormLabel>Financeira</FormLabel>
            <SelectComponent
              hierarquia={user.hierarquia}
              tag="Financeira"
              SetValue={user.Financeira}
              onValue={(e: any) => setFinanceiraID(e)}
            />
          </Box>
        )}
        {user?.empreendimento && (
          <Box>
            <FormLabel>Empreendimento</FormLabel>
            <SelectComponent
              hierarquia={user.hierarquia}
              tag="empreendimento"
              SetValue={user.empreendimento}
              onValue={(e: any) => setempreendimento(e)}
            />
          </Box>
        )}
        {user?.hierarquia === "ADM" && (
          <Box>
            <FormLabel>Corretor</FormLabel>
            <SelectCorretor idcorretor={setCorretorId} />
          </Box>
        )}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={6} mt={6}>
        <FormControl as={GridItem}>
          <FormLabel>CNH</FormLabel>
          <VerificadorFileComponent onFileConverted={setCnhFile} />
        </FormControl>

        <FormControl as={GridItem}>
          <FormLabel>RG</FormLabel>
          <VerificadorFileComponent onFileConverted={setRgFile} />
        </FormControl>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
        <Box>
          <FormLabel>
            Relacionamento
            <Tooltip
              label="Preencha este campo caso o Contrato contenha mais de um proprietário"
              aria-label="A tooltip"
            >
              <Icon ml={2} color="black" cursor="pointer" boxSize={3} />
            </Tooltip>
          </FormLabel>
          <Select
            onChange={(e) => setrelacionamento(e.target.value)}
            value={relacionamento}
          >
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </Select>
        </Box>

        {relacionamento === "sim" && (
          <Box>
            <FormLabel>
              <Flex alignItems={"flex-start"}>
                CPF do relacionado{" "}
                <chakra.p color={"red"} fontSize={"9px"}>
                  (Obrigatório)
                </chakra.p>
              </Flex>
            </FormLabel>
            <CpfMask setvalue={cpfdois} onvalue={setCpfdois} />
          </Box>
        )}

        {user?.hierarquia === "ADM" && (
          <Box>
            <FormLabel>
              Voucher
              <Tooltip
                label="Voucher para Atendimento em qualquer unidade Soluti"
                aria-label="A tooltip"
              >
                <Icon ml={1} color="black" cursor="pointer" boxSize={3} />
              </Tooltip>
            </FormLabel>
            <Input type="text" onChange={(e) => setVoucher(e.target.value)} />
          </Box>
        )}
      </SimpleGrid>

      <Button
        mt={6}
        variant="outline"
        width="100%"
        maxWidth="250px"
        height="50px"
        onClick={handlesubmit}
        hidden={relacionamento === "sim"}
      >
        CRIAR CONTA
      </Button>
    </Stack>
  );
}
