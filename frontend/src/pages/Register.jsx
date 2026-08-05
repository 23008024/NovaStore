import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "firebase/auth";

import { auth } from "../firebase/firebase";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        countryCode: "+27",
        phone: "",
        marketing: false,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            // 1. Create Firebase account
const firebaseUser = await createUserWithEmailAndPassword(
    auth,
    form.email,
    form.password
);

// 2. Send verification email
await sendEmailVerification(firebaseUser.user);

// 3. Save user in your backend
const response = await register({
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    password: form.password,
    phoneCode: form.countryCode,
    phone: form.phone,
    marketing: form.marketing,
});

            setSuccess(true);

            setMessage(
                response?.message ||
                "Registration successful! Please check your inbox and verify your email before logging in."
            );

            setTimeout(() => {
    navigate("/login");
}, 2000);

        } catch (error) {

            console.error(error);

            setSuccess(false);

            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Registration failed."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Register to start shopping on NovaStore.
                </p>

                {message && (
                    <div
                        className={`mb-5 rounded-lg p-4 text-center ${
                            success
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={submit}>

                    <div className="grid grid-cols-2 gap-4 mb-4">

                        <input
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                            className="border rounded-lg px-4 py-3"
                            required
                        />

                        <input
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                            className="border rounded-lg px-4 py-3"
                            required
                        />

                    </div>

                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 mb-4"
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 mb-4"
                        required
                    />

                    <div className="flex gap-3 mb-4">

                        <select
                            name="countryCode"
                            value={form.countryCode}
                            onChange={handleChange}
                            className="border rounded-lg px-3"
                        >
                            <option value="+27">ZA (+27)</option>
                            <option value="+1">US (+1)</option>
                            <option value="+44">UK (+44)</option>
                        </select>

                        <input
                            name="phone"
                            type="tel"
                            placeholder="Mobile Number"
                            value={form.phone}
                            onChange={handleChange}
                            className="flex-1 border rounded-lg px-4 py-3"
                        />

                    </div>

                    <label className="flex items-center gap-2 mb-5">

                        <input
                            name="marketing"
                            type="checkbox"
                            checked={form.marketing}
                            onChange={handleChange}
                        />

                        <span className="text-sm">
                            Receive promotions and newsletters
                        </span>

                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>

                    <p className="text-center mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 font-semibold"
                        >
                            Login
                        </Link>
                    </p>

                </form>

            </div>

        </div>
    );
}
