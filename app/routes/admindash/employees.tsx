import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useSubmit, useTransition } from "@remix-run/react";
import userModel from "~/models/userModel";
import { requireEmail } from "~/utils/session.server";
import { DateTime } from "luxon";
import Employees from "~/components/Employees";

// On page load, will redirect user to main page if not logged in or is not a staff member
export const loader: LoaderFunction = async ({ request }) => {
    const email = await requireEmail(request)
    const user = await userModel.findOne({ email: email })

    if (!user || user.role == "customer") return redirect("/")

    const employees = await userModel.find({ role: { $ne: "customer" } })
    const employeeValues = []
    for (const employee of employees) {
        let object = {
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            role: employee.role
        }
        employeeValues.push(object)
    }


    return { role: user.role, self: user.email, employees: employeeValues }
};

export async function action({ request }: any) {
    const formData = await request.formData();

    switch (formData.get("_action").toString()) {
        case "changeRole": {
            const user = await userModel.findOne({ email: formData.get("_user") })
            user.role = formData.get("updateRole")
            await user.save()

            return {}
        }
        case "add": {
            const user = await userModel.findOne({ email: formData.get("newUser")})

            if (!user) return { newUser: "User does not exist" }
            if (user.role === "employee" || user.role === "manager") return { newUser: "User already an employee" }
            
            user.role = "employee"
            await user.save()
            return {}
        }
    }

    return {};
};

// On page load, render HTML
export default function EmployeesIndex() {
    const { role, employees, self } = useLoaderData();
    const data = useActionData();
    const submit = useSubmit();

    return (
        <div className="col-start-2 col-span-2 h-screen w-[43rem] flex justify-start flex-col">
            <div className="bg-white h-14 w-full mt-[5rem] rounded shadow z-20 grid grid-cols-4 px-7 items-center">
                <h1 className="text-center">Employee Name</h1>
                <h1 className="text-center">Employee Contact</h1>
                <h1 className="text-center">Role</h1>
                <div className="leading-none pt-2">
                    <h1 className="text-center">Edit</h1>
                    <h2 className="text-center text-gray-600 text-sm">Managers Only</h2>
                </div>
            </div>
            <Employees employees={employees} role={role} self={self} />
            {role === "manager" && (<div className="bg-white h-auto w-full rounded shadow z-20 flex flex-col justify-center space-x-5 items-center">
                <span className="mt-2">Add employee from Email</span>
                <span className="text-red-500 text-sm">{data && data.newUser ? data.newUser : ""}</span>
                <Form method="post" className="flex space-x-5 mb-3">
                    <input type="hidden" name="_action" value="add" />
                    <input type="text" name="newUser" placeholder="example@example.com" className={`border rounded py-1 px-2 ${data && data.newUser ? `border-red-400` : `border-gray-400`}`} />
                    <button type="submit" className="bg-blue-500 text-white mr-7 py-1 px-3 hover:bg-indigo-600 rounded flex items-center">
                        Add
                    </button>
                </Form>
            </div>)}
        </div>
    );
}