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
  const inputClass =
  "w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";
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
  <>
    <Navbar />

    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Risk Assessment
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Answer a few questions to discover your investor profile.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8"
        >

          {/* Personal Information */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              type="text"
              name="occupation"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              type="number"
              name="income"
              placeholder="Annual Income"
              value={formData.income}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              type="number"
              name="savings"
              placeholder="Savings"
              value={formData.savings}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              type="number"
              name="investmentBudget"
              placeholder="Investment Budget"
              value={formData.investmentBudget}
              onChange={handleChange}
              className={inputClass}
            />

            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Goal</option>
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
              className={inputClass}
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

          </div>

          {/* Questionnaire */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Risk Questionnaire
          </h2>

          {questions.map((question) => (
            <div
              key={question.questionId}
              className="
                bg-gray-50
                dark:bg-slate-800
                p-5
                rounded-2xl
                mb-4
              "
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                {question.title}
              </h3>

              <select
                className={inputClass}
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
          ))}

          <button
            type="submit"
            className="
              w-full
              mt-8
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              py-4
              rounded-xl
              transition
            "
          >
            Submit Assessment
          </button>

        </form>

        {result && (
          <div
            className="
              mt-8
              bg-white
              dark:bg-slate-900
              rounded-3xl
              shadow-lg
              p-8
            "
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Assessment Result
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Risk Score
                </p>

                <p className="text-3xl font-bold text-blue-600">
                  {result.riskScore}
                </p>
              </div>

              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Investor Type
                </p>

                <p className="text-3xl font-bold text-green-600">
                  {result.investorType}
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

export default Assessment;