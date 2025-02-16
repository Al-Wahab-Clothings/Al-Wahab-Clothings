import type { ISODateString, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const user = { id: "1001", name: "Rida Naz", password: "ridanaz" };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Set a secret for NextAuth.js session encryption

  callbacks: {
    async session({ session, token }) {
      // Add user ID to session

      interface Session {
        user?: {
          name?: string | null
          email?: string | null
          image?: string | null
          unique_id?: string | null
        }
        expires: ISODateString
      }

      let sessionToReturn: Session = {
        user: {
          ...session?.user,
          unique_id: token.sub
        },
        expires: session?.expires
      }
      return sessionToReturn;
    },
  },
};