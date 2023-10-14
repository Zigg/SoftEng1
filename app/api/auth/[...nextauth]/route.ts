import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { PrismaAdapter } from "@next-auth/prisma-adapter"

import db from "@/app/libs/prismadb"
import { NextResponse } from "next/server"
import { User } from "@prisma/client"


// Properly implement this later this will serve as the default pages for the auth routes

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

        
        if (!user || !user.hashedPassword) {
          
          throw new Error('Invalid credentials');
        }

        // TODO: Return a page that says email not verified and a button to resend the email verification link | for now it just says an error screen that is not styled and is not a good ui/ux experience
        if (!user.accountActivated) {
          

          throw new Error('Email not verified');

        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          
          throw new Error('Invalid credentials');
        }


        return user;
      }
    })
  ],

  // TODO: Test these callbacks if they properly fetch the current users role
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        const User = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (User) {
          token.role = User.roleId;
        }
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session && token && token.role) {
        session.user = session.user || {};
        session.user.role = token.role;
      }
      return session;
    },
  },



  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };