import { useState } from "react";
import { askTutor } from "../services/tutorService";
import Navbar from "../components/Navbar";

function Tutor() {
  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    try {
      setLoading(true);

      const response =
        await askTutor(question);

      setAnswer(response.answer);
    } catch (error) {
      console.error(
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  const exampleQuestions = [
    "What is SIP?",
    "What are mutual funds?",
    "What is diversification?",
    "How does compound interest work?",
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-4 md:p-8">

        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              AI Investment Tutor
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Learn investing concepts with simple,
              beginner-friendly explanations.
            </p>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Ask a Question
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <textarea
                rows="5"
                placeholder="Ask any investing question..."
                value={question}
                onChange={(e) =>
                  setQuestion(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  border-gray-300
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-800
                  text-gray-900
                  dark:text-white
                  rounded-2xl
                  p-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              <button
                type="submit"
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
                  ? "Thinking..."
                  : "Ask Tutor"}
              </button>
            </form>

            {/* Example Questions */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Example Questions
              </h3>

              <div className="flex flex-wrap gap-2">

                {exampleQuestions.map(
                  (example) => (
                    <button
                      key={example}
                      type="button"
                      onClick={() =>
                        setQuestion(
                          example
                        )
                      }
                      className="
                        px-4
                        py-2
                        rounded-full
                        bg-gray-100
                        dark:bg-slate-800
                        text-gray-700
                        dark:text-gray-300
                        hover:bg-gray-200
                        dark:hover:bg-slate-700
                        transition
                      "
                    >
                      {example}
                    </button>
                  )
                )}

              </div>
            </div>

          </div>

          {/* Answer Card */}
          {answer && (
            <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Tutor Answer
              </h2>

              <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6">

                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                  {answer}
                </p>

              </div>

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Tutor;
