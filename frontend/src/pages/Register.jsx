import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

    const submit = async (e) => {
    e.preventDefault();

    try {

        await register({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
            phoneCode: form.countryCode,
            phone: form.phone,
            marketing: form.marketing
        });

        alert("Registration successful!");

        navigate("/login");

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Registration failed"
        );

    }
};

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">

            <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Register
                </h1>

                {/* Social Buttons */}

                <button
                    type="button"
                    className="w-full border rounded-xl py-3 font-medium hover:bg-gray-50 transition mb-3"
                >
                    🔵 Register with Google
                </button>

                <button
                    type="button"
                    className="w-full border rounded-xl py-3 font-medium hover:bg-gray-50 transition"
                >
                    🔷 Register with Facebook
                </button>

                {/* Divider */}

                <div className="flex items-center my-6">

                    <hr className="flex-grow" />

                    <span className="mx-4 text-gray-500">
                        Or
                    </span>

                    <hr className="flex-grow" />

                </div>

                <form onSubmit={submit}>

                    {/* First & Last Name */}

                    <div className="grid grid-cols-2 gap-4 mb-4">

                        <div>

                            <label className="block mb-2 font-medium">
                                First Name
                            </label>

                            <input
                                type="text"
                                value={form.firstName}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        firstName: e.target.value,
                                    })
                                }
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Last Name
                            </label>

                            <input
                                type="text"
                                value={form.lastName}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        lastName: e.target.value,
                                    })
                                }
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />

                        </div>

                    </div>

                    {/* Email */}

                    <div className="mb-4">

                        <label className="block mb-2 font-medium">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />

                    </div>

                    {/* Password */}

                    <div className="mb-2">

                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />

                        <p className="text-sm text-gray-500 mt-2">
                            At least 8 characters and 1 special character or number
                        </p>

                    </div>

                    {/* Phone */}

                    <div className="mt-5">

                        <label className="block mb-2 font-medium">
                            Mobile Number
                        </label>

                        <div className="flex gap-3">

                            <select
                                value={form.countryCode}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        countryCode: e.target.value,
                                    })
                                }
                                className="border rounded-lg px-3 py-3"
                            >
                                <option value="+27">ZA (+27)</option>
                                <option value="+1">US (+1)</option>
                                <option value="+44">UK (+44)</option>
                            </select>

                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                value={form.phone}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        phone: e.target.value,
                                    })
                                }
                                className="flex-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                            A One-Time PIN will be sent via SMS to verify this number.
                        </p>

                    </div>

                    {/* Marketing */}

                    <div className="flex items-start gap-3 mt-6">

                        <input
                            type="checkbox"
                            checked={form.marketing}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    marketing: e.target.checked,
                                })
                            }
                            className="mt-1"
                        />

                        <span className="text-sm">
                            I want to receive offers and wish list newsletters.
                        </span>

                    </div>

                    {/* Continue */}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold mt-6"
                    >
                        Continue
                    </button>

                    {/* Terms */}

                    <p className="text-xs text-gray-500 text-center mt-5">
                        By clicking <strong>Continue</strong>, you agree to our
                        Terms and Conditions and confirm that you are over
                        18 years of age.
                    </p>

                    {/* Login */}

                    <p className="text-center mt-6">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Login
                        </Link>

                    </p>

                </form>

            </div>

        </div>
    );
}
