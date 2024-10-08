import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth_confg";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(auth)
    const token  = session?.token;

    const user = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!user.ok) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }
    const data = await user.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
