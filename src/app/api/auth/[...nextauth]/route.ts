import NextAuth, { NextAuthOptions } from "next-auth";
import { auth as authOptions } from "@/lib/auth_confg";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
