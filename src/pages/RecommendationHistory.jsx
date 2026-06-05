import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  getRecommendations,
} from "../services/recommendationService";

function RecommendationHistory() {
  const [
    recommendations,
    setRecommendations,
  ] = useState([]);

  useEffect(() => {
    const fetchRecommendations =
      async () => {
        try {
          const response =
            await getRecommendations();

          setRecommendations(
            response.recommendations
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          Recommendation History
        </h1>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">
                Date
              </th>

              <th className="border p-2">
                Risk Score
              </th>

              <th className="border p-2">
                Investor Type
              </th>

              <th className="border p-2">
                Goal
              </th>
            </tr>
          </thead>

          <tbody>
            {recommendations.map(
              (
                recommendation
              ) => (
                <tr
                  key={
                    recommendation._id
                  }
                >
                  <td className="border p-2">
                    {new Date(
                      recommendation.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="border p-2">
                    {
                      recommendation.riskScore
                    }
                  </td>

                  <td className="border p-2">
                    {
                      recommendation.investorType
                    }
                  </td>

                  <td className="border p-2">
                    {
                      recommendation.goal
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecommendationHistory;