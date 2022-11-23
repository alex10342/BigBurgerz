import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import tableModel from "~/models/tableModel";
import userModel from "~/models/userModel";
import { requireEmail } from "~/utils/session.server";

// On page load, will redirect user to main page if logged in or is not a staff member
export const loader: LoaderFunction = async ({ request }) => {
    const email = await requireEmail(request)
    const user = await userModel.findOne({ email: email })

    if (!user || user.role == "customer") return redirect("/")

    // Find all tables, then filters out the information
    const tables = await (await tableModel.find({})).map(obj => {
        return { number: obj.number, seats: obj.seats }
    })

    return {
        tables: tables,
        role: user.role
    }
};

// On 'Delete' button click, delete the selected table
export const action: ActionFunction = async ({ request }) => {
    const data = await request.formData()
    const number = data.get("delete")

    if (number) {
        const parsed = parseInt(number.toString())
        if (parsed !== NaN) await tableModel.deleteMany({ number: parsed })
    }

    return {}
}

// On page load, render HTML
export default function TablesIndex() {
    const { tables, role } = useLoaderData();
    const transition = useTransition()
    const buttonEnabledStyle = "text-white bg-red-500 px-1 py-1 text-sm rounded hover:bg-red-600 w-1/2"
    const buttonDisabledStyle = "text-white bg-gray-500 px-1 py-1 text-sm rounded w-1/2"

    return (
        <div className="col-start-2 col-span-2 h-screen w-[43rem] flex justify-start flex-col">
            <div className="bg-white h-14 w-full mt-[5rem] rounded shadow z-20 grid grid-cols-3 px-7 items-center">
                <h1 className="text-center">Table Number</h1>
                <h1 className="text-center">Table Seats</h1>
                <div className="leading-none pt-2">
                    <h1 className="text-center">Delete table</h1>
                    <h2 className="text-center text-gray-600 text-sm">Managers Only</h2>
                </div>
            </div>
            <div className="bg-[#f9fafb] h-auto w-full overflow-y-scroll max-h-[60rem] rounded-b-md -translate-y-1 shadow-md z-10 flex flex-col items-center w-9/10 pb-5 mb-5">
                {tables.length > 0 ? tables.map((table: any, i: number) => (
                    <div key={table.number} className="grid grid-cols-3 bg-white rounded-lg w-11/12 h-14 shadow items-center mt-3 py-2">
                        <h1 className="text-center">{table.number}</h1>
                        {/* <div className="border-l-2 border-l-gray-500 bg-gray-200"> */}
                            <h1 className="text-center">{table.seats}</h1>
                        {/* </div> */}
                        <Form method="post" className="flex justify-center">
                            <input type="hidden" name="submission" value={i} />
                            <button disabled={(role !== "manager")} className={role == "manager" ? buttonEnabledStyle : buttonDisabledStyle} type="submit" name="delete" value={table.number}>
                                {((transition.state === "loading" || transition.state === "submitting")
                                && transition.submission !== undefined
                                && transition.submission.formData !== null
                                && transition.submission.formData.get("submission") == i.toString()) ? "Deleting...": "Delete"}
                            </button>
                        </Form>
                    </div>
                )) : (<span className="italic text-gray-500 pt-5">No entries</span>)}
            </div>
        </div>
    );
}