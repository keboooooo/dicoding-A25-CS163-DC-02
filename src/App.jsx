import { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import { LucideRefreshCcw } from "lucide-react";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const tutorialIdFromUrl = urlParams.get('tutorial');
  const userIdFromUrl = urlParams.get('user');
  const pathSegments = window.location.pathname.split("/");
  const tutorialId = tutorialIdFromUrl || pathSegments[2] || "35363";

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [preferences, setPreferences] = useState({
    layoutWidth: "fullWidth",
    fontStyle: "default",
    theme: "light",
    fontSize: "medium",
  });
  
  useEffect(() => {

    const fetchPreferences = async (userId) => {
      try {
        const response = await fetch(
          `https://learncheck-dicoding-mock-666748076441.europe-west1.run.app/api/users/${userId}/preferences`
        );
        const data = await response.json();
        
        if (data.status === "success" && data.data?.preference) {
          const userPrefs = data.data.preference;
          if (userPrefs.theme) {
            userPrefs.theme = userPrefs.theme.toLowerCase();
          }
          setPreferences(userPrefs);
        }
      } catch {
        console.warn("Failed to fetch preferences");
      }
    };

    if (userIdFromUrl) {
      fetchPreferences(userIdFromUrl);
    }
  }, [userIdFromUrl]);

  useEffect(() => {
    if (!tutorialId) {
      setLoading(false);
      return;
    }

    const API_BASE = "http://localhost:5000";
    const endpoint = `${API_BASE}/api/generate/${tutorialId}`;

    setLoading(true);

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.data?.questions) {
          setQuestions(data.data.questions);
        } else {
          setQuestions([]);
        }
      })
      .catch(() => {
        setQuestions([]);
      })
      .finally(() => setLoading(false));
  }, [tutorialId]);

  const isDarkTheme = preferences.theme && 
    (preferences.theme.toLowerCase() === "dark" || 
     preferences.theme.toLowerCase() === "darkmode" ||
     preferences.theme.toLowerCase() === "night");
      
  const themeClasses = isDarkTheme ? "bg-gray-900" : "bg-gray-100";

  if (loading) {
    return (
      <div className={`p-4 min-h-screen flex items-center justify-center ${themeClasses} text-white`}>
        <div className="text-center">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className={`p-4 min-h-screen flex items-center justify-center ${themeClasses} text-white`}>
        <div className="text-center">
          <div>No questions available</div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const selected = answers[q.id];

  const handleSelect = (id, ans) => {
    setAnswers((prev) => ({ ...prev, [id]: ans }));
  };

  const handleTryAgainQuestion = (id) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[id];
      return newAnswers;
    });
  };

  const cardThemeClasses = isDarkTheme
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-200 text-gray-900";

  const widthClasses = preferences.layoutWidth === "fullWidth"
    ? "max-w-full"
    : preferences.layoutWidth === "narrow"
    ? "max-w-2xl"
    : "max-w-4xl";

  const fontStyleClasses = preferences.fontStyle === "serif"
    ? "font-serif"
    : preferences.fontStyle === "mono"
    ? "font-mono"
    : "";

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${themeClasses} ${fontStyleClasses}`}>
      <div className={`w-full ${widthClasses} rounded-xl overflow-hidden shadow border ${cardThemeClasses} px-4 py-6`}>
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
          preferences={preferences}
        />

        <div className="flex justify-between gap-2 mt-6 text-sm">
          <button
            onClick={() => handleTryAgainQuestion(q.id)}
            className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
          >
            <LucideRefreshCcw className="w-4 h-4 mr-2" /> Try Again
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrent((p) => Math.max(p - 1, 0))}
              disabled={current === 0}
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg border-2 border-dashed ${
                isDarkTheme
                  ? "border-gray-600 text-gray-400"
                  : "border-gray-400 text-gray-500"
              } hover:cursor-pointer disabled:opacity-50`}
            >
              <span>Previous</span>
            </button>

            <button
              onClick={() =>
                setCurrent((p) => Math.min(p + 1, questions.length - 1))
              }
              disabled={current === questions.length - 1}
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg border-2 border-dashed ${
                isDarkTheme
                  ? "border-gray-600 text-gray-400"
                  : "border-gray-400 text-gray-500"
              } hover:cursor-pointer disabled:opacity-50`}
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}