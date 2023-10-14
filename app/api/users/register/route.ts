import bcrypt from "bcrypt";
import db from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { RoleName } from "@prisma/client";

// TODO: Email Verification
// For email verification
// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');

// FIXME: After registering properly route the user to the email verification page and send the email verification link to the user's email setup a page for resending the email verification link if applicable 
// TODO: For now we can just set the email within the database as verified to bypass this filter for testing purposes. Once the admin dashboard is done we will try and implement it there


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
  if (existingUserEmail) {
    return NextResponse.json({ user: null, message: "Email already exists" }, { status: 409 });
  }


  const hashedPassword = await bcrypt.hash(password, 12);



  // DONE: Initialize the cart and wallet for the new user
  
 // Fetch the 'CUSTOMER' role
//  Remember to run the script to seed the roles otherwise this will throw an error
// Any user who signs up will have a default role set to customer
// TODO: fix the admin-seed script to properly seed an admin user, only one seed will be needed, then after you can just assign an admin user within the admin dashboard and also allow for admins to register users ?? not sure yet 
const customerRole = await db.role.findFirst({ where: { name: RoleName.CUSTOMER } });

if (!customerRole) {
  throw new Error('Role CUSTOMER not found');
}




// Create a new user with the 'CUSTOMER' role, new wallet, and new cart
const newUser = await db.user.create({
  data: {
    email,
    username,
    hashedPassword,
    wallet: {
      create: {},
    },
    cart: {
      create: {},
    },
    role: {
      connect: {
        id: customerRole.id,
        
      },
    },
  },
  include: {
    wallet: true,
    cart: true,
    role: true,
  },
});




  

  // const oAuth2Client = new google.auth.OAuth2(
  //   process.env.GMAIL_CLIENT_ID,
  //   process.env.GMAIL_CLIENT_SECRET,
  //   'https://developers.google.com/oauthplayground'
  // );

  // oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

  // const accessToken = oAuth2Client.getAccessToken();

  // // TODO: Fetch these keys
  // let transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: 'your-email@gmail.com',
  //     clientId: process.env.GMAIL_CLIENT_ID,
  //     clientSecret: process.env.GMAIL_CLIENT_SECRET,
  //     refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  //     accessToken: accessToken,
  //   },
  // });


  const activationToken = await db.activationToken.create({
    data: {
      token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      userId: newUser.id,
    }
  });


  // const mailOptions = {
  //   from: 'Email Verification <your-email@gmail.com>', // sender address
  //   to: newUser.email, // list of receivers
  //   subject: 'Email Verification', // Subject line
  //   text: 'Hello ' + newUser.username + ',\n\n' +
  //     `Please verify your account by clicking the link: http://localhost:3000/verification/${activationToken.token}\n\n` +
  //     'Thank you!\n' // plain text body
  // };

  // // send mail with defined transport object
  // transporter.sendMail(mailOptions, (error: any, info: { messageId: any; }) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log('Message sent: %s', info.messageId);
  // });





  return NextResponse.json(newUser);
  // TODO: All appropriate errors will be handle in the next-auth api route

}
