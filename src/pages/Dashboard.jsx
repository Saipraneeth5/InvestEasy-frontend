import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getLatestAssessment,
} from "../services/assessmentService";

import {
  getLatestRecommendation,
} from "../services/recommendationService";

function Dashboard() {
  const [assessment, setAssessment] =
    useState(null);

  const [
    recommendation,
    setRecommendation,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDashboardData =
      async () => {
        try {
          const assessmentResponse =
            await getLatestAssessment();

          setAssessment(
            assessmentResponse.assessment
          );
        } catch (error) {
          console.log(
            "No assessment found"
          );
        }

        try {
          const recommendationResponse =
            await getLatestRecommendation();

          setRecommendation(
            recommendationResponse.recommendation
          );
        } catch (error) {
          console.log(
            "No recommendation found"
          );
        }

        setLoading(false);
      };

    fetchDashboardData();
  }, []);

  const getBadgeColor = (type) => {
    switch (type) {
      case "Conservative":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

      case "Moderate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

      case "Aggressive":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex items-center justify-center">
          <div className="text-center">

            <div
              className="
              animate-spin
              h-12
              w-12
              border-4
              border-blue-600
              border-t-transparent
              rounded-full
              mx-auto
              mb-4
            "
            />

            <p className="text-gray-600 dark:text-gray-400">
              Loading Dashboard...
            </p>

          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-4 md:p-8">

        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Welcome Back 👋
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track your investor profile,
              recommendations, and learning
              journey.
            </p>

          </div>

          {/* Stats Row */}

          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-5">
              <p className="text-gray-500 dark:text-gray-400">
                Risk Score
              </p>

              <p className="text-4xl font-bold text-blue-600">
                {assessment?.riskScore || "-"}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-5">
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Investor Type
              </p>

              {assessment ? (
                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-semibold
                    ${getBadgeColor(
                      assessment.investorType
                    )}
                  `}
                >
                  {assessment.investorType}
                </span>
              ) : (
                <p className="text-gray-500">
                  -
                </p>
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-5">
              <p className="text-gray-500 dark:text-gray-400">
                Recommendation
              </p>

              <p className="text-2xl font-bold text-green-600 mt-2">
                {recommendation
                  ? "Available"
                  : "Not Generated"}
              </p>
            </div>

          </div>

          {/* Main Cards */}

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Assessment */}

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Latest Assessment
              </h2>

              {assessment ? (
                <>
                  <div className="mb-4">
                    <p className="text-gray-500 dark:text-gray-400">
                      Risk Score
                    </p>

                    <p className="text-3xl font-bold text-blue-600">
                      {assessment.riskScore}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      Investor Type
                    </p>

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                        ${getBadgeColor(
                          assessment.investorType
                        )}
                      `}
                    >
                      {
                        assessment.investorType
                      }
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No Assessment Found
                </p>
              )}

            </div>

            {/* Portfolio */}

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Portfolio Allocation
              </h2>

              {recommendation ? (
                <div className="grid grid-cols-2 gap-3">

                  <div className="bg-gray-100 dark:bg-slate-800 rounded-xl p-3 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Stocks
                    </p>

                    <p className="text-2xl font-bold text-blue-600">
                      {
                        recommendation
                          .portfolioAllocation
                          .stocks
                      }%
                    </p>
                  </div>

                  <div className="bg-gray-100 dark:bg-slate-800 rounded-xl p-3 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Mutual Funds
                    </p>

                    <p className="text-2xl font-bold text-green-600">
                      {
                        recommendation
                          .portfolioAllocation
                          .mutualFunds
                      }%
                    </p>
                  </div>

                  <div className="bg-gray-100 dark:bg-slate-800 rounded-xl p-3 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Bonds
                    </p>

                    <p className="text-2xl font-bold text-yellow-600">
                      {
                        recommendation
                          .portfolioAllocation
                          .bonds
                      }%
                    </p>
                  </div>

                  <div className="bg-gray-100 dark:bg-slate-800 rounded-xl p-3 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Cash
                    </p>

                    <p className="text-2xl font-bold text-purple-600">
                      {
                        recommendation
                          .portfolioAllocation
                          .cash
                      }%
                    </p>
                  </div>

                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No Recommendation Found
                </p>
              )}

            </div>

            {/* Quick Actions */}

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>

              <div className="flex flex-col gap-3">

                <Link
                  to="/assessment"
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    transition
                    text-white
                    text-center
                    py-3
                    rounded-xl
                    font-medium
                  "
                >
                  Take Assessment
                </Link>

                <Link
                  to="/recommendation"
                  className="
                    bg-green-600
                    hover:bg-green-700
                    transition
                    text-white
                    text-center
                    py-3
                    rounded-xl
                    font-medium
                  "
                >
                  Generate Recommendation
                </Link>

                <Link
                  to="/tutor"
                  className="
                    bg-purple-600
                    hover:bg-purple-700
                    transition
                    text-white
                    text-center
                    py-3
                    rounded-xl
                    font-medium
                  "
                >
                  Ask AI Tutor
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;
