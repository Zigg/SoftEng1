import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import getCurrentUser from "@/app/actions/getCurrentUser";

import db from "@/app/libs/prismadb";

// TODO: Dashboard placeholder
import Link from "next/link";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  useEffect,
  useState,
} from "react";

import getCurrentUserRole from "@/app/actions/getCurrentUserRole";

// function setCurrentUser() {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     async function fetchUser() {
//       const user = await getCurrentUser();
//       setCurrentUser(user?.username);
//     }

//     fetchUser();
//   }, []);
// }


function Dashboard() {
  // This is not working, it is not getting the user's role, it should dynamically render the sidebar based on the user's role


  return (
    <nav className="container mx-auto flex justify-between p-6 px-4">
      <div className="flex justify-between items-center w-full">
        <div className="xl:w-1/3">
          <Link
            // Add the logo beside the text or maybe just the logo
            className="block text-lg max-w-max ext-coolGray-500 hover:text-coolGray-900 font-medium"
            href="/"
          >
            {/* Add logo icon */}
            {/* <Icon/> */}
            Ordering System
          </Link>
        </div>

        <div className="xl:block xl:w-1/3">
          <div className="flex items-center justify-end">
            {/* Update the link */}
            <Link
              className="inline-block py-2 px-4 leading-5 text-gray-900 hover:text-gray-500 bg-transparent font-medium "
              href="/home"
            >
              Home
            </Link>
            {/* Update the link */}
            {/* <Link
              className="inline-block py-2 px-4 mr-2 leading-5 text-coolGray-500 hover:text-coolGray-900 bg-transparent font-medium rounded-md"
              href="/login"
            >
              Sign in
            </Link> */}
            {/* Update the link */}
            {/* <Link
              className="inline-block py-2 px-4 text-sm leading-5 text-green-50 bg-rose-600 hover:bg-rose-700 font-medium focus:ring-2 focus:ring-opacity-50 rounded-md"
              href="/register"
            >
              Register
            </Link> */}
            {/* Must link to user cart it should only show if user is logged in */}
            {/* TODO: Button for cart */}
            <Link
              className="inline-block py-2 px-4 leading-5 text-gray-900 hover:text-gray-500 bg-transparent font-medium "
              href="/userId/cart"
            >
              Cart
            </Link>

            {/* Properly implement don't just redirect, retire session etc. */}
            {/* Using next auth this should retire the session??? */}
            {/* TODO: Nest this into the username and make a dropdown */}
            {/* TODO: Use shadcn drop down component
             */}
            {/* TODO: Put this within the user profile button instead */}
            {/* <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className="inline-block py-2 px-4 leading-5 text-gray-900 hover:text-gray-500 bg-transparent font-medium "
            >
              Logout
            </button> */}

            <Link
              className="inline-block py-2 px-4 leading-5 text-gray-900 hover:text-gray-500 bg-transparent font-medium   
  "
              href="/userId/profile"
            >
              Username
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function DashboardTopNavbar(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
}) {
  const title = "Ordering System";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>
      <Dashboard />
      <div className="container mx-auto px-4">{props.children}</div>
    </div>
  );
}
