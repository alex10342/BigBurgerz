import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import user from "~/models/userModel"
import bcrypt from "bcryptjs"
import { Heading } from "~/miscdata";
import { createUserSession, login } from "~/utils/session.server";

// On form submit, validate data then return any errors
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // const regex = /^[A-Za-z]+$/;
  const name = formData.get("name");
  const phone = formData.get("phone")
  const email = formData.get("email")
  const password: any = formData.get("password")
  const errors: any = {}
  
  // Validate data
  if (!name || name.toString().length <= 0) {
    errors.name = "Please enter a proper name"
  }

  if (!phone || phone.toString().length < 10) {
    errors.phone = "Please enter a valid phone number"
  }

  if (!email || email.toString().length <= 0 || !email.toString().includes("@")) {
    errors.email = "Please enter a valid email"
  }

  if (!password || password.toString().length < 6) {
    errors.password = "Password is too short (6)"
  }

  // Check if data already exists
  if (email && !errors.email && await user.exists({ email: email.toString() }) != null) {
    errors.email = "Email already registered"
  }

  if (phone && !errors.phone && await user.exists({ phone: phone.toString() }) != null) {
    errors.phone = "Phone number already registered"
  }

  // Return errors if any
  if (Object.keys(errors).length) {
    return json(errors, { status: 422 });
  }

  // Save data
  const hash = await bcrypt.hash(password.toString(), 10);
  const data = new user({
    name: name?.toString(),
    email: email?.toString() || undefined,
    phone: phone?.toString() || undefined,
    password: hash
  })

  await data.save()

  // Success
  const hardEmail = await login(email?.toString(), password?.toString())
  return await createUserSession(hardEmail, "/")
};

// On page load, render HTML
export default function Register() {
  const errors = useActionData();
  
  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-[23rem] h-auto bg-white rounded-md shadow-md pb-5">
          <div className="row-span-1 flex flex-col items-center justify-end my-5">
            <div className="font-bold text-[22px] text-gray-800">{Heading}</div>
            <p>Register below!</p>
          </div>

          <Form method="post">
            <fieldset className="flex flex-col items-center mt-5">
              {/* Name */}
              <div className="flex flex-col w-4/5">
                <label htmlFor="name-input">Name <span className="text-sm text-red-600">{(errors && errors.name) ? errors.name : undefined}</span></label>
                <input
                  type="text"
                  id="name-input"
                  name="name"
                  placeholder="John Doe"
                  className={`border rounded py-1 px-2 ${(errors && errors.name) ? `border-red-600` : `border-gray-400`}`}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col mt-5 w-4/5">
                <label htmlFor="name-input">Phone No. <span className="text-sm text-red-600">{(errors && errors.phone) ? errors.phone : undefined}</span></label>
                <input
                  type="text"
                  id="phone-input"
                  name="phone"
                  placeholder="+61 123 456 789"
                  className={`border rounded py-1 px-2 ${(errors && errors.phone) ? `border-red-600` : `border-gray-400`}`}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col mt-5 w-4/5">
                <label htmlFor="username-input">Email <span className="text-sm text-red-600">{(errors && errors.email) ? errors.email : undefined}</span></label>
                <input
                  type="text"
                  id="email-input"
                  name="email"
                  placeholder="example@email.com"
                  className={`border rounded py-1 px-2 ${(errors && errors.email) ? `border-red-600` : `border-gray-400`}`}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col mt-5 w-4/5">
                <label htmlFor="password-input">Password <span className="text-sm text-red-600">{(errors && errors.password) ? errors.password : undefined}</span></label>
                <input
                  type="password"
                  id="password-input"
                  name="password"
                  className={`border rounded py-1 px-2 ${(errors && errors.password) ? `border-red-600` : `border-gray-400`}`}
                />
              </div>

              {/* Text */}
              <div className="grid grid-cols-2 gap-2 mt-7">
                <div className="flex flex-col items-end">
                  <p className="italic text-sm">Already a member?</p>
                </div>

                <div className="flex flex-col items-start">
                  <a href="/login" className="not-italic text-sm border-b-2 border-blue-400 transition ease-in-out duration-500 hover:border-indigo-600 hover:-translate-y-0.5">Go to Login</a>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="flex items-center mt-5 text-white bg-blue-500 px-3 py-1 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300">Continue
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}
