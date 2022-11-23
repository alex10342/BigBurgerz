import { Form, useSubmit } from "@remix-run/react";

export default function Employees({ employees, role, self}: { employees: any, role: string, self: string }) {
  const submit = useSubmit();

  function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const changeEvent = (e: any) => {
    submit(e.currentTarget, { replace: true })
  }

  return (
    <div className="bg-[#f9fafb] h-auto w-full rounded-b-md -translate-y-1 shadow-md z-10 flex flex-col items-center w-9/10 pb-5 mb-5">
      {employees.length == 0 ? (<div className="flex justify-center w-full pt-6"><span>No employees.</span></div>) : ""}
      {employees.map((user: any, i: any) => (
        <div key={i} className="grid grid-cols-4 bg-white rounded-lg w-11/12 h-auto shadow items-center mt-3 py-1">
          <h1 className="text-center">{user.name}</h1>
          <div className="flex flex-col items-center">
            <h3 className="text-center text-sm">E: {user.email}</h3>
            <h3 className="text-center text-sm">Ph: {user.phone}</h3>
          </div>
          <h1 className="text-center">{capitalize(user.role)}</h1>
          <Form method="post" className="flex justify-center" onChange={changeEvent}>
            <input type="hidden" name="_action" value="changeRole" />
            <input type="hidden" name="_user" value={user.email} />
            {console.log(user.email, role)}
            <select name="updateRole" defaultValue={user.role} disabled={role !== "manager" || user.email == self} className="bg-[#f9fafb] shadow w-3/5">
              <option value="customer">Customer</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </Form>
        </div>
      ))}
    </div>
  );
}