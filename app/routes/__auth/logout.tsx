import { LoaderFunction } from "@remix-run/node";
import { logout } from "~/utils/session.server"

// Load function, will destroy user session and redirect to login page
export const loader: LoaderFunction = async ({ request }) => {
    return logout(request)
};

// On page load, render HTML. Blank page as the user is redirected on load
// so there is no need to render anything.
export default function Logout() {
  return (
    <div />
  );
}
