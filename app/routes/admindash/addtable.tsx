import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import tableModel from "~/models/tableModel";
import userModel from "~/models/userModel";
import { requireEmail } from "~/utils/session.server";

// On page load, will redirect user to main page if not logged in or is not a staff member
export const loader: LoaderFunction = async ({ request }) => {
    const email = await requireEmail(request)
    const user = await userModel.findOne({ email: email })

    if (!user || user.role == "customer") return redirect("/")

    return { role: user.role }
};

// On form request, validate data and then add it to the database
export const action: ActionFunction = async ({ request }) => {
    const data = await request.formData()
    const number = data.get("tablenumber")
    const seats = data.get("tableseats")
    const errors: any = {}

    if (!number || number == '') {
        errors.number = "Invalid table number"
    } else if (await tableModel.exists({ number: number })) errors.number = "Table already exists"

    if (!seats || seats == '') errors.seats = "Invalid seats"

    const parsedTbl = parseInt(number?.toString() || "")
    const parsedSts = parseInt(seats?.toString() || "")

    if (parsedTbl == NaN || parsedTbl < 0) errors.number = "Invalid table number"
    if (parsedTbl == NaN || parsedSts < 1) errors.seats = "Minimum seats is 1"

    // If errors, return them
    if (Object.keys(errors).length) {
        return json(errors, { status: 200 });
    }

    // Save data into database
    const table = new tableModel({ number: parsedTbl, seats: parsedSts })
    await table.save()

    return { success: true, successNumber: number, successSeats: seats }
}

// On page load, render HTML
export default function AddTableIndex() {
    const { role } = useLoaderData();
    const data = useActionData();

    return (
        <div className="col-start-2 col-span-2 h-screen w-[43rem] flex justify-start flex-col">
            <div className="bg-white h-14 w-full mt-[5rem] rounded shadow z-20 flex justify-center items-end pb-4 text-lg font-semibold">
                Fill in fields to add a new table
            </div>
            <div className="bg-[#f9fafb] h-[12.8rem] w-full rounded-b-md -translate-y-1 shadow-md z-10 flex flex-col items-center w-9/10">
                <Form method="post" className="w-[90%] grid grid-rows-2 mt-5 items-center">
                    <fieldset className="grid grid-cols-2">
                        <div>
                            <label htmlFor="number-input">Table Number
                                {(data && data.number != null) ? (<span className="text-sm text-red-600"> {data.number}</span>) : null}
                            </label>
                            <input type="number" name="tablenumber" id="tablenumber" placeholder="0" className="w-11/12 border rounded py-1 px-2 border-gray-400" />
                        </div>

                        <div className="pl-5">
                            <label htmlFor="seats-input">Table Seats
                                {(data && data.seats != null) ? (<span className="text-sm text-red-600"> {data.seats}</span>) : null}
                            </label>
                            <input type="number" name="tableseats" id="tableseats" placeholder="0" className="w-11/12 border rounded py-1 px-2 border-gray-400" />
                        </div>
                    </fieldset>

                    <div className="flex flex-col items-center justify-end">
                        <h3 className="text-green-500 italic text-sm mt-5">{(data && data.success) ? `Successfully created table ${data.successNumber} with ${data.successSeats} seats` : undefined}</h3>
                        <button type="submit" className="flex items-center text-white bg-blue-500 px-3 py-1 rounded hover:bg-indigo-600 duration-300">Submit
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}