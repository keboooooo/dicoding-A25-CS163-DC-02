import { CheckCircle2, XCircle } from "lucide-react";

export default function QuestionCard({
  index,
  total,
  question,
  options,
  correct,
  selected,
  feedbackCorrect,
  feedbackWrong,
  onSelect,
  preferences,
}) {
  const answered = !!selected;
  const isCorrect = selected === correct;

  const isDarkTheme = preferences.theme && 
    (preferences.theme.toLowerCase() === "dark" || 
     preferences.theme.toLowerCase() === "darkmode" ||
     preferences.theme.toLowerCase() === "night");

  const fontSizeClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };

  const questionFontSizeClasses = {
    small: "text-base",
    medium: "text-lg",
    large: "text-xl",
  };

  const fontSize = fontSizeClasses[preferences.fontSize] || "text-sm";
  const questionFontSize = questionFontSizeClasses[preferences.fontSize] || "text-lg";

  const headerTextColor = isDarkTheme ? "text-gray-400" : "text-gray-700";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";
  const progressColor = isDarkTheme ? "bg-gray-500" : "bg-gray-400";
  const questionTextColor = isDarkTheme ? "text-white" : "text-gray-800";
  const optionDefaultBorder = isDarkTheme ? "border-gray-600" : "border-gray-300";
  const optionHoverBg = isDarkTheme ? "hover:bg-gray-700" : "hover:bg-gray-50";

  return (
    <>
      <div
        className={`flex items-center justify-between pb-3 ${fontSize} font-medium border-b ${borderColor} ${headerTextColor}`}
      >
        <span>
          Question {index + 1} of {total}
        </span>
        <div className="flex items-center text-xs">
          {answered ? (
            isCorrect ? (
              <div className="flex items-center border border-green-300 bg-green-50 px-3 py-1.5 rounded-xl">
                <span className="text-green-600">Correct</span>
              </div>
            ) : (
              <div className="flex items-center border border-rose-300 bg-rose-50 px-3 py-1.5 rounded-xl">
                <span className="text-rose-600">Wrong</span>
              </div>
            )
          ) : (
            <div className="w-4 h-4"></div>
          )}
        </div>
      </div>

      <div className={`h-2 rounded-full overflow-hidden border border-dashed ${borderColor} my-4`}>
        <div
          className={`h-full ${progressColor}`}
          style={{
            width: `${((index + 1) / total) * 100}%`,
            transition: "width 0.5s ease-in-out",
          }}
        ></div>
      </div>

      <div>
        <h2 className={`font-bold ${questionFontSize} ${questionTextColor} mb-4`}>
          {question}
        </h2>
        
        <div className="space-y-2">
          {options.map((opt, i) => {
            const isSelected = selected === opt;
            const correctChoice = opt === correct;

            const buttonClass = answered
              ? isSelected && !isCorrect
                ? isDarkTheme ? "border-rose-600 bg-rose-950 text-rose-200" : "border-rose-400 bg-rose-50 text-rose-800"
                : isSelected && isCorrect
                ? isDarkTheme ? "border-green-600 bg-green-950 text-green-200" : "border-green-400 bg-green-50 text-green-800"
                : correctChoice && !isCorrect
                ? isDarkTheme ? "border-green-600 bg-green-950 text-green-200" : "border-green-300 bg-green-50 text-green-800"
                : `${optionDefaultBorder} ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`
              : `${optionDefaultBorder} ${optionHoverBg} ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`;

            const checkboxBorderClass = isSelected
              ? isCorrect
                ? "border-green-500"
                : "border-rose-500"
              : isDarkTheme ? "border-gray-500" : "border-gray-400";

            return (
              <button
                key={i}
                onClick={() => !answered && onSelect(opt)}
                className={`flex items-center gap-3 w-full px-4 py-3 border rounded-lg text-left transition-all ${buttonClass}`}
              >
                <div
                  className={`mt-1 w-5 h-5 shrink-0 rounded border ${checkboxBorderClass}`}
                ></div>
                <span className={`${fontSize}`}>{opt}</span>
                <div className="ml-auto">
                  {answered && isSelected && isCorrect && (
                    <CheckCircle2 className={`w-5 h-5 ${isDarkTheme ? 'text-green-400' : 'text-green-600'}`} />
                  )}
                  {answered && isSelected && !isCorrect && (
                    <XCircle className={`w-5 h-5 ${isDarkTheme ? 'text-rose-400' : 'text-rose-600'}`} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        
        {answered && (
          <div
            className={`mt-5 p-4 rounded-lg border ${
              isCorrect
                ? isDarkTheme ? "bg-green-950 border-green-700 text-green-300" : "bg-green-50 border-green-300 text-green-800"
                : isDarkTheme ? "bg-rose-950 border-rose-700 text-rose-300" : "bg-rose-50 border-rose-300 text-rose-800"
            }`}
          >
            <div className={`font-semibold mb-1 ${fontSize}`}>
              {isCorrect ? "✅ Benar — Penjelasan singkat" : "❌ Penjelasan"}
            </div>
            <p className={`${fontSize} leading-relaxed`}>
              {isCorrect ? feedbackCorrect : feedbackWrong}
            </p>
          </div>
        )}
      </div>
    </>
  );
}