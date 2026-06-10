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
              Recommendation History
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              View all your generated portfolio recommendations.
            </p>
          </div>

          {/* Empty State */}
          {recommendations.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-10 text-center">

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                No Recommendations Found
              </h2>

              <p className="text-gray-600 dark:text-gray-400">
                Generate your first recommendation to
                see it here.
              </p>

            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>
                    <tr className="bg-gray-100 dark:bg-slate-800">

                      <th className="p-4 text-left text-gray-900 dark:text-white">
                        Date
                      </th>

                      <th className="p-4 text-left text-gray-900 dark:text-white">
                        Risk Score
                      </th>

                      <th className="p-4 text-left text-gray-900 dark:text-white">
                        Investor Type
                      </th>

                      <th className="p-4 text-left text-gray-900 dark:text-white">
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
                          className="
                            border-t
                            border-gray-200
                            dark:border-slate-700
                            hover:bg-gray-50
                            dark:hover:bg-slate-800
                            transition
                          "
                        >
                          <td className="p-4 text-gray-700 dark:text-gray-300">
                            {new Date(
                              recommendation.createdAt
                            ).toLocaleDateString()}
                          </td>

                          <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">
                            {
                              recommendation.riskScore
                            }
                          </td>

                          <td className="p-4">
                            <span
                              className={`
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                font-semibold
                                ${getBadgeColor(
                                  recommendation.investorType
                                )}
                              `}
                            >
                              {
                                recommendation.investorType
                              }
                            </span>
                          </td>

                          <td className="p-4 text-gray-700 dark:text-gray-300">
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
          )}

        </div>

      </div>
    </>
  );
}

export default RecommendationHistory;