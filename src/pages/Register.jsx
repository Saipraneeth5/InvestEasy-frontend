import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import AuthLayout from "../components/AuthLayout";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] =
        useState(false);

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

            await registerUser(formData);

            navigate("/");
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                    "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Start your investment journey today"
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
                    name="username"
                    placeholder="Username"
                    value={formData.username}
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

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
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
                        ? "Creating Account..."
                        : "Register"}
                </button>
            </form>

            <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                    to="/"
                    className="text-purple-600 font-semibold"
                >
                    Login
                </Link>
            </p>
        </AuthLayout>
    );
}

export default Register;