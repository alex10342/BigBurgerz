import { DateTime } from "luxon"
import Loadingbar from "~/components/Loadingbar";
import { Heading, ReserveForm, ReserveFormType } from "~/miscdata";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { requireEmail } from "~/utils/session.server";
import { useState } from "react";
import tableModel from "~/models/tableModel";
import bookingModel from "~/models/bookingModel";
import userModel from "~/models/userModel"

// On page load, redirect user if not logged in, send email and phone to client
export const loader: LoaderFunction = async ({ request }) => {
  const email = await requireEmail(request);
  const user = await userModel.findOne({ email: email })

  return {
    email: email,
    phone: user.phone
  }
};

// On form submit, data inputted from the booking form will be sent here for validation and
// will return if the data contains any errors
export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData()
  const date = data.get("date")
  const name = data.get("name")
  const phone = data.get("phone")
  const email = data.get("email")
  const seats = data.get("seats")
  const errors: any = {}

  const now = DateTime.now()

  console.log(phone, email)

  // Validate Form Data
  if (!date) errors.date = "Invalid Date"
  if (!name) errors.name = "Invalid Name"
  if (!phone) errors.phone = "Invalid Phone"
  if (!email) errors.email = "Invalid Email"
  if (!seats) errors.seats = "Invalid Seats"

  // Return Form Data
  if (Object.keys(errors).length) {
    return json(errors, { status: 422 });
  }

  // Validate date
  const newDate = DateTime.fromISO(date ? date?.toString() : "0")
  if (!newDate.isValid) return json({ date: "Invalid date" }, { status: 422 })
  if (now.toMillis() > newDate.toMillis()) return json({ date: "Please pass a date in the future" }, { status: 422 })

  // Check if spot is filled
  const tables = await tableModel.find({ seats: seats })

  for (const table of tables) {
    if (!(await bookingModel.exists({ date: date, tableNum: table.number }))) {
      // If no booking is present, create a new booking
      const newBooking = new bookingModel({
        date: date,
        name: name,
        phone: phone,
        email: email,
        tableNum: table.number
      })

      await newBooking.save()

      // Redirect to success page
      return redirect("/bookingsuccess")
    }
  }

  return json({ booking: "There is no booking available for that date with that amount of seats. Please try again." }, { status: 422 })
};

// Main function for rendering HTML on page load
export default function Index() {
  const submit = useSubmit();
  const data = useActionData();
  const loaderData = useLoaderData();
  const [position, setPosition] = useState(0)

  const handleNextClick = (eventData: any) => {
    if ((position + 1) >= ReserveForm.length) {
      submit(eventData.currentTarget, { replace: true })
      setPosition(0)
    } else setPosition(position + 1)
  }

  const handlePreviousClick = (eventData: any) => {
    if (position - 1 >= 0) {
      setPosition(position - 1)
    }
  }

  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-screen w-full flex justify-end">
          <div className="bg-white h-64 w-80 mt-[5rem] rounded-md shadow-md text-center pt-2 leading-none flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <img src="icon.svg" alt="Home" className="w-16 h-16 mb-3" />
              <h1 className="text-lg font-bold">{Heading}</h1>
              <h2>Book over here! 👉</h2>

              <h3 className="text-indigo-500 italic text-sm">Open 10am-10pm every day</h3>
            </div>


            {/* <button type="submit" className="mt-2 flex justify-center items-center w-1/2 text-white bg-blue-500 px-3 py-2.5 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300">View Details</button> */}
          </div>
        </div>

        <div className="col-start-2 col-span-2 h-screen w-[43rem] flex justify-start flex-col">
          <div className="bg-white h-14 w-full mt-[5rem] rounded shadow z-20 flex justify-center items-end pb-4">
            <Loadingbar progress={`${((position + 1) / ReserveForm.length) * 100}%`} width="70%" text="Reservation Progress" />
          </div>
          <div className="bg-[#f9fafb] h-96 w-full rounded-b-md -translate-y-3 shadow-md z-10 flex justify-center w-9/10 mt-2">

            <Form method="post" className="w-[90%] grid grid-rows-2">
              <fieldset className="row-start-1 row-span-1 pt-1">


                {ReserveForm.map((entry: any, i: number) => {
                  return entry.map((obj: any, key: number) => (
                    <div key={key} id="formHandler" className="flex flex-col w-1/1">
                      <label htmlFor={`${obj.id}-input`} hidden={position !== i} className="pt-2">{obj.label}
                        {(data && Object.keys(obj.id) != null) ? (<span className="text-sm text-red-600"> {data[obj.id]}</span>) : null}
                      </label>

                      <input
                        hidden={position !== i}
                        type={obj.type}
                        id={`${obj.id}-input`}
                        name={obj.id}
                        placeholder={obj.placeholder}
                        min={obj.min}
                        // disabled={obj.takeValue}
                        value={obj.takeValue && loaderData[obj.id]}
                        className={`border rounded py-1 px-2 ${(data && data[obj.id]) ? `border-red-600` : `border-gray-400`}`}
                      />
                    </div>
                  ))
                })}
              </fieldset>

              <div className="flex flex-col justify-end items-center mb-5 row-start-2 row-span-1">
                <h3 className="text-indigo-500 italic text-sm mt-14">Fields marked with * are required!</h3>
                <div className="flex flex-col space-x-2">
                  {data && data.booking ? (<p className="rounded-md bg-red-500 text-white text-sm px-2 py-1">{data.booking}</p>) : ""}
                  <div className="flex justify-center space-x-3">
                    <button type="button" onClick={handlePreviousClick} className="flex items-center text-white bg-slate-500 mt-2 px-2 text-sm rounded">Back</button>
                    <button type="button" onClick={handleNextClick} className="flex items-center text-white bg-blue-500 mt-2 px-3 py-1 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300">{(position + 1) >= ReserveForm.length ? "Submit" : "Continue"}
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Form>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
      </div>
    </div>
  );
}
