import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";


export const auth: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "123 de olivera 4" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any, req) {
        try {
          const dados = {
            username: credentials.email,
            password: credentials.password
          };
          const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth`,{
            method: "POST",
            body: JSON.stringify(dados),
            headers: {
              "Content-Type": "application/json"
            },
          });

          const retorno = await res.json();
          console.log("🚀 ~ authorize ~ retorno:", retorno)
          const { token, expires, user } = retorno;

          const {
            id,
            username,
            nome,
            email,
            cpf,
            construtora,
            telefone,
            empreendimento,
            hierarquia,
            cargo,
            reset_password,
            Financeira
          } = await user;

          const response = {
            jwt: token,
            id: id,
            name: nome,
            username: username,
            email: email,
            cpf: cpf,
            construtora: construtora,
            telefone: telefone,
            empreendimento: empreendimento,
            hierarquia: hierarquia,
            cargo: cargo,
            tokenexpires: expires,
            reset_password: reset_password,
            Financeira: Financeira 
          };

          if (!token || !id || !username) {
            throw new Error("Usuário e senha incorreto");
            return null;
          }
          return response;
        } catch (e: any) {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    signOut: "/auth/signout"
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET || "secret"
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET || "123456",
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60 // 4 hours
  },
  callbacks: {
    jwt: async ({
      token,
      user
    }: {
      token: JWT;
      user: any;
    }): Promise<any | null> => {
      const isSignIn = !!user;

      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      const tokenExpirationInSeconds = Math.floor(3 * 60 * 60); // 4 hours

      if (isSignIn) {
        if (!user?.jwt || !user?.id || !user?.name || !user?.email) {
          return null;
        }

        token.jwt = user.jwt;
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
        token.cpf = user.cpf;
        token.construtora = user.construtora;
        token.telefone = user.telefone;
        token.empreendimento = user.empreendimento;
        token.hierarquia = user.hierarquia;
        token.cargo = user.cargo;
        token.reset_password = user.reset_password;
        token.Financeira = user.Financeira;

        token.expiration = actualDateInSeconds + tokenExpirationInSeconds;
      } else {
        if (!token?.expiration) {
          return null;
        }
      }

      return token as unknown as JWT;
    },
    session: async ({
      session,
      token
    }: {
      session: any;
      token: JWT;
    }): Promise<any | null> => {
      if (
        !token?.jwt ||
        !token?.id ||
        !token?.name ||
        !token?.email ||
        !token?.expiration
      ) {
        return null;
      }

      session.user = {
        id: token.id as number,
        username: token.username as string,
        name: token.name as string,
        email: token.email as string,
        cpf: token.cpf as string,
        construtora: token.construtora as any[],
        telefone: token.telefone as string,
        empreendimento: token.empreendimento as any[],
        hierarquia: token.hierarquia as string,
        cargo: token.cargo as string,
        reset_password: token.reset_password as boolean,
        Financeira: token.Financeira as any[]
      };

      session.token = token.jwt as string;
      return session;
    }
  }
}