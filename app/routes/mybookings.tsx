import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireEmail } from "~/utils/session.server";
import bookingModel from "~/models/bookingModel";
import userModel from "~/models/userModel"
import MyBookings from "~/components/MyBookings";

// On page load, redirect user if not logged in, send email and phone to client
export const loader: LoaderFunction = async ({ request }) => {
  const email = await requireEmail(request);
  const user = await userModel.findOne({ email: email })
  const bookings = await bookingModel.find({email: user.email})

  return {
    bookings: bookings, 
    email: email,
    phone: user.phone
  }
};

// Main function for rendering HTML on page load
export default function MyBookingsindex() {
  const data = useLoaderData();

  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-start-2 col-span-1 h-screen w-[43rem] flex justify-start flex-col">
          <div className="bg-white h-14 w-full mt-[5rem] rounded shadow z-20 grid grid-cols-3 px-7 items-center">
            <h1 className="text-center">Your Contact</h1>
            <h1 className="text-center">Table Number</h1>
            <h1 className="text-center">Booking Date</h1>
          </div>

          <MyBookings bookings={data.bookings} />
        </div>
      </div>
    </div>
  );
}
