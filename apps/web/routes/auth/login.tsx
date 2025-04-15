import { ChevronRight } from "../../components/icons/ChevronRight.tsx";
import { CloseIcon } from "../../components/icons/CloseIcon.tsx";
import { ShieldX } from "../../components/icons/ShieldX.tsx";

function getErrorMessage(err: string) {
  let result = "";
  switch (err) {
    case "E1":
      result = "Empty fields? We’re not mind readers, bro.";
      break;

    case "E2":
      result = "Incorrect. Maybe your cat walked on the keyboard? 🐾";
      break;

    case "E3":
      result = "Server took a nap. Try again later. 💤";
      break;

    default:
      break;
  }
  return result;
}

export default function Login(req: Request) {
  const url = new URL(req.url);
  const error = url.searchParams.get("error") ?? "";
  const errorMessage = getErrorMessage(error);
  return (
    <main className="flex justify-center items-center h-screen subtle-gradient-reverse">
      <div className="animate-float subtle-gradient rounded-2xl w-3/4 md:w-1/2 shadow-2xl">
        <div className="flex justify-between px-4 py-2">
          <h1 className="text-4xl font-extrabold tracking-wide">Learn.io</h1>
          <a
            className="p-2 rounded-full shadow-md transition-transform transform hover:subtle-gradient subtle-gradient-reverse"
            type="button"
            href="/"
          >
            <CloseIcon />
          </a>
        </div>

        <form
          className="p-4 flex flex-col justify-center items-center subtle-gradient-reverse rounded-2xl"
          action="/auth/verifyLogin"
          method="post"
        >
          <div className="flex flex-col m-2 p-2">
            <label
              className="text-gray-400 font-mono pl-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="h-8 rounded-full shadow-md text-gray-300 pl-4 subtle-gradient"
              type="text"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col p-2">
            <label
              className="text-gray-400 font-mono pl-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="h-8 rounded-full shadow-md pl-4 subtle-gradient ring-0"
              type="password"
              name="password"
              required
            />
          </div>
          <button
            className="mt-4 p-2 rounded-full shadow-md transition-transform transform hover:subtle-gradient subtle-gradient-reverse"
            type="submit"
          >
            <ChevronRight />
          </button>
          {/* Future Addition? */}
          {/* <a className="mt-2 text-xs font-sans text-slate-300 hover:text-slate-100" href="#">Forgot Password?</a> */}

          {errorMessage && (
            <div className="mt-4 rounded-2xl bg-red-600">
              <div className="p-4 subtle-gradient rounded-2xl text-gray-300">
                <p className="flex">
                  <ShieldX /> Error
                </p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
