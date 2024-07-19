import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export default async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const session = await getServerSession(auth);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitacao/${id}`;
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`
      }
    });
    if (!request.ok)
      return NextResponse.json(
        { message: "Solicitação não encontrada" },
        { status: 404 }
      );
    const data = await request.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
