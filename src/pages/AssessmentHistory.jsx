import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAssessments } from "../services/assessmentService";

function AssessmentHistory() {
  const [assessments, setAssessments] =
    useState([]);

  useEffect(() => {
    const fetchAssessments =
      async () => {
        try {
          const response =
            await getAssessments();

          setAssessments(
            response.assessments
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchAssessments();
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
              Assessment History
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              View all your past risk assessments.
            </p>
          </div>

          {/* Empty State */}
          {assessments.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-10 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                No Assessments Found
              </h2>

              <p className="text-gray-600 dark:text-gray-400">
                Complete your first risk assessment to
                see results here.
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

                    </tr>
                  </thead>

                  <tbody>

                    {assessments.map(
                      (assessment) => (
                        <tr
                          key={
                            assessment._id
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
                              assessment.createdAt
                            ).toLocaleDateString()}
                          </td>

                          <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">
                            {
                              assessment.riskScore
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
                                  assessment.investorType
                                )}
                              `}
                            >
                              {
                                assessment.investorType
                              }
                            </span>
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

export default AssessmentHistory;