import { NavLink, Outlet } from "@remix-run/react";

// On page load, render HTML
export default function Admindash() {
    const activeStyle = 'hover:text-gray-700 mt-1 bg-gray-200 w-4/5 py-2 rounded-lg border-indigo-500'
    const inactiveStyle = 'hover:text-gray-700 mt-1 hover:bg-gray-100 w-4/5 py-2 rounded-lg border-indigo-500'

    return (
        <div>
            <div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 h-screen w-full flex justify-end">
                        <div className="bg-white h-64 w-80 mt-[5rem] rounded-md shadow-md text-center pt-2 leading-none flex flex-col items-center">
                            <NavLink to={"/admindash"} end className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Bookings</NavLink>
                            <NavLink to={"/admindash/employees"} className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Employees</NavLink>
                            <NavLink to={"/admindash/tables"} className={({ isActive }) => isActive ? activeStyle : inactiveStyle} end>Tables</NavLink>
                            <NavLink to={"/admindash/addtable"} className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Add Tables</NavLink>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>
    );
}