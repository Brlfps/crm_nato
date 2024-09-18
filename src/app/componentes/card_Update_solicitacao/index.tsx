import { CardCreateUpdate } from "@/app/implementes/cardCreateUpdate";
import { Alert, AlertIcon, Box, Divider, Flex } from "@chakra-ui/react";
import DistratoAlertPrint from "../Distrato_alert_print";
import { SaveBtm } from "@/app/implementes/cardCreateUpdate/butons/saveBtm";
import { CriarFcweb } from "../Btn/criarFcweb";
import { BtCreateAlertCliente } from "../bt_create_alert_cliente";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";
import { redirect } from "next/navigation";
import { ResendSms } from "@/app/implementes/cardCreateUpdate/butons/resendSms";

type Props = {
  setDadosCard: solictacao.SolicitacaoGetType;
};
export async function CardUpdateSolicitacao({ setDadosCard }: Props) {
  const session = await getServerSession(auth);
  async function handleSubmit(prevState: any, data: FormData) {
    "use server";

    console.log(data);
    try {
      const DateNascimento = data.get("DataNascimento")?.toString() || "";
      const Dados = {
        ...(!setDadosCard.ativo && { ativo: true }),
        ...(data.get("cpf") && { cpf: data.get("cpf") }),
        ...(data.get("nome") && { nome: data.get("nome") }),
        ...(data.get("telefones1") && { telefone: data.get("telefones1") }),
        ...(data.get("telefones2") && { telefone2: data.get("telefones2") }),
        ...(data.get("email") && { email: data.get("email") }),
        ...(data.get("update_RG") && { uploadRg: data.get("update_RG") }),
        ...(data.get("update_CNH") && { uploadCnh: data.get("update_CNH") }),
        ...(data.get("DataNascimento") && {
          dt_nascimento: DateNascimento,
        }),
        ...(data.get("Obs") && { obs: data.get("Obs") }),
        ...(data.get("empreendimento") && {
          empreedimento: Number(data.get("empreendimento")),
        }),
        ...(data.get("construtora") && {
          construtora: Number(data.get("construtora")),
        }),
        ...(data.get("financeiro") && {
          financeiro: Number(data.get("financeiro")),
        }),
        ...(data.get("links") && {
          mult_link: data.get("links")
            ? data.get("links")?.toString().split(", ")
            : [],
        }),
        ...(data.get("Relacionamento") && {
          relacionamento: data.get("Relacionamento")
            ? JSON.parse(data.get("Relacionamento")?.toString() || "")
            : [],
        }),
        ...(data.get("Relacionamento") && { rela_quest: true }),
      };

      const request = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/update/${setDadosCard.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
          body: JSON.stringify(Dados),
        }
      );

      if (request.ok) {
        const response = await request.json();
        console.log("Atualização bem-sucedida:", response);
        return response;
        // redirect("/");
      } else {
        console.error("Erro ao atualizar:", request.statusText);
      }
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
      return error;
    }
  }

  return (
    <>
      <CardCreateUpdate.Root>
        <CardCreateUpdate.Headers SetDados={setDadosCard} />
        <Divider borderColor="#00713D" my={4} />
        <CardCreateUpdate.Form action={handleSubmit}>
          <Flex flexDir={"column"} gap={6} w={"100%"} h={"100%"} py={10}>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={10}
              px={4}
              justifyContent={{ base: "center", md: "space-between" }}
            >
              <CardCreateUpdate.GridCpf
                CPF={setDadosCard?.cpf}
                w={{ base: "100%", md: "13rem" }}
              />
              <CardCreateUpdate.GridName
                Nome={setDadosCard.nome}
                w={{ base: "100%", md: "30rem" }}
              />
              <CardCreateUpdate.GridDateNasc
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "15rem" }}
              />
            </Flex>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={10}
              px={4}
              justifyContent={{ base: "center", md: "space-between" }}
            >
              <CardCreateUpdate.GridRelacionamento
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "15rem" }}
              />
              <CardCreateUpdate.GridTel
                index={1}
                DataSolicitacao={setDadosCard.telefone}
                w={{ base: "100%", md: "15rem" }}
              />
              <CardCreateUpdate.GridTel
                index={2}
                DataSolicitacao={setDadosCard.telefone2}
                w={{ base: "100%", md: "15rem" }}
              />
            </Flex>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={10}
              px={4}
              justifyContent={{ base: "center", md: "space-between" }}
            >
              <CardCreateUpdate.GridEmail
                type="register"
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "25rem" }}
              />
              <CardCreateUpdate.GridConstrutora
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "16rem" }}
              />
              <CardCreateUpdate.GridEmpreedimentoCL
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "15rem" }}
              />
            </Flex>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={10}
              px={4}
              justifyContent={{ base: "center", md: "space-between" }}
            >
              <CardCreateUpdate.GridFinanceiraCl
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "25rem" }}
              />
              <CardCreateUpdate.GridProtocolo
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "15rem" }}
              />
              <CardCreateUpdate.GridStatus
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "15rem" }}
              />
            </Flex>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={10}
              px={4}
              justifyContent={{ base: "center", md: "space-between" }}
            >
              <CardCreateUpdate.GridLink
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "25rem" }}
              />
            </Flex>
            <Box>
              <Alert status="info" variant="left-accent">
                <AlertIcon />
                Os processos com CNH anexada terão prioridade no atendimento.
              </Alert>
            </Box>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={10}
              px={4}
              justifyContent={{ base: "center", md: "space-between" }}
            >
              <CardCreateUpdate.GridUpdateDocument
                tag="CNH"
                Url={setDadosCard.uploadCnh}
                w={{ base: "100%", md: "19rem" }}
              />
              <CardCreateUpdate.GridUpdateDocument
                tag="RG"
                Url={setDadosCard.uploadRg}
                w={{ base: "100%", md: "19rem" }}
              />
            </Flex>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={10}
              px={4}
              justifyContent={{ base: "center", md: "space-between" }}
            >
              <CardCreateUpdate.GridObs
                DataSolicitacao={setDadosCard}
                w={"100%"}
              />
            </Flex>
            <Flex w={"100%"}>
              {setDadosCard.distrato && (
                <DistratoAlertPrint
                  userId={setDadosCard.distrato_id}
                  userDateTime={setDadosCard.distrato_dt}
                />
              )}
            </Flex>
            <Flex>
              {setDadosCard.logDelete && (
                <CardCreateUpdate.GridHistorico
                  DataSolicitacao={setDadosCard}
                  w={"100%"}
                />
              )}
            </Flex>
          </Flex>
          <Flex
            w={"100%"}
            justifyContent={"end"}
            alignItems={"center"}
            gap={3}
            px={4}
          >
            {setDadosCard.distrato && (
              <CardCreateUpdate.GridDistrato Id={setDadosCard.id} />
            )}
            {!setDadosCard.id_fcw && <CriarFcweb Id={setDadosCard.id} />}
            <BtCreateAlertCliente DataSolicitacao={setDadosCard} />
            <ResendSms id={setDadosCard.id} />
            <SaveBtm colorScheme="green" type="submit">
              Salvar
            </SaveBtm>
          </Flex>
        </CardCreateUpdate.Form>
      </CardCreateUpdate.Root>
    </>
  );
}
