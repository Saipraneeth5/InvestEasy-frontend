import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import { getLatestAssessment } from "../services/assessmentService";
import { getLatestRecommendation } from "../services/recommendationService";

function Dashboard() {
  const [assessment, setAssessment] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-8">
          <h1>Loading Dashboard...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen p-8 bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Assessment Card */}

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Latest Assessment
            </h2>

            {assessment ? (
              <>
                <div className="mb-3">
                  <p className="text-gray-500">
                    Risk Score
                  </p>

                  <p className="text-3xl font-bold text-blue-600">
                    {assessment.riskScore}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Investor Type
                  </p>

                  <p className="text-2xl font-semibold">
                    {assessment.investorType}
                  </p>
                </div>
              </>
            ) : (
              <p>No Assessment Found</p>
            )}
          </div>

          {/* Recommendation Card */}

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Portfolio Allocation
            </h2>

            {recommendation ? (
              <div className="space-y-2">
                <p>
                  📈 Stocks:
                  {" "}
                  {recommendation.portfolioAllocation.stocks}%
                </p>

                <p>
                  📊 Mutual Funds:
                  {" "}
                  {recommendation.portfolioAllocation.mutualFunds}%
                </p>

                <p>
                  🏦 Bonds:
                  {" "}
                  {recommendation.portfolioAllocation.bonds}%
                </p>

                <p>
                  💰 Cash:
                  {" "}
                  {recommendation.portfolioAllocation.cash}%
                </p>
              </div>
            ) : (
              <p>No Recommendation Found</p>
            )}
          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Quick Actions
            </h2>

            <div className="flex flex-col gap-3">

              <Link
                to="/assessment"
                className="bg-blue-600 text-white text-center py-2 rounded"
              >
                Take Assessment
              </Link>

              <Link
                to="/recommendation"
                className="bg-green-600 text-white text-center py-2 rounded"
              >
                Recommendation
              </Link>

              <Link
                to="/tutor"
                className="bg-purple-600 text-white text-center py-2 rounded"
              >
                Ask Tutor
              </Link>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;