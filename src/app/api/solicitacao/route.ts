import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth_confg";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getServerSession(auth);
    if (!session) {
      return new Response("Unauthorized2", { status: 401 });
    }
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`
        },
        body: JSON.stringify(body)
      }
    );

    const data = await user.json();
    if (!user.ok) {
      return new Response("Invalid credentials", { status: 401 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
