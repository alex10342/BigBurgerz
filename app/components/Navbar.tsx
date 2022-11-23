import { Heading } from "~/miscdata";
import { NavLink } from "@remix-run/react";

type Props = {
  page: string | null,
  loggedIn: boolean,
  role: string,
  username: string | null;
}

// When component is called, return HTML
export default function Navbar({ page, loggedIn, role, username }: Props) {
  const activeStyle = 'mr-5 text-gray-700 border-indigo-500 border-b-2'
  const inactiveStyle = 'mr-5 hover:text-gray-700 border-indigo-500 hover:border-b-2'

  return (
    <nav className="fixed grid grid-cols-3 w-screen bg-white text-gray-500 shadow-md body-font z-50">
      <div className="flex items-center">
        <a href="/" className="flex justify-start ml-3 my-2 items-center">
          <img src="icon.svg" alt="Home" className="w-10 h-10" />
          <span className="ml-3 font-bold text-lg uppercase text-gray-800">{Heading}</span>
        </a>

        {loggedIn ? <h1 className="ml-4">Welcome, {username}!</h1> : ""}
      </div>

      <div className="flex justify-center items-center">
        <NavLink to="bookings" className={({isActive}: any) => isActive ? activeStyle : inactiveStyle}>Bookings</NavLink>
        {role == "employee" || role == "manager" ? (<NavLink to="admindash" className={({isActive}: any) => isActive ? activeStyle : inactiveStyle}>Staff Dashboard</NavLink>) : undefined}
        <NavLink to="mybookings" className={({isActive}: any) => isActive ? activeStyle : inactiveStyle}>My Bookings</NavLink>
      </div>

      <div className="flex justify-end items-center">
        <a href={loggedIn ? `/logout` : `/login`} className="bg-blue-500 text-white mr-7 py-1 px-3 hover:bg-indigo-600 rounded flex items-center">{loggedIn ? `Logout` : `Login`}
          {loggedIn ? (
            <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          ) : (
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          )}
        </a>
      </div>
    </nav>
  );
}