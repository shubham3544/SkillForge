import { useState,  useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

function Login() {
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login({
                email,
                password,
            });
            console.log(data);
        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message || 
                "Login failed. Please Try again."
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
            <div className="w-full max-w-md">

                <div>
                    <Link
                        to="/"
                        className="text-2xl font-bold"
                    >
                        SkillForge
                    </Link>

                    <h1 className="mt-8 text-3xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-slate-400">
                      Continue your developer journey.
                    </p>
                </div>

                <form
                   onSubmit ={handleSubmit}
                   className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

                     <div>
                      <label className="text-sm font-medium text-slate-300">
                        Email
                      </label>
                      <input type="email" required value={email} onChange={(e) =>setEmail(e.target.value)} placeholder="you@example.com"
                      className="mt-2 w-full rounded-lg border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500" />
                     </div>

                     <div className="mt-5">
                      <label className="text-sm font-medium text-slate-300">
                        Password
                      </label>
                      <input  type="password" required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="
                            mt-2 w-full rounded-lg
                            border border-slate-700
                            bg-slate-950 px-4 py-3
                            text-white outline-none
                            transition focus:border-blue-500
                          " />
                     </div>

                     {error && (
                        <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3">
                        <p className = "text-sm text-amber-200">
                        {error}
                        </p>
                        </div>
                     )}

                     <button type="sumbit" className="mt-7 w-full  rounded-lg bg-blue-600 py-3 font-medium transition hover:bg-blue-500">
                      Login
                     </button>

                     <p className="mt-6 text-center text-sm text-slate-400">
                      Don't have an account?("")
                     

                     <Link to= "/register"
                     className="font-medium text-blue-400 hover:text-blue-300">
                      Register
                     </Link>
                     </p> 
                   </form>

            </div>
        </div>
    );
}

export default Login;