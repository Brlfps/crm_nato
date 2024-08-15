import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { cpf: string } }
) {
  try {
    const { cpf } = params;
    const session = await getServerSession(auth);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/filter/doc/${cpf}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    if (!response.ok) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    const data = await response.json();
    console.log(data);
    // Verifique se o CPF existe nas solicitações
    const solicitacoes = data.filter(
      (solicitacao: any) => solicitacao.cpf === cpf
    );

    if (solicitacoes.length === 0) {
      return NextResponse.json(
        { exists: false, solicitacoes: [] },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { exists: true, solicitacoes: solicitacoes },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
