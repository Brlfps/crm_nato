import { NextResponse } from "next/server";

  /**
   * Verifica se o n mero de telefone   um n mero v lido do WhatsApp.
   * @param {Request} request - Requisi o recebida.
   * @param {Object} request.body - Objeto de dados da requisição.
   * @returns {Promise<NextResponse>} NextResponse com o status 200 e o resultado da verifica o ou NextResponse com o status 500 em caso de erro.
   */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { telefone } = data;
    const req = await fetch(
      `https://chatwebhook.redebrasilrp.com.br/webhook/test_whatsapp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ telefone: telefone }),
      }
    );
    const res = await req.json();
    if (req.ok) {
      return NextResponse.json(res, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
