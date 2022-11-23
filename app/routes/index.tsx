import { Heading } from "~/miscdata";

// On page load, render HTML
export default function Index() {
  return (
    <div className="w-screen h-screen grid grid-rows-3">
      <div className="flex items-end justify-center">
        <h1 className="-translate-y-5 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-extrabold text-7xl font-roboto py-1">Best burgers in the business.</h1>
      </div>

      <div className="flex flex-col items-center justify-start">
        <h3 className="font-extrabold text-5xl font-roboto py-1">The <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-1">freshest ingredients</span></h3>
        <h3 className="font-extrabold text-5xl font-roboto py-1">from the farm to your plate.</h3>

        <a href="/bookings" className="flex items-center mt-20 text-white bg-blue-500 px-4 py-3 rounded-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300 text-3xl font-bold">Reserve a seat
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>

      <div className="flex justify-center items-start">
      </div>
    </div>
  );
}
