import { useState } from "react";
import { loginUser } from "../services/authService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            localStorage.setItem(
                "auth",
                JSON.stringify(response)
            );

            setAuth(response);

            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100 p-8">
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Identifier"
            />

            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
            />

            <button type="submit">
                Login
            </button>
        </form>
        </div>
    );
}

export default Login;