import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // Read from localStorage first, then sessionStorage
    const storedUser =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));

    const storedToken =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    const [user, setUser] = useState(storedUser);
    const [token, setToken] = useState(storedToken);
const login = async (email, password) => {
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
    

    const register = async (userData) => {

        const response = await api.post("/auth/register", userData);

        return response.data;
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);