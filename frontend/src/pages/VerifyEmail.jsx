import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function VerifyEmail() {

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const verify = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await api.post("/auth/verify-email", {
                email,
                code: otp
            });

            setIsSuccess(true);
            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {

            setIsSuccess(false);

            setMessage(
                error.response?.data?.message ||
                "Verification failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold mb-2">
                    Verify Your Email
                </h2>

                <p className="text-gray-600 mb-2">
                    We've sent a verification code to:
                </p>

                <p className="font-semibold text-blue-600 mb-6">
                    {email}
                </p>

                {message && (
                    <div
                        className={`mb-4 p-3 rounded text-center ${
                            isSuccess
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-red-100 text-red-700 border border-red-300"
                        }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={verify}>

                    <input
                        type="text"
                        placeholder="Enter Verification Code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 mb-5 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
                    >
                        {loading ? "Verifying..." : "Verify Email"}
                    </button>

                </form>

            </div>

        </div>

    );

}
