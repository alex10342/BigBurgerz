export default function Bookings({ bookings }: { bookings: any }) {
  return (
    <div className="bg-[#f9fafb] h-auto w-full rounded-b-md -translate-y-1 shadow-md z-10 flex flex-col items-center w-9/10 pb-5 mb-5">
      {bookings.length == 0 ? (<div className="flex justify-center w-full pt-6"><span>No bookings for today.</span></div>) : ""}
      {bookings.map((booking: any, i: any) => (
        <div key={i} className="grid grid-cols-4 bg-white rounded-lg w-11/12 h-auto shadow items-center mt-3 py-1">
          <h1 className="text-center">{booking.name}</h1>
          <div className="flex flex-col items-center">
            <h3 className="text-center text-sm">E: {booking.email}</h3>
            <h3 className="text-center text-sm">Ph: {booking.phone}</h3>
          </div>
          <h1 className="text-center">{booking.tableNum}</h1>
          <h1 className="text-center">{booking.date}</h1>
        </div>
      ))}
    </div>
  );
}