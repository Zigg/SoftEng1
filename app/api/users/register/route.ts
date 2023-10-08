import bcrypt from "bcrypt";
import db from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// FIXME: Weird response body in the header, it throws an image null for some reason? The session throws a random image response upon being redirect to /
export async function POST(req: Request) {

  const body = await req.json();
  const {
    email,
    username,
    password,
  } = body;

  // TODO: I tested this it works, must implement also in the AuthForm, put in api/auth/[...nextauth]. It throws proper email and username already exists toast errors

  // if (!email || !username || !password) {
  //   return NextResponse.json("Missing required fields", { status: 400 });
  // }

  const existingUserEmail = await db.user.findUnique({
    where: {
      email: email
    }
  });

  const existingUserName = await db.user.findUnique({
    where: {
      username: username
    }
  });

  if (existingUserName) {
    return NextResponse.json({ user: null, message: "Username already exists" }, { status: 409 });
  }
  else if (existingUserEmail) {
    return NextResponse.json({ user: null, message: "Email already exists" }, { status: 409 });
  }


  const hashedPassword = await bcrypt.hash(password, 12);

  // DONE: Initialize the cart and wallet for the new user
  const newUser = await db.user.create({
    data: {
      email,
      username,
      hashedPassword,
      // TODO: Commented out first as this will result in increased row reads and insert to the database
      // For initializing the cart and wallet for the new user
      wallet: {
        create: {},
      },
      cart: {
        create: {},
      },
    },
    include: {
      wallet: true,
      cart: true,
    },
  })



  return NextResponse.json(newUser);
  // TODO: All appropriate errors will be handle in the next-auth api route

}
