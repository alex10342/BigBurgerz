import Loadingbar from "~/components/Loadingbar";
import { Heading, ReserveForm } from "~/miscdata";

// Main function for rendering HTML on page load
export default function Index() {
  return (
    <div className="overflow-hidden flex justify-center">
      <div className="col-start-2 col-span-2 h-screen w-[43rem] flex justify-start flex-col">
        <div className="bg-white h-64 w-full mt-[5rem] rounded shadow-md z-20 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mt-16 h-16 w-16 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-green-500 text-2xl font-extrabold">Successfully created booking!</h1>
          <p className="font-semibold">Check your bookings page to view details about your new booking!</p>
        </div>
      </div>
    </div>
  );
}
