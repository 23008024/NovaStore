import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification
} from "firebase/auth";

import { auth } from "../firebase/firebase";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
const submit = async (e) => {
    e.preventDefault();

    try {

        // Login with Firebase
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Refresh user information
        await credential.user.reload();

        // Check email verification
        if (!credential.user.emailVerified) {

    await sendEmailVerification(credential.user);

    await signOut(auth);

    alert(
        "Your email is not verified.\n\nA new verification email has been sent. Please check your inbox."
    );

    return;
}

        // Login to your backend
        const loggedUser = await login(
            email,
            password,
            remember
        );

        if (loggedUser.role === "ADMIN") {
            navigate("/admin");
        } else {
            navigate("/");
        }

    } catch (error) {

    
    alert(
        error.response?.data?.message ||
        error.message ||
        "Login failed."
    );
}
};
    
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

                <h2 className="text-3xl font-bold text-center mb-2">
                    Login
                </h2>

                <p className="text-center text-gray-500 mb-8">
                    Welcome back! Sign in to continue.
                </p>

                <form onSubmit={submit}>

                    {/* Email */}

                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block font-medium mb-2"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    {/* Password */}

                    <div className="mb-2 flex justify-between">

                        <label
                            htmlFor="password"
                            className="font-medium"
                        >
                            Password
                        </label>

                        <Link
                            to="/forgot-password"
                            className="text-blue-600 text-sm hover:underline"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />

                    {/* Remember Me */}

                    <div className="flex items-center mb-6">

                        <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="mr-2"
                        />

                        <label
                            htmlFor="remember"
                            className="text-sm"
                        >
                            Remember Me
                        </label>

                    </div>

                    {/* Login Button */}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Login
                    </button>

                </form>

                {/* Register */}

                <p className="text-center text-gray-600 mt-8">

                    New to <span className="font-semibold">NovaStore</span>?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}
