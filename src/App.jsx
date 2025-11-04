import QuestionCard from "./components/QuestionCard";
import NavigationButtons from "./components/NavigationButtons";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import { useQuizData } from "./hooks/useQuizData";
import { useQuizState } from "./hooks/useQuizState";
import { getThemeClasses } from "./utils/themeUtils";
import { STORAGE_KEYS, DEFAULT_VALUES } from "./utils/constants";

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const tutorialId = params.get("tutorial_id") || DEFAULT_VALUES.TUTORIAL_ID;
  const userId = params.get("user_id") || DEFAULT_VALUES.USER_ID;

  const STORAGE_KEY = STORAGE_KEYS.QUIZ_STATE(userId, tutorialId);

  // Fetch quiz data
  const { questions, preferences, loading, error } = useQuizData(
    tutorialId,
    userId
  );

  // Manage quiz state
  const {
    current,
    answers,
    handleSelect,
    handleReset,
    goToNext,
    goToPrevious,
  } = useQuizState(STORAGE_KEY, questions);

  // Apply user preferences
  const { isDarkTheme, isFullWidth, isLargeFont } =
    getThemeClasses(preferences);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-600">No questions available</p>
      </div>
    );
  }

  const currentQuestion = questions[current];
  const selectedAnswer = answers[currentQuestion.id];

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isLargeFont ? "text-lg" : "text-base"
      }`}
    >
      <div
        className={`
          w-full rounded-xl overflow-hidden shadow border px-4 py-6
          ${isFullWidth ? "max-w-full" : "max-w-2xl"}
          ${
            isDarkTheme
              ? "bg-gray-900 text-white border-gray-700"
              : "bg-white text-gray-900 border-gray-200"
          }
        `}
      >
        <QuestionCard
          index={current}
          total={questions.length}
          question={currentQuestion.question}
          options={currentQuestion.options}
          correct={currentQuestion.correct}
          selected={selectedAnswer}
          feedbackCorrect={currentQuestion.feedbackCorrect}
          feedbackWrong={currentQuestion.feedbackWrong}
          onSelect={(opt) => handleSelect(currentQuestion.id, opt)}
        />

        <NavigationButtons
          current={current}
          total={questions.length}
          onReset={handleReset}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      </div>
    </div>
  );
}
