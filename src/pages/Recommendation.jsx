import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  generateRecommendation,
} from "../services/recommendationService";

function Recommendation() {
  const [recommendation, setRecommendation] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const response =
        await generateRecommendation();

      setRecommendation(
        response.recommendation
      );
    } catch (error) {
      console.error(
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-4 md:p-8">

        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Investment Recommendation
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Generate a personalized portfolio recommendation based on your latest assessment.
            </p>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="
              bg-blue-600
              hover:bg-blue-700
              disabled:opacity-50
              text-white
              font-semibold
              px-6
              py-3
              rounded-xl
              transition
            "
          >
            {loading
              ? "Generating..."
              : "Generate Recommendation"}
          </button>

          {/* Recommendation Card */}
          {recommendation && (
            <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8">

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Your Recommendation
              </h2>

              {/* Summary */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">

                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-5">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Risk Score
                  </p>

                  <p className="text-4xl font-bold text-blue-600">
                    {recommendation.riskScore}
                  </p>
                </div>

                <div className="rounded-2xl p-5 bg-gray-100 dark:bg-slate-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Investor Type
                  </p>

                  <span
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold
                      ${getBadgeColor(
                        recommendation.investorType
                      )}
                    `}
                  >
                    {recommendation.investorType}
                  </span>
                </div>

              </div>

              {/* Portfolio Allocation */}
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Portfolio Allocation
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-5 text-center">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Stocks
                  </h4>

                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {recommendation.portfolioAllocation.stocks}%
                  </p>
                </div>

                <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-5 text-center">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Mutual Funds
                  </h4>

                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {recommendation.portfolioAllocation.mutualFunds}%
                  </p>
                </div>

                <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-5 text-center">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Bonds
                  </h4>

                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {recommendation.portfolioAllocation.bonds}%
                  </p>
                </div>

                <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-5 text-center">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Cash
                  </h4>

                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    {recommendation.portfolioAllocation.cash}%
                  </p>
                </div>

              </div>

              {/* AI Explanation */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  AI Explanation
                </h3>

                <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6">
                  <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                    {recommendation.explanation}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Recommendation;

