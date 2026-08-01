import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const submit = async (e) => {

        e.preventDefault();

        if(password !== confirmPassword){

            alert("Passwords do not match.");

            return;

        }

        setLoading(true);

        try{

            const response = await axios.post(

                `${import.meta.env.VITE_API_URL}/auth/reset-password`,

                {

                    token,

                    password

                }

            );

            alert(response.data.message);

            navigate("/login");

        }catch(error){

            alert(

                error.response?.data?.message ||

                "Unable to reset password."

            );

        }

        setLoading(false);

    };

    return(

        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-2">

                    Reset Password

                </h1>

                <p className="text-center text-gray-500 mb-8">

                    Enter your new password.

                </p>

                <form onSubmit={submit}>

                    <label className="block font-medium mb-2">

                        New Password

                    </label>

                    <input

                        type="password"

                        value={password}

                        onChange={(e)=>setPassword(e.target.value)}

                        className="w-full border rounded-lg px-4 py-3 mb-5 focus:ring-2 focus:ring-blue-500 outline-none"

                        required

                    />

                    <label className="block font-medium mb-2">

                        Confirm Password

                    </label>

                    <input

                        type="password"

                        value={confirmPassword}

                        onChange={(e)=>setConfirmPassword(e.target.value)}

                        className="w-full border rounded-lg px-4 py-3 mb-6 focus:ring-2 focus:ring-blue-500 outline-none"

                        required

                    />

                    <button

                        disabled={loading}

                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"

                    >

                        {loading ? "Updating..." : "Reset Password"}

                    </button>

                </form>

            </div>

        </div>

    );

}
