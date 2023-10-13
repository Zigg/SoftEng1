import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { PrismaAdapter } from "@next-auth/prisma-adapter"

import db from "@/app/libs/prismadb"
import { NextResponse } from "next/server"
import { User } from "@prisma/client"


// Properly implement this later

// const pages = {
//   signIn: '/auth/signin',
//   signOut: '/auth/signout',
//   error: '/auth/error', // Error code passed in query string as ?error=
//   verifyRequest: '/auth/verify-request', // (used for check email message)
//   newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
// };


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [

    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },

      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          }
        });

        // If i use NextResponse here, authorize throws an error. Finding out why this causing a type error????. First cause was when i set model id's to int instead of string
        if (!user || !user.hashedPassword) {
          // return NextResponse.json({ user: null, message: "User not found" }, { status: 404 });
          throw new Error('Invalid credentials');
        }

        // FIXME: Properly return the toast error within the callback function to the client, to properly display the error message. Currently throws "Invalid credentials"
        if (!user.accountActivated) {
          // return NextResponse.json({ user: null, message: "Email not verified" }, { status: 401 });

          throw new Error('Email not verified');

        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          // return NextResponse.json({ user: null, message: "Invalid credentials" }, { status: 401 });
          throw new Error('Invalid credentials');
        }


        return user;
      }
    })
  ],

  // TODO: Test these callbacks if they properly fetch the current users role
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        const User = await db.user.findUnique({ where: { email: user.email } });
        if (User) {
          token.role = User.roleId;
        }
      }

      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (session && token && token.role) {
        session.user = session.user || {};
        session.user.role = token.role;
      }
      return session;
    }

  },



  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };