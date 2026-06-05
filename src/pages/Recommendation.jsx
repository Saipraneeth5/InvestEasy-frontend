import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  generateRecommendation,
} from "../services/recommendationService";

function Recommendation() {
  const [recommendation, setRecommendation] =
    useState(null);

  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const response =
        await generateRecommendation();

      console.log(response);

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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">
        Recommendation
      </h1>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading
          ? "Generating..."
          : "Generate Recommendation"}
      </button>

      {recommendation && (
        <div className="mt-8 border rounded p-6">
          <h2 className="text-2xl font-bold mb-4">
            Your Recommendation
          </h2>

          <p>
            <strong>Investor Type:</strong>{" "}
            {recommendation.investorType}
          </p>

          <p>
            <strong>Risk Score:</strong>{" "}
            {recommendation.riskScore}
          </p>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">
              Portfolio Allocation
            </h3>

            <p>
              Stocks:{" "}
              {
                recommendation
                  .portfolioAllocation
                  .stocks
              }
              %
            </p>

            <p>
              Mutual Funds:{" "}
              {
                recommendation
                  .portfolioAllocation
                  .mutualFunds
              }
              %
            </p>

            <p>
              Bonds:{" "}
              {
                recommendation
                  .portfolioAllocation
                  .bonds
              }
              %
            </p>

            <p>
              Cash:{" "}
              {
                recommendation
                  .portfolioAllocation
                  .cash
              }
              %
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">
              AI Explanation
            </h3>

            <p className="whitespace-pre-wrap">
              {recommendation.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendation;