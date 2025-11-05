/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import { LucideRefreshCcw } from "lucide-react";

export default function App() {
  const pathSegments = window.location.pathname.split("/");
  const tutorialId = pathSegments[2];

  const userId = localStorage.getItem("userId") || "guest_user";
  const STORAGE_KEY = `quiz_state_${userId}_${tutorialId}`;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const API_BASE = "http://localhost:5000";
    const endpoint = `${API_BASE}/api/generate/${tutorialId}`;

    setLoading(true);

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.data?.questions) {
          setQuestions(data.data.questions);

          // Load progress dari localStorage
          const savedAnswers = localStorage.getItem(STORAGE_KEY);
          if (savedAnswers) setAnswers(JSON.parse(savedAnswers));

          const savedIndex = localStorage.getItem(`${STORAGE_KEY}_current`);
          if (savedIndex) setCurrent(Number(savedIndex));
        } else {
          setQuestions([]);
        }
      })
      .catch((err) => {
        console.error("Gagal load questions:", err);
        setQuestions([]);
      })
      .finally(() => setLoading(false));
  }, [tutorialId, STORAGE_KEY]);

  // Simpan jawaban ke localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers, STORAGE_KEY]);

  // Simpan posisi soal terakhir
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_current`, current);
  }, [current, STORAGE_KEY]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!questions.length)
    return <div className="p-4">No questions available</div>;

  const q = questions[current];
  const selected = answers[q.id];

  const handleSelect = (id, ans) => {
    setAnswers((prev) => ({ ...prev, [id]: ans }));
  };

  const handleTryAgainQuestion = (id) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[id]; // hapus jawaban soal tertentu
      return newAnswers;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow border border-gray-200 bg-white px-4 py-6">
        <QuestionCard
          key={q.id}
          index={current}
          total={questions.length}
          question={q.question}
          options={q.options}
          correct={q.answer}
          selected={selected}
          feedbackCorrect={q.explanation}
          feedbackWrong={q.explanation}
          onSelect={(opt) => handleSelect(q.id, opt)}
        />

        <div className="flex justify-between gap-2 mt-6 text-sm">
          <button
            onClick={() => handleTryAgainQuestion(q.id)}
            className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
          >
            <LucideRefreshCcw name="refresh" className="w-4 h-4 mr-2" /> Try
            Again
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrent((p) => Math.max(p - 1, 0))}
              disabled={current === 0}
              className="flex items-center space-x-1 px-4 py-2 rounded-lg border-2 border-dashed border-gray-400 text-gray-500 hover:cursor-pointer disabled:opacity-50"
            >
              <span>Previous</span>
            </button>

            <button
              onClick={() =>
                setCurrent((p) => Math.min(p + 1, questions.length - 1))
              }
              disabled={current === questions.length - 1}
              className="flex items-center space-x-1 px-4 py-2 rounded-lg border-2 border-dashed border-gray-400 text-gray-500 hover:cursor-pointer disabled:opacity-50"
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
