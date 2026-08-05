import { createContext, useContext, useState } from "react";
import api from "../api/axios";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut
} from "firebase/auth";

import { auth } from "../firebase/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // Load saved authentication
    const storedUser =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));

    const storedToken =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    const [user, setUser] = useState(storedUser);
    const [token, setToken] = useState(storedToken);

    // ==========================
    // Register
    // ==========================

    const register = async (userData) => {

        // Create Firebase account
        const credential = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
        );

        // Send verification email
        await sendEmailVerification(credential.user);

        // Save user in your backend
        const response = await api.post("/auth/register", userData);

        return response.data;
    };

    // ==========================
    // Login
    // ==========================

    const login = async (email, password) => {

        // Login using Firebase
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Refresh user information
        await credential.user.reload();

        // Check email verification
        if (!credential.user.emailVerified) {

            await signOut(auth);

            throw new Error(
                "Please verify your email before logging in."
            );
        }

        // Login to backend
        const response = await api.post("/auth/login", {
            email,
            password
        });

        const { token, user } = response.data.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setToken(token);
        setUser(user);

        return user;
    };

    // ==========================
// Forgot Password
// ==========================

const forgotPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
};

    // ==========================
    // Logout
    // ==========================

    const logout = async () => {

        await signOut(auth);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
    value={{
        user,
        token,
        login,
        register,
        logout,
        forgotPassword
    }}
>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);