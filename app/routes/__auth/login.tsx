import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import userModel from "~/models/userModel";
import { Heading } from "~/miscdata";
import { createUserSession, getEmail, login } from "~/utils/session.server"
import { useActionData } from "@remix-run/react";

// On page load, redirect user to main page if logged in
export const loader: LoaderFunction = async ({ request }) => {
  const email = await getEmail(request)
  if (email) return redirect("/")
  return {}
};

// On form submit, validate data and process it. Return errors if any.
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const errors: any = {};
  
  // Validate data 
  if (!email || email.toString().length <= 0 || !email.toString().includes("@")) {
    errors.email = "Please enter a valid email"
  }

  if (!password || password.toString().length < 6) {
    errors.password = "Password is too short (6)"
  }

  if (email
    && !errors.email
    && await userModel.exists({ email: email }) == null) errors.email = "That email does not exist"
  
  
  // Login
  const hardEmail = await login(email?.toString(), password?.toString())
  
  if (password && !errors.password && !hardEmail) errors.password = "Incorrect password"
  
  // Return errors if any
  if (Object.keys(errors).length) {
    return json(errors, { status: 422 });
  }
  
  return await createUserSession(hardEmail, "/")
};

// On page load, render HTML
export default function Login() {
  const errors = useActionData();
  
  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-center h-screen w-full">
        <div className="w-[23rem] h-96 bg-white rounded-md shadow-md">
          <div className="row-span-1 flex flex-col items-center justify-end my-5">
            <div className="font-bold text-[22px] text-gray-800">{Heading}</div>
            <p>Login below!</p>
          </div>

          <form method="post">
            <div className="flex flex-col items-center mt-5">


              {/* Email */}
              <div className="flex flex-col w-4/5">
                <label htmlFor="username-input">Email  <span className="text-sm text-red-600">{(errors && errors.email) ? errors.email : undefined}</span></label>
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
                <label htmlFor="password-input">Password  <span className="text-sm text-red-600">{(errors && errors.password) ? errors.password : undefined}</span></label>
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
                  <p className="italic text-sm">No account?</p>
                  <p className="italic text-sm">Forgot password?</p>
                </div>

                <div className="flex flex-col items-start">
                  <a href="/register" className="not-italic text-sm border-b-2 border-blue-400 transition ease-in-out duration-500 hover:border-indigo-600 hover:-translate-y-0.5">Register</a>
                  <a href="/register" className="not-italic text-sm border-b-2 border-blue-400 transition ease-in-out duration-500 hover:border-indigo-600 hover:-translate-y-0.5">Reset password</a>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="flex items-center mt-5 text-white bg-blue-500 px-3 py-1 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300">Login
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
