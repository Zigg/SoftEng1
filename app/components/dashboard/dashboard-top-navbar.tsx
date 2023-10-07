import Head from "next/head";
import Link from "next/link";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";

function Dashboard() {
  return (
    <nav className="container mx-auto flex justify-between p-6 px-4">
      <div className="flex justify-between items-center w-full">
        <div className="xl:w-1/3">
          <Link
            className="block text-lg max-w-max ext-coolGray-500 hover:text-coolGray-900 font-medium"
            href="/"
          >
            Ordering System
          </Link>
        </div>

        <div className="xl:block xl:w-1/3">
          <div className="flex items-center justify-end">
            {/* Update the link */}
            <Link
              className="text-coolGray-500 hover:text-coolGray-900 font-medium"
              href="/home"
            >
              Home
            </Link>
            {/* Update the link */}
            <Link
              className="inline-block py-2 px-4 mr-2 leading-5 text-coolGray-500 hover:text-coolGray-900 bg-transparent font-medium rounded-md"
              href="/login"
            >
              Sign in
            </Link>
            {/* Update the link */}
            <Link
              className="inline-block py-2 px-4 text-sm leading-5 text-green-50 bg-rose-600 hover:bg-rose-700 font-medium focus:ring-2 focus:ring-opacity-50 rounded-md"
              href="/register"
            >
              Register
            </Link>
            {/* Must link to user cart it should only show if user is logged in */}
            <Link href="/cart"></Link>
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
