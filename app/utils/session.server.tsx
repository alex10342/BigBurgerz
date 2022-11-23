import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import user from "~/models/userModel"

// Login function for returning email
export async function login(email: string | undefined, password: string | undefined) {
    if (email == undefined || password == undefined) return null;

    const document = await user.findOne({ email: email })
    
    if (!document) return null;
    
    const canPass = await bcrypt.compare(password, document.password)

    if (!canPass) return false;

    return document.email
}


const sessionSecret = "tLQNotCbe0sTU7XbiyVUtxgb3v0Z1FKXnlYujrfcafxhewDth30eaEIpveol";

// Cookie session
const storage = createCookieSessionStorage({
    cookie: {
        name: "burger_session",
        secure: true,
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        // domain: "alexrig.me"
    }
})

// Function for creating a new session when a user logs in.
// Will create a session with cookies.
export async function createUserSession(email: string, redir: string) {
    const session = await storage.getSession();
    console.log("session")
    console.log(session.data)
    session.set("email", email);

    return redirect(redir, {
        headers: { "Set-Cookie": await storage.commitSession(session) }
    })
}

// Function for returning the current session
function getSession(req: Request) {
    return storage.getSession(req.headers.get("Cookie"))
}

// Function for requring a session to be active
export async function requireEmail(req: Request) {
    const session = await getSession(req)
    const email = session.get("email")

    if (!email || typeof email !== "string") {
        throw redirect("/login")
    }

    return email
}

// Function for getting the email from the current session
// Does not require a session to be active
export async function getEmail(req: Request) {
    const session = await getSession(req)
    const email = session.get("email")

    if (!email || typeof email !== "string") return null

    return email
}

// Function for destroying the current session
export async function logout(req: Request) {
    const session = await getSession(req)

    return redirect("/login", {
        headers: {
            "Set-Cookie": await storage.destroySession(session)
        }
    })
}