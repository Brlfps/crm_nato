"use client";

import BotaoSair from "@/app/(private_routers)/home/componentes/botoes/bt_sair";
import BotaoVoltar from "@/app/componentes/bt_voltar";
import { DownloadDoc } from "@/app/componentes/DowloadDoc";
import { AlertComponent } from "@/app/componentes/alerts";
import { ModalFormComponent } from "@/app/componentes/modal";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Divider,
  Flex,
  chakra,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useToast,
  GridItem,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";
import { mask, unMask } from "remask";
import { BotaoRetorno } from "@/app/componentes/btm_retorno";

import { FaRegCopy } from "react-icons/fa";
import VerificadorFileComponent from "@/app/componentes/file";

interface DadosPessoaisProps {
  SetData: solictacao.SolicitacaoGetType;
}

async function SendFile(Arquivo: any) {
  
  const formData = new FormData();
  formData.append("file", Arquivo);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/file`,
    {
      method: "POST",
      body: formData,
    }
  );
      if (!response.ok) {
        console.log(response.statusText);
        throw new Error(`Error sending file: ${response.statusText}`);
      }
      console.log(response);

  const data = await response.json();
  console.log("🚀 ~ SendFile ~ data:", data)
  return data;
}

export const DadosPessoaisComponent = ({ SetData }: DadosPessoaisProps) => {
  const { data: session } = useSession();
  const input = session?.user?.hierarquia;
  const [Name, setName] = useState<string>("");
  const [Cpf, setCpf] = useState<string>("");
  const [Cnh, setCnh] = useState<string>("");
  const [Whatsapp, setWhatsapp] = useState<string>("");
  const [WhatsAppMask, setWhatsAppMask] = useState<string>("");
  const [Whatsappdois, setWhatsappdois] = useState<string>("");
  const [WhatsAppMaskdois, setWhatsAppMaskdois] = useState<string>("");
  const [CnhFile64, setCnhFile64] = useState<string>("");
  const [RgFile64, setRgFile64] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [LinkDoc, setLinkDoc] = useState<string>("");
  const [LinkDocMask, setLinkDocMask] = useState<string>("");
  const [IdFcweb, setsetIdFcweb] = useState<number | null>(null);
  const [Construtora, setConstrutora] = useState<string>("");
  const [ConstrutoraId, setConstrutoraId] = useState<number>(0);
  const [EmpreendimentoId, setEmpreendimentoId] = useState<number>(0);
  const [Empreendimento, setEmpreendimento] = useState<string>("");
  const [DataNascimento, setDataNascimento] = useState<Date | string | any>();
  const [Relacionamento, setRelacionamento] = useState<string>("");
  const [RelacionamentoUpdate, setRelacionamentoUpdate] = useState<string>("");
  const [RelacionamentoUpdateMask, setRelacionamentoUpdateMask] =
    useState<string>("");
  const [CreatedDate, setCreatedDate] = useState<string>("");
  const [Voucher, setVoucher] = useState<string>("");
  const [DataAprovacao, setDataAprovacao] = useState<string>("");
  const [RelacionamentoID, setRelacionamentoID] = useState<number>(0);
  const [AssDoc, setAssDoc] = useState<string>("");
  const [AssDocMask, setAssDocMask] = useState<string>("");
  const [Corretor, setCorretor] = useState<string>("");
  const [CorretorId, setCorretorId] = useState<number>(0);
  const [ClientId, setClientId] = useState<number>(0);
  const [Obs, setObs] = useState<string>("");
  const [AlertDb, setAlertDb] = useState<any>([]);
  const [Looad, setLooad] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (SetData && Name == "") {
      setClientId(SetData.id);
      setName(SetData.nome);
      setCpf(SetData.cpf && mask(SetData.cpf, ["999.999.999-99"]));
      setCnh(SetData.cnh);
      setWhatsapp(SetData.telefone);
      setWhatsAppMask(
        SetData.telefone &&
          mask(SetData.telefone, ["(99) 9999-9999", "(99) 9 9999-9999"])
      );
      setWhatsappdois(SetData.telefone2);
      setWhatsAppMaskdois(
        SetData.telefone2 &&
          mask(SetData.telefone2, ["(99) 9999-9999", "(99) 9 9999-9999"])
      );
      setEmail(SetData.email);
      setConstrutoraId(SetData.construtora && SetData.construtora.id);
      setConstrutora(SetData.construtora && SetData.construtora.fantasia);
      setEmpreendimento(SetData.empreedimento && SetData.empreedimento.nome);
      setEmpreendimentoId(SetData.empreedimento && SetData.empreedimento.id);
      const date = new Date(SetData.dt_nascimento);
      const formattedDate =
        SetData.dt_nascimento && date.toISOString().split("T")[0];
      setDataNascimento(formattedDate);
      setRelacionamento(
        SetData.relacionamento.map(
          (item: any) => item.cpf && mask(item.cpf, ["999.999.999-99"])
        )[0]
      );
      setRelacionamentoID(
        SetData.relacionamento.map((item: any) => item.id)[0]
      );
      console.log(SetData.relacionamento);
      // setAssDoc();
      setCorretor(SetData.corretor && SetData.corretor.nome);
      setCorretorId(SetData.corretor && SetData.corretor.id);
      setObs(SetData.obs);
      setAlertDb(SetData.alert == null ? [] : SetData.alert);
      setsetIdFcweb(SetData.id_fcw);
      setCreatedDate(new Date(SetData.createdAt).toLocaleDateString("pt-BR"));
      setDataAprovacao(
        SetData.fcweb?.dt_aprovacao
          ? new Date(SetData.fcweb?.dt_aprovacao).toLocaleDateString("pt-BR")
          : ""
      );
      setAssDoc(SetData.ass_doc);
      const Docmask =
        SetData.ass_doc && SetData.ass_doc.length > 45
          ? SetData.ass_doc.slice(0, 45) + "........"
          : SetData.ass_doc;
      setLinkDocMask(Docmask);
      setLinkDoc(SetData.link_doc);
      const AssDocmask =
        SetData.link_doc && SetData.link_doc.length > 45
          ? SetData.link_doc.slice(0, 45) + "........"
          : SetData.link_doc;
      setAssDocMask(AssDocmask);
      setVoucher(SetData.fcweb?.vouchersoluti);
      setCnhFile64(SetData.uploadCnh);
      setRgFile64(SetData.uploadRg);
    }
  }, [Name, SetData]);


  const handleSubmit: FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setLooad(true);

    try {
      const data = !SetData.ativo
        ? {
            ativo: true,
            cnh: Cnh,
            cpf: Cpf,
            nome: Name,
            telefone: Whatsapp,
            telefone2: Whatsappdois,
            email: Email,
            uploadRg: RgFile64 ? RgFile64 : SetData.uploadRg,
            uploadCnh: CnhFile64 ? CnhFile64 : SetData.uploadCnh,
            dt_nascimento: DataNascimento,
            ass_doc: AssDoc,
            link_doc: LinkDoc,
            id_fcw: IdFcweb,
            obs: Obs,
          }
        : {
            cnh: Cnh,
            cpf: Cpf,
            nome: Name,
            telefone: Whatsapp,
            telefone2: Whatsappdois,
            email: Email,
            uploadRg: RgFile64 ? RgFile64 : SetData.uploadRg,
            uploadCnh: CnhFile64 ? CnhFile64 : SetData.uploadCnh,
            dt_nascimento: DataNascimento,
            ass_doc: AssDoc,
            link_doc: LinkDoc,
            id_fcw: IdFcweb,
            obs: Obs,
          };

      const rest = await fetch(`/api/solicitacao/update/${ClientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!rest.ok) {
        toast({
          title: "Erro ao Atualizar o Registro",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLooad(false);
        return;
      }

      toast({
        title: "Cliente Atualizado Com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      window.location.reload();
      setLooad(false);
    } catch (error) {
      setLooad(false);
    }
  };
  const MascaraZap = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    setWhatsapp(valorLinpo);
    setWhatsAppMask(masked);
  };

  const MascaraZap2 = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    setWhatsappdois(valorLinpo);
    setWhatsAppMaskdois(masked);
  };

  const MaskCpfRelacionamento = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["999.999.999-99"]);
    setRelacionamentoUpdate(unMask(masked));
    setRelacionamentoUpdateMask(masked);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(AssDoc);
    toast({
      title: "Copiado",
      description: "Link copiado para a area de transferência",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const HandleDownloads = async (url: string) => {
    window.open(url, "_blank");
  };

   const handleFileUploadedRg = (result: any) => {
      setRgFile64(result.url);
   };
   const handleFileUploadedCnh = (result: any) => {
      setCnhFile64(result.url);
   };

  const handleCopy2 = () => {
    navigator.clipboard.writeText(LinkDoc);
    toast({
      title: "Copiado",
      description: "Link copiado para a area de transferência",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Flex
      w={"100%"}
      alignItems="center"
      flexDir="column"
      minH="100vh"
      p={4} // Padding ao redor do Flex
    >
      {/* Dados pessoais */}
      <Box
        w={{ base: "95%", md: "65%" }}
        p={6} // Padding interno
        bg="white"
        borderRadius={8}
        boxShadow="lg"
        mb={12} // Margin-bottom para espaçamento inferior
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <BotaoRetorno rota="/" />
          <Box>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Criado: {CreatedDate}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Aprovação: {DataAprovacao}
            </Text>
          </Box>
          <Box alignItems="center" textAlign={{ base: "center", md: "left" }}>
            <Text fontSize={{ base: "lg", md: "2xl" }}>Dados Pessoais</Text>
            {input !== "USER" && (
              <Text fontSize={{ base: "sm", md: "md" }}>
                Corretor: {Corretor}
              </Text>
            )}
          </Box>
        </Box>
        <Divider borderColor="#00713D" my={4} />
        <Stack spacing={6}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                CPF
              </FormLabel>
              <Input
                type="text"
                value={Cpf}
                variant="flushed"
                onChange={(e) => setCpf(e.target.value)}
              />
            </GridItem>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Nome Completo
              </FormLabel>
              <Input
                type="text"
                value={Name}
                variant="flushed"
                onChange={(e) => setName(e.target.value)}
              />
            </GridItem>

            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Data de Nascimento
              </FormLabel>
              <Input
                variant="flushed"
                value={DataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                type="date"
              />
            </GridItem>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Relacionamento
              </FormLabel>
              <chakra.p fontSize="xs" color={"red.500"}>
                * cpf do relacionamento
              </chakra.p>

              {SetData.relacionamento.length === 0 && (
                <Text>Não tem relacionamento</Text>
              )}
              {SetData.relacionamento.length > 0 && (
                <Link
                  href={`/solicitacoes/${RelacionamentoID}`}
                  color="teal.600"
                  fontWeight="bold"
                >
                  {Relacionamento}
                </Link>
              )}
            </GridItem>

            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Telefone Celular
              </FormLabel>
              <Input
                type="text"
                variant="flushed"
                onChange={MascaraZap}
                value={WhatsAppMask}
              />
            </GridItem>

            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Telefone 2
              </FormLabel>
              <Input
                type="text"
                variant="flushed"
                onChange={MascaraZap2}
                value={WhatsAppMaskdois}
              />
            </GridItem>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Email
              </FormLabel>
              <Input
                variant="flushed"
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </GridItem>

            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Construtora
              </FormLabel>
              <Input
                value={Construtora}
                onChange={(e) => setConstrutora(e.target.value)}
                type="text"
                variant="flushed"
              />
            </GridItem>

            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Empreendimento
              </FormLabel>
              <Input
                value={Empreendimento}
                onChange={(e) => setEmpreendimento(e.target.value)}
                type="text"
                variant="flushed"
              />
            </GridItem>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10}>
            {input !== "USER" && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  ID FCWEB
                </FormLabel>
                <Input
                  value={IdFcweb || ""}
                  onChange={(e) => setsetIdFcweb(Number(e.target.value))}
                  type="text"
                  variant="flushed"
                />
              </GridItem>
            )}
            {input !== "USER" && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  VOUCHER
                </FormLabel>
                <Text fontSize={{ base: "sm", md: "md", lg: "md" }}>
                  {Voucher}
                </Text>
              </GridItem>
            )}
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10}>
            {input !== "USER" && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  LINK FICHA
                </FormLabel>
                <Flex gap={3}>
                  <Input
                    value={AssDocMask}
                    onChange={(e) => setLinkDoc(e.target.value)}
                    type="text"
                    variant="flushed"
                  />
                  <Button
                    size="sm"
                    onClick={handleCopy2}
                    leftIcon={<FaRegCopy />}
                  />
                </Flex>
              </GridItem>
            )}
            {input !== "USER" && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  LINK CONTRATO
                </FormLabel>
                <Flex gap={3}>
                  <Input
                    value={LinkDocMask}
                    onChange={(e) => setAssDoc(e.target.value)}
                    type="text"
                    variant="flushed"
                  />
                  <Button
                    size="sm"
                    onClick={handleCopy}
                    leftIcon={<FaRegCopy />}
                  />
                </Flex>
              </GridItem>
            )}
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10}>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                CNH
              </FormLabel>
              <VerificadorFileComponent
                onFileUploaded={handleFileUploadedCnh}
              />
            </GridItem>

            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                RG
              </FormLabel>
              <VerificadorFileComponent onFileUploaded={handleFileUploadedRg} />
            </GridItem>

            {input !== "USER" && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  Downloads da CNH
                </FormLabel>
                {CnhFile64 && (
                  <Button
                    bg={"#00713D"}
                    textColor={"white"}
                    variant="solid"
                    _hover={{ bg: "#00631B" }}
                    size="lg"
                    onClick={() => HandleDownloads(CnhFile64)}
                  >
                    Download
                  </Button>
                )}
              </GridItem>
            )}
            {input !== "USER" && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  Download do RG
                </FormLabel>
                {RgFile64 && (
                  <Button
                    bg={"#00713D"}
                    textColor={"white"}
                    variant="solid"
                    _hover={{ bg: "#00631B" }}
                    size="lg"
                    onClick={() => HandleDownloads(RgFile64)}
                  >
                    Download
                  </Button>
                )}
              </GridItem>
            )}
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 1 }} spacing={6}>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Observações
              </FormLabel>
              <Textarea value={Obs} onChange={(e) => setObs(e.target.value)} />
            </GridItem>
          </SimpleGrid>
          <GridItem>
            <Flex gap={"10px"} justifyContent={"flex-end"} mt={"20px"}>
              <Button
                onClick={handleSubmit}
                colorScheme="green"
                variant="outline"
                textAlign="center"
                isLoading={Looad}
              >
                Salvar e Enviar
              </Button>
              {input !== "USER" && (
                <ModalFormComponent
                  rota={"CORRETROR"}
                  clienteId={ClientId}
                  empreedimento={EmpreendimentoId}
                  PostName={Name}
                  CorretorName={Corretor}
                  CorretorId={CorretorId}
                />
              )}
            </Flex>
          </GridItem>
        </Stack>
      </Box>
      {/* Fim dados Pessoais */}

      {/* Inicio Dados de contato */}
      <Box
        w={{ base: "95%", md: "65%" }} // Ajuste a largura conforme necessário
        p={6} // Padding interno
        bg="white"
        borderRadius={8}
        boxShadow="lg"
      >
        <Text fontSize={{ base: "xl", md: "2xl" }}>Alertas</Text>
        <Divider borderColor="#00713D" my={4} />
        <Stack spacing={6}>
          {AlertDb.length > 0 &&
            AlertDb.map((item: solictacao.AlertProps) => {
              const fakeStatus = true;
              return (
                <AlertComponent
                  key={item.id}
                  msg={item.texto}
                  titulo={item.titulo}
                  status={item.tag}
                  ID={item.id}
                  DeleteAlertStatus={
                    input === "USER" ? fakeStatus : item.status
                  }
                />
              );
            })}
        </Stack>
      </Box>
      {/* Fim dados de contato */}
    </Flex>
  );
};
