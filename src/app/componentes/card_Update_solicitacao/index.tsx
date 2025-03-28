import { CardCreateUpdate } from "@/app/implementes/cardCreateUpdate";
import { Alert, AlertIcon, Box, Divider, Flex } from "@chakra-ui/react";
import DistratoAlertPrint from "../Distrato_alert_print";
import { SaveBtm } from "@/app/implementes/cardCreateUpdate/butons/saveBtm";
import { CriarFcweb } from "../Btn/criarFcweb";
import { BtCreateAlertCliente } from "../bt_create_alert_cliente";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";
import { ResendSms } from "@/app/implementes/cardCreateUpdate/butons/resendSms";
import UserCompraProvider from "@/provider/UserCompra";
import { PrismaClient } from "@prisma/client";
import { Tag, TagsProps } from "@/data/tags";

const prisma = new PrismaClient();
type Props = {
  setDadosCard: solictacao.SolicitacaoGetType;
};
export async function CardUpdateSolicitacao({ setDadosCard }: Props) {
  const session = await getServerSession(auth);
  async function handleSubmit(prevState: any, data: FormData) {
    "use server";

    try {
      const tags: TagsProps = JSON.parse(data.get("Tags") as any);
      for (let i = 0; i < tags.length; i++) {
        const tag: Tag = tags[i];
        if (tag.label && session?.user.hierarquia === "ADM") {
          const verifique = await prisma.nato_tags.findFirst({
            where: {
              descricao: tag.label,
              solicitacao: Number(setDadosCard.id),
            },
          })
          const filtro = verifique ? false : true
          if (filtro) {
            await prisma.nato_tags.create({
              data: {
                descricao: tag.label,
                solicitacao: Number(setDadosCard.id),
              },
            });
          }
        }
      }
      const DateNascimento = data.get("DataNascimento")?.toString() || "";
      const Dados = {
        ...(!setDadosCard.ativo && { ativo: true }),
        ...(!setDadosCard.ativo &&
          session?.user.hierarquia !== "ADM" && {
            corretor: Number(session?.user?.id),
          }),
        ...(!setDadosCard.ativo &&
          session?.user.hierarquia === "ADM" && {
            corretor: Number(data.get("corretor")),
          }),
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

      console.log(Dados);

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

        if (response.name === "PrismaClientValidationError") {
          return {
            name: "PrismaClientValidationError",
            message: "Erro ao atualizar o registro",
            error: response,
          };
        }

        console.log("Atualização bem-sucedida:", response);
        return response;
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
          <UserCompraProvider>
            <Flex flexDir={"column"} gap={6} w={"100%"} h={"100%"} py={10}>
              <Flex
                flexDir={{ base: "column", md: "row" }}
                gap={5}
                px={4}
                justifyContent={{ base: "center", md: "space-between" }}
              >
                <CardCreateUpdate.GridCpf
                  CPF={setDadosCard?.cpf}
                  w={{ base: "100%", md: "10rem" }}
                />
                <CardCreateUpdate.GridName
                  Nome={setDadosCard.nome}
                  w={{ base: "100%", md: "33rem" }}
                />
                <CardCreateUpdate.GridDateNasc
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "10rem" }}
                />
                <CardCreateUpdate.GridRelacionamento
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "13rem" }}
                />
              </Flex>
              <Flex
                flexDir={{ base: "column", md: "row" }}
                gap={4}
                px={4}
                justifyContent={{ base: "center", md: "space-between" }}
              >
                <CardCreateUpdate.GridEmail
                  type="register"
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "25rem" }}
                />
                <CardCreateUpdate.GridTel
                  index={1}
                  DataSolicitacao={setDadosCard.telefone}
                  w={{ base: "100%", md: "10rem" }}
                />
                <CardCreateUpdate.GridTel
                  index={2}
                  DataSolicitacao={setDadosCard.telefone2}
                  w={{ base: "100%", md: "10rem" }}
                />
                <CardCreateUpdate.GridConstrutora
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "12rem" }}
                />
              </Flex>
              <Flex
                flexDir={{ base: "column", md: "row" }}
                flexWrap={{ base: "nowrap", md: "wrap" }}
                gap={10}
                px={4}
                justifyContent={{ base: "center", md: "space-between" }}
              >
                <CardCreateUpdate.GridEmpreedimentoCL
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "16rem" }}
                />
                <CardCreateUpdate.GridFinanceiraCl
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "16rem" }}
                />
                <CardCreateUpdate.GridCorretor
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "16rem" }}
                />
                <CardCreateUpdate.GridProtocolo
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "10rem" }}
                />
                <CardCreateUpdate.GridStatus
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "10rem" }}
                />
                <CardCreateUpdate.GridTagsAlert
                  ID={setDadosCard.id}
                  w={{ base: "100%", md: "18rem" }}
                />
                <CardCreateUpdate.GridLink
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "16rem" }}
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
                justifyContent={{ base: "center", md: "space-evenly" }}
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
                {setDadosCard.distrato && setDadosCard.ativo && (
                  <DistratoAlertPrint
                    userId={setDadosCard.distrato_id}
                    userDateTime={setDadosCard.distrato_dt}
                  />
                )}
                {!setDadosCard.ativo && (
                  <Alert status="error" variant="left-accent">
                    <AlertIcon />
                    Solicitação excluída
                  </Alert>
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
          </UserCompraProvider>
          <Flex
            w={"100%"}
            justifyContent={"end"}
            alignItems={"center"}
            gap={3}
            px={4}
          >
            {setDadosCard.distrato && setDadosCard.ativo && (
              <CardCreateUpdate.GridDistrato Id={setDadosCard.id} />
            )}
            {!setDadosCard.id_fcw && setDadosCard.ativo && (
              <CriarFcweb Id={setDadosCard.id} />
            )}
            {setDadosCard.ativo && (
              <BtCreateAlertCliente DataSolicitacao={setDadosCard} />
            )}
            {setDadosCard.ativo && <ResendSms id={setDadosCard.id} />}
            <SaveBtm colorScheme="green" type="submit">
              Salvar
            </SaveBtm>
          </Flex>
        </CardCreateUpdate.Form>
      </CardCreateUpdate.Root>
    </>
  );
}
