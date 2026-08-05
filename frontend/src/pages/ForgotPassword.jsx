import { useState } from "react";
import { Link } from "react-router-dom";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {

            await sendPasswordResetEmail(auth, email);

            setMessage(
                "A password reset email has been sent. Please check your inbox."
            );

        } catch (err) {

    console.error(err);

    switch (err.code) {

        case "auth/invalid-email":
            setError("Please enter a valid email address.");
            break;

        case "auth/too-many-requests":
            setError("Too many attempts. Please try again later.");
            break;

        default:
            setError(
                "Unable to send password reset email. Please try again."
            );
    }

}

        setLoading(false);

    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Forgot Password
                </h1>

                <p className="text-gray-500 text-center mb-8">
                    Enter your email address and Firebase will send you a password reset email.
                </p>

                {message && (
                    <div className="bg-green-100 text-green-700 rounded-lg p-3 mb-4">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={submit}>

                    <label className="block font-medium mb-2">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="you@example.com"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        {loading ? "Sending..." : "Send Reset Email"}
                    </button>

                </form>

                <p className="text-center mt-6">
                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Back to Login
                    </Link>
                </p>

            </div>

        </div>

    );

}