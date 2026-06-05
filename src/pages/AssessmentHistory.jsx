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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          Assessment History
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
            </tr>
          </thead>

          <tbody>
            {assessments.map(
              (assessment) => (
                <tr
                  key={assessment._id}
                >
                  <td className="border p-2">
                    {new Date(
                      assessment.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="border p-2">
                    {
                      assessment.riskScore
                    }
                  </td>

                  <td className="border p-2">
                    {
                      assessment.investorType
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

export default AssessmentHistory;