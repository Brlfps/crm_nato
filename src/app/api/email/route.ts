import { NextResponse } from "next/server";
import { EmailHtml } from "./html";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const emailBody = EmailHtml(data.nome);

    const transporter = nodemailer.createTransport({
      host: "smtpi.kinghost.net",
      port: 465,
      secure: true,
      auth: {
        user: "verificador@redebrasilrp.com.br",
        pass: "Verify@123",
      },
      tls: { rejectUnauthorized: false },
    });

    const emailOptions: any = {
      from: "verificador@redebrasilrp.com.br",
      to: data.email,
      subject: `Confirmação de email`,
      html: emailBody.emailcorpo,
    };

    const email = await transporter.sendMail(emailOptions); // Adicione "await" aqui

    if (!email.messageId) {
      return NextResponse.json("Email não enviado", { status: 500 });
    }
    console.log("🚀 ~ POST ~ emailBody:", email)
    return NextResponse.json(emailBody.codigo, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return NextResponse.json(error, { status: 500 });
  }
}
