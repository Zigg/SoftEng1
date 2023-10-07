import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      username,
      password,
    } = body;

    // if (!email || !username || !password) {
    //   return NextResponse.json("Missing required fields", { status: 400 });
    // }

    // check if a user with the given email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json({ message: "Email already exists" }, { status: 409 });
      }
      if (existingUser.username === username) {
        return NextResponse.json({ message: "Username already exists" }, { status: 409 });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        hashedPassword
      }
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "REGISTER ERROR")
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
