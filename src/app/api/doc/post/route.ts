import { NextResponse } from "next/server";




export async function POST(request: Request) {
    try {
        const File = await request.formData();
        if (!File) throw { message: "Arquivo não informado, por favor entre em contato com o Suporte" };

        const Envio = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/file`, {
            method: 'POST',
            body: File,
            cache: 'no-store'
        });
        const retornoArquivo = await Envio.json();
        if (retornoArquivo.error) throw retornoArquivo.error;

        return NextResponse.json({ data: retornoArquivo, message: "Arquivo enviado com sucesso" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json(error.message, { status: error.status || 500 });
    }
}