import { useState } from "react";
import { createAssessment } from "../services/assessmentService";
import Navbar from "../components/Navbar";


const questions = [
  {
    questionId: 1,
    title: "Investment Horizon",
    options: [
      "Less than 1 year",
      "1-3 years",
      "3-5 years",
      "5-10 years",
      "More than 10 years",
    ],
  },
  {
    questionId: 2,
    title: "Market Crash Reaction",
    options: [
      "Sell Everything",
      "Sell Some",
      "Hold",
      "Buy More",
    ],
  },
  {
    questionId: 3,
    title: "Loss Tolerance",
    options: [
      "Less than 5%",
      "5-10%",
      "10-20%",
      "20-30%",
      "More than 30%",
    ],
  },
  {
    questionId: 4,
    title: "Investment Knowledge",
    options: [
      "No Knowledge",
      "Basic Knowledge",
      "Average Knowledge",
      "Good Knowledge",
      "Advanced Knowledge",
    ],
  },
  {
    questionId: 5,
    title: "Portfolio Preference",
    options: [
      "Guaranteed Returns",
      "Mostly Safe Investments",
      "Balanced Portfolio",
      "Growth Focused",
      "Maximum Growth Potential",
    ],
  },
  {
    questionId: 6,
    title: "Expected Return vs Safety",
    options: [
      "Maximum Safety",
      "Mostly Safe with Some Growth",
      "Balanced Risk and Return",
      "Growth-Oriented",
      "Aggressive Growth",
    ],
  },
];
function Assessment() {
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    occupation: "",
    location: "",

    income: "",
    savings: "",
    investmentBudget: "",

    goal: "",
    experience: "",

    answers: [
      { questionId: 1, answer: "" },
      { questionId: 2, answer: "" },
      { questionId: 3, answer: "" },
      { questionId: 4, answer: "" },
      { questionId: 5, answer: "" },
      { questionId: 6, answer: "" },
    ],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAnswerChange = (
    questionId,
    selectedAnswer
  ) => {
    const updatedAnswers =
      formData.answers.map((answerObj) =>
        answerObj.questionId === questionId
          ? {
            ...answerObj,
            answer: selectedAnswer,
          }
          : answerObj
      );
    setFormData({
      ...formData,
      answers: updatedAnswers,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(
        JSON.stringify(formData, null, 2)
      );
      const response =
        await createAssessment(formData);

      console.log(response);

      setResult(response.assessment);
    } catch (error) {
      console.error(error.response?.data);
      console.error(error);
    }

  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">
        Risk Assessment
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="income"
          placeholder="Annual Income"
          value={formData.income}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="savings"
          placeholder="Savings"
          value={formData.savings}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="investmentBudget"
          placeholder="Investment Budget"
          value={formData.investmentBudget}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">
            Select Goal
          </option>

          <option value="Capital Protection">
            Capital Protection
          </option>

          <option value="Regular Income">
            Regular Income
          </option>

          <option value="Balanced Growth">
            Balanced Growth
          </option>

          <option value="Long-Term Growth">
            Long-Term Growth
          </option>
        </select>

        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">
            Select Experience
          </option>

          <option value="Beginner">
            Beginner
          </option>

          <option value="Intermediate">
            Intermediate
          </option>

          <option value="Advanced">
            Advanced
          </option>
        </select>
        {
          questions.map((question) => (
            <div
              key={question.questionId}
              className="mt-6"
            >
              <h3 className="font-semibold mb-2">
                {question.title}
              </h3>

              <select
                className="border p-2 rounded w-full"
                onChange={(e) =>
                  handleAnswerChange(
                    question.questionId,
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Option
                </option>

                {question.options.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))
        }
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-6"
        >
          Submit Assessment
        </button>
      </form>


      {/* <div className="mt-8">
          <h2 className="font-semibold mb-2">
            Current Form State
          </h2>

          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(formData, null, 2)}
          </pre>
          
        </div> */}
      {result && (
        <div>
          <h2>Assessment Result</h2>

          <p>
            Risk Score: {result.riskScore}
          </p>

          <p>
            Investor Type: {result.investorType}
          </p>
        </div>
      )}
    </div>

  );
}

export default Assessment;