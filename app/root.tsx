//------------------------------------
// Author: Alex R
// Title: Big Burgerz Restaurant Reservations
// Purpose: Resaurant reservation app
// Version: 1.0
// Date: 23/6/2022
//------------------------------------

import { LinksFunction, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "./tailwind.css"
import fontstyles from "./font.css"
import { Heading } from "./miscdata";
import Navbar from "./components/Navbar";
import { getEmail } from "./utils/session.server";
import userModel from "~/models/userModel"

// Implements meta into HTML
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: Heading,
  viewport: "width=device-width,initial-scale=1",
});

// Implements stylesheet links into HTML
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: fontstyles }
  ];
};

// On page load, get user data from session
export const loader: LoaderFunction = async ({ request }) => {
  const email = await getEmail(request)
  const data = await userModel.findOne({ email: email })
  const role = (data !== null) ? data.role : "customer"

  return {
    loggedIn: (email !== null),
    role: role,
    name: data ? data.name : null
  }
};

// On page load, render HTML
export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 antialiased">
        <Navbar page={null} loggedIn={data.loggedIn} role={data.role} username={data.name} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
