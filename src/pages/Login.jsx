import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

function Login() {
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] =
        useState(false);

    const { setAuth } =
        useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response =
                await loginUser(formData);

            localStorage.setItem(
                "auth",
                JSON.stringify(response)
            );

            setAuth(response);

            navigate("/dashboard");
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Login to continue your investment journey"
        >
            {error && (
                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    type="text"
                    name="identifier"
                    placeholder="Email or Username"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                    className="
w-full
border
border-gray-300
dark:border-slate-700
rounded-xl
p-4
bg-white
dark:bg-slate-800
text-black
dark:text-white
placeholder:text-gray-400
"
                />

                <div>
                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="
w-full
border
border-gray-300
dark:border-slate-700
rounded-xl
p-4
bg-white
dark:bg-slate-800
text-black
dark:text-white
placeholder:text-gray-400
"
                    />

                    <button
                        type="button"
                        className="text-sm text-purple-600 mt-2"
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                    >
                        {showPassword
                            ? "Hide Password"
                            : "Show Password"}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl"
                >
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </button>
            </form>

            <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
                New to InvestEasy?{" "}
                <Link
                    to="/register"
                    className="text-purple-600 font-semibold"
                >
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
}

export default Login;