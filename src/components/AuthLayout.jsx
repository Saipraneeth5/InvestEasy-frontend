import React from "react";
import authBg from "../assets/auth-bg.png";
function AuthLayout({
    title,
    subtitle,
    children,
}) {
    return (
        <div className="min-h-screen flex">

            {/* Hero Section */}
            <div
                className="hidden lg:flex w-1/2 bg-cover bg-center relative"
                style={{
                    backgroundImage: `url(${authBg})`,
                }}
            >
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 flex flex-col justify-center p-16 text-white">
                    <h1 className="text-6xl font-bold mb-6">
                        InvestEasy 📈
                    </h1>

                    <h2 className="text-4xl font-semibold mb-4">
                        Invest Smarter.
                    </h2>

                    <h2 className="text-4xl font-semibold mb-8">
                        Learn Faster.
                    </h2>

                    <p className="text-lg text-gray-200 max-w-xl leading-relaxed">
                        AI-powered investment learning,
                        risk assessment, portfolio
                        recommendations, and a personal
                        AI tutor for beginners.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-6">
                <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

                    <h2 className="text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                        {title}
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
                        {subtitle}
                    </p>

                    {children}

                </div>
            </div>

        </div>
    );
}

export default AuthLayout;