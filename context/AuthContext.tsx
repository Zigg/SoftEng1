"use client";

import { SessionProvider } from "next-auth/react";

// TODO: Enforce the protected routes for all pages
export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ 
  children
}: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}