import { useState } from "react";
import { askTutor } from "../services/tutorService";
import Navbar from "../components/Navbar";

function Tutor() {
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    try {
      setLoading(true);

      const response =
        await askTutor(question);

      console.log(response);

      setAnswer(response.answer);
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
        AI Investment Tutor
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <textarea
          rows="5"
          placeholder="Ask any investing question..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          className="border rounded p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading
            ? "Thinking..."
            : "Ask Tutor"}
        </button>
      </form>

      {answer && (
        <div className="mt-8 border rounded p-6">
          <h2 className="text-xl font-bold mb-3">
            Tutor Answer
          </h2>

          <p className="whitespace-pre-wrap">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default Tutor;