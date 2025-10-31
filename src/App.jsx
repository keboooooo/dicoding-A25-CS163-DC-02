import { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { LucideRefreshCcw } from "lucide-react";

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const tutorialId = params.get("tutorial_id") || "default_tutorial";
  const userId = params.get("user_id") || "guest_user";
  const STORAGE_KEY = `quiz_state_${userId}_${tutorialId}`;

  const questions = [
    {
      id: 1,
      question: "Result of concatenating the outputs",
      options: [
        "A single scalar value representing the overall attention score.",
        "A set of probabilities indicating the relevance of each input element.",
        "A matrix that combines the information from all heads.",
        "A reduced-dimensionality representation of the input sequence.",
      ],
      correct: "A matrix that combines the information from all heads.",
      feedbackWrong:
        "Jawaban Anda belum tepat. Pada multi-head attention, output dari tiap head (masing-masing berupa matriks) dikonkatenasi lalu diproyeksikan kembali, sehingga hasilnya adalah matriks yang menggabungkan informasi dari semua head—bukan skalar tunggal.",
      feedbackCorrect:
        "Output concat pada multi-head attention adalah matriks yang menyatukan hasil dari tiap head, biasanya berukuran seq_Len × (num_heads × d_v), kemudian diproyeksikan oleh layer linear untuk kembali ke dimensi model.",
    },
    {
      id: 2,
      question:
        "What is the purpose of the linear projection after concatenation in multi-head attention?",
      options: [
        "To reduce the number of attention heads.",
        "To combine all heads back into the original model dimension.",
        "To normalize attention scores.",
        "To convert the matrix into probabilities.",
      ],
      correct: "To combine all heads back into the original model dimension.",
      feedbackWrong:
        "Linear projection tidak digunakan untuk normalisasi atau pengurangan head, tetapi untuk mengembalikan hasil concatenation ke dimensi model semula.",
      feedbackCorrect:
        "Linear projection menggabungkan hasil dari semua head kembali ke dimensi model (biasanya d_model), menjaga konsistensi dimensi antar layer transformer.",
    },
    {
      id: 3,
      question:
        "Why is multi-head attention used instead of a single attention head?",
      options: [
        "Because multiple heads reduce computation time.",
        "Because multiple heads allow the model to attend to information from different representation subspaces.",
        "Because multiple heads increase the model’s depth.",
        "Because multiple heads eliminate the need for positional encoding.",
      ],
      correct:
        "Because multiple heads allow the model to attend to information from different representation subspaces.",
      feedbackWrong:
        "Multi-head attention tidak untuk mengurangi waktu komputasi, tapi untuk menangkap konteks dari berbagai representasi subruang secara paralel.",
      feedbackCorrect:
        "Multi-head attention memungkinkan model memperhatikan informasi dari berbagai representasi subruang (subspaces) yang berbeda secara bersamaan, memperkaya konteks pemahaman token.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleSelect = (id, ans) => {
    setAnswers((prev) => ({ ...prev, [id]: ans }));
  };

  const handleReset = () => {
    // localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
  };

  const q = questions[current];
  const selected = answers[q.id];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow border border-gray-200 bg-white px-4 py-6">
        <QuestionCard
          index={current}
          total={questions.length}
          question={q.question}
          options={q.options}
          correct={q.correct}
          selected={selected}
          feedbackCorrect={q.feedbackCorrect}
          feedbackWrong={q.feedbackWrong}
          onSelect={(opt) => handleSelect(q.id, opt)}
        />

        <div className="flex justify-end gap-2 mt-6 text-sm">
          <button
            onClick={handleReset}
            className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
          >
            <LucideRefreshCcw name="refresh" className="w-4 h-4 mr-2" /> Try
            Again
          </button>
          <button
            onClick={() => setCurrent((p) => Math.max(p - 1, 0))}
            disabled={current === 0}
            className="flex items-center space-x-1 px-4 py-2 rounded-lg border-2 border-dashed border-gray-400 text-gray-500 hover:cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m15 19-7-7 7-7"
              />
            </svg>
            <span>Previous</span>
          </button>

          <button
            onClick={() =>
              setCurrent((p) => Math.min(p + 1, questions.length - 1))
            }
            disabled={current === questions.length - 1}
            className="flex items-center space-x-1 px-4 py-2 rounded-lg border-2 border-dashed border-gray-400 text-gray-500 hover:cursor-pointer"
          >
            <span>Next</span>
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m9 5 7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
