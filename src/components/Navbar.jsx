import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { setAuth } = useContext(AuthContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth");

        setAuth(null);

        navigate("/");
    };

    return (
        <nav className="bg-slate-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

                <h1 className="text-2xl font-bold">
                    InvestEasy
                </h1>

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/assessment">
                    Assessment
                </Link>

                <Link to="/assessment-history">
                    Assessment History
                </Link>

                <Link to="/recommendation">
                    Recommendation
                </Link>

                <Link to="/recommendation-history">
                    Recommendation History
                </Link>

                <Link to="/tutor">
                    Tutor
                </Link>

                <button
                    onClick={handleLogout}
                    className="ml-auto bg-red-600 px-4 py-2 rounded"
                >
                    Logout
                </button>

            </div>
        </nav>
    );
}

export default Navbar;