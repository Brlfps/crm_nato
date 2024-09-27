"use client";

import CheckEmail from "@/app/componentes/checkEmail";
import CpfMask from "@/app/componentes/cpf_mask";
import VerificadorFileComponent from "@/app/componentes/file";
import { SelectComponent } from "@/app/componentes/select";
import { SelectCorretor } from "@/app/componentes/select_user";
import { Whatsapp } from "@/app/componentes/whatsapp";
import Loading from "@/app/loading";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Icon,
  Input,
  InputGroup,
  chakra,
  SimpleGrid,
  Stack,
  Switch,
  Tooltip,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


import { mask, unMask } from "remask";

interface RelacionadoProps {
  SetValue: solictacao.SolicitacaoPost;
}



export default function RelacionadoForm({ SetValue }: RelacionadoProps) {
  const [nome, setnome] = useState("");
  const [cpf, setCpf] = useState("");
  const [ConstrutoraID, setConstrutoraID] = useState(0);
  const [FinanceiraID, setFinanceiraID] = useState(0);
  const [empreendimento, setempreendimento] = useState(0);
  const [email, setemail] = useState("");
  const [CorretorId, setCorretorId] = useState<number>(0);
  const [tel, setTel] = useState<string>("");
  const [teldois, SetTeldois] = useState<string>("");
  const [Whatappdois, setWhatappdois] = useState<string>("");
  const [Voucher, setVoucher] = useState<string>("");
  const [DataNascimento, setDataNascimento] = useState<Date | string | any>();
  const [Load, setLoad] = useState<boolean>(false);
  const [Sms, setSms] = useState<boolean>(true);
   const [UploadRgUrl, setUploadRgUrl] = useState<string>("");
  const [UploadCnhUrl, setUploadCnhUrl] = useState<string>("");
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (SetValue.cpfdois) {
      setCpf(SetValue.cpfdois.replace(/\W+/g, ""));
    }
  }, [SetValue]);

  const handlesubmit = () => {
    if (
      !nome ||
      !email ||
      !tel ||
      !email ||
      !DataNascimento
    ) {
      const capos = [];
      if (!nome) {
        capos.push("Nome");
      }
      if (!email) {
        capos.push("Email");
      }
      if (!tel) {
        capos.push("Telefone");
      }
      if (!DataNascimento) {
        capos.push("Data de Nascimento");
      }
      toast({
        title: "Preencha todos os campos",
        description:
          "os seguintes campos não foram preenchidos:" + capos.join(", "),
        status: "error",
        duration: 15000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      const dadossuperior: solictacao.SolicitacaoPost = {
        nome: SetValue.nome.toUpperCase(),
        telefone: SetValue.telefone.replace(/\W+/g, ""),
        cpf: SetValue.cpf.replace(/\W+/g, ""),
        telefone2: SetValue.telefone2.replace(/\W+/g, ""),
        email: SetValue.email.replace(/\s+/g, "").toLowerCase(),
        uploadRg: SetValue.uploadRg,
        uploadCnh: SetValue.uploadCnh,
        corretor: SetValue.corretor,
        construtora: SetValue.construtora,
        empreedimento: SetValue.empreedimento,
        dt_nascimento: SetValue.dt_nascimento,
        relacionamento: SetValue.relacionamento,
        rela_quest: SetValue.rela_quest,
        voucher: SetValue.voucher,
        financeiro: SetValue.financeiro,
      };
      const dados: solictacao.SolicitacaoPost = {
        nome: nome.toUpperCase(),
        telefone: tel.replace(/\W+/g, ""),
        cpf: cpf.replace(/\W+/g, ""),
        telefone2: teldois.replace(/\W+/g, ""),
        email: email,
        uploadRg: UploadRgUrl,
        uploadCnh: UploadCnhUrl,
        corretor: SetValue.corretor,
        construtora: SetValue.construtora,
        empreedimento: SetValue.empreedimento,
        dt_nascimento: DataNascimento,
        relacionamento: SetValue.cpf ? [SetValue.cpf] : [],
        rela_quest: SetValue.rela_quest ? true : false,
        voucher: Voucher,
        financeiro: SetValue.financeiro,
      };

      const data = [dados, dadossuperior];
      setLoad(true);
      data.map(async (item: any, index: number) => {
        const response = await fetch(
          `/api/solicitacao?sms=${Sms}&vendedor=${SetValue.vendedorName}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          }
        );
        if (response.ok) {
          toast({
            title: "Sucesso",
            description: "Solicitações enviadas com sucesso",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          if (data.length === index + 1) {
            router.push("/home");
            setLoad(false);
          }
        } else {
          toast({
            title: "Erro",
            description: "Erro ao enviar solicitacao",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setLoad(false);
          return null;
        }
      });
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

  if (Load) {
    return <Loading />;
  }

   const handleFileUploadedRg = (result: any) => {
     setUploadRgUrl(result.url);
   };
   const handleFileUploadedCnh = (result: any) => {
     setUploadCnhUrl(result.url);
   };


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
          <CpfMask
            desativado
            setvalue={SetValue.cpfdois ? SetValue.cpfdois : cpf}
            onvalue={setCpf}
          />
        </Box>
        <Box>
          <FormLabel>
            Nome Completo{" "}
            <chakra.p color={"red"} fontSize={"9px"}>
              (Obrigatório)
            </chakra.p>
          </FormLabel>
          <Input
            type="text"
            onChange={(e) => setnome(e.target.value.toUpperCase())}
            value={nome}
          />
        </Box>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={6}
        mt={6}
        alignItems={"end"}
      >
        <Box>
          <FormLabel>
            Data de Nascimento
            <chakra.p color={"red"} fontSize={"9px"}>
              (Obrigatório)
            </chakra.p>
          </FormLabel>
          <Input
            type="date"
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </Box>
        <GridItem>
          <FormLabel>
            Whatsapp com DDD{" "}
            <chakra.p color={"red"} fontSize={"9px"}>
              (Obrigatório)
            </chakra.p>
          </FormLabel>
          <Whatsapp setValue={tel} onValue={setTel} />
        </GridItem>
        <GridItem>
          <FormLabel>Whatsapp com DDD 2</FormLabel>
          <Input type="text" onChange={WhatsAppMask} value={Whatappdois} />
        </GridItem>
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={6}
        mt={6}
        alignItems={"end"}
      >
        <GridItem colSpan={1}>
          <FormLabel>
            Email{" "}
            <chakra.p color={"red"} fontSize={"9px"}>
              (Obrigatório)
            </chakra.p>
          </FormLabel>
          <InputGroup>
            <Input
              type="text"
              border="1px solid #b8b8b8cc"
              onChange={(e: any) =>
                setemail(e.target.value.replace(/\s+/g, "").toLowerCase())
              }
              value={email}
            />
          </InputGroup>
        </GridItem>

        {/* <GridItem>
          <FormLabel>
            Confirme o email{" "}
            <chakra.p color={"red"} fontSize={"9px"}>
              (Obrigatório)
            </chakra.p>
          </FormLabel>
          <InputGroup>
            <Input
              type="text"
              border="1px solid #b8b8b8cc"
              onChange={(e: any) =>
                setcheckEmail(e.target.value.replace(/\s+/g, "").toLowerCase())
              }
              value={checkEmail}
              onBlur={VerificadorEmail}
            />
          </InputGroup>
        </GridItem> */}
      </SimpleGrid>

      {/* <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mt={6}>
        {user?.construtora && (
          <Box>
            <FormLabel>Construtora</FormLabel>
            <SelectComponent
              hierarquia={user.hierarquia}
              tag="construtora"
              SetValue={user.construtora.map((item: any) => ({
                id: item.id,
                nome: item.fantasia,
              }))}
              onValue={(e: any) => setConstrutoraID(e)}
              DefaultValue={SetValue.construtora}
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
              DefaultValue={SetValue.financeiro}
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
              DefaultValue={SetValue.empreedimento}
            />
          </Box>
        )}
        {user?.hierarquia === "ADM" && (
          <Box>
            <FormLabel>Corretor</FormLabel>
            <SelectCorretor
              idcorretor={setCorretorId}
              setCorretor={SetValue.corretor}
            />
          </Box>
        )}
      </SimpleGrid> */}

      <SimpleGrid columns={{ base: 1 }} spacing={6} mt={6}>
        <Alert status="warning" variant="left-accent">
          <AlertIcon />
          Ao subir os arquivos, de preferencia a cnh exportado da app CNH
          Digital ou foto da CNH totalmente aberta.
        </Alert>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={6} mt={6}>
        <FormControl as={GridItem}>
          <FormLabel>CNH</FormLabel>
          <VerificadorFileComponent onFileUploaded={handleFileUploadedCnh} />
        </FormControl>
        <FormControl as={GridItem}>
          <FormLabel>RG</FormLabel>
          <VerificadorFileComponent onFileUploaded={handleFileUploadedRg} />
        </FormControl>
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
        {user?.hierarquia === "ADM" && (
          <Box>
            <FormLabel>Envio de SMS</FormLabel>
            <Flex alignItems={"flex-start"}>
              <Switch
                colorScheme="green"
                size="lg"
                onChange={(e) => setSms(e.target.checked)}
                isChecked={Sms}
              />
            </Flex>
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
        // hidden={relacionamento === "sim"}
      >
        CRIAR CONTA
      </Button>
    </Stack>
  );
}
