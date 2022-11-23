import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useSubmit, useTransition } from "@remix-run/react";
import tableModel from "~/models/tableModel";
import userModel from "~/models/userModel";
import { requireEmail } from "~/utils/session.server";
import bookingModel from "~/models/bookingModel";
import { DateTime } from "luxon";
import Bookings from "~/components/Bookings";

// On page load, will redirect user to main page if not logged in or is not a staff member
export const loader: LoaderFunction = async ({ request }) => {
    const email = await requireEmail(request)
    const user = await userModel.findOne({ email: email })

    if (!user || user.role == "customer") return redirect("/")

    const now = DateTime.now().toISODate()
    const bookings = await bookingModel.find({ date: now })
    return { role: user.role, bookings: bookings }
};

export async function action({ request }: any) {
  const formData = await request.formData();
  const bookings = await bookingModel.find({ date: formData.get("searchDate")})
  
  return { bookings: bookings };
};

// On page load, render HTML
export default function BookingsIndex() {
    const { role, bookings } = useLoaderData();
    const data = useActionData();
    const submit = useSubmit();

    const changeEvent = (e: any) => {
        submit(e.currentTarget, { replace: true })
    }

    return (
        <div className="col-start-2 col-span-2 h-screen w-[43rem] flex justify-start flex-col">
            <div className="bg-white h-14 w-full mt-[5rem] rounded shadow z-20 grid grid-cols-4 px-7 items-center">
                <h1 className="text-center">Booking Name</h1>
                <h1 className="text-center">Booking Contact</h1>
                <h1 className="text-center">Table Number</h1>
                <h1 className="text-center">Date</h1>
            </div>
            <Bookings bookings={data && data.bookings ? data.bookings : bookings} />
            <div className="bg-white h-14 w-full rounded shadow z-20 flex justify-center space-x-5 px-7 items-center">
                <span>Search By Date</span>
                <Form method="post" onChange={changeEvent}>
                    <input type="date" name="searchDate" className="border rounded py-1 px-2 border-gray-400" />
                </Form>
            </div>
        </div>
    );
}