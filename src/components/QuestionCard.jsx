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
}) {
  const answered = !!selected;
  const isCorrect = selected === correct;

  return (
    <>
      <div
        className={
          "flex items-center justify-between pb-3 text-sm font-medium border-b border-gray-200 text-gray-700"
        }
      >
        <span>
          Question {index + 1} of {total}
        </span>{" "}
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
      <div className="h-2 rounded-full overflow-hidden border border-dashed border-gray-300 my-4">
        <div
          className="h-full bg-gray-400"
          style={{
            width: `${((index + 1) / total) * 100}%`,
            transition: "width 0.5s ease-in-out",
          }}
        ></div>
      </div>
      <div>
        <h2 className="font-bold text-lg text-gray-800 mb-4">{question}</h2>
        <div className="space-y-2">
          {options.map((opt, i) => {
            const isSelected = selected === opt;
            const correctChoice = opt === correct;

            return (
              <button
                key={i}
                onClick={() => !answered && onSelect(opt)}
                className={`flex items-center gap-3 w-full px-4 py-3 border rounded-lg text-left transition-all ${
                  answered
                    ? isSelected && !isCorrect
                      ? "border-rose-400 bg-rose-50"
                      : isSelected && isCorrect
                      ? "border-green-400 bg-green-50"
                      : correctChoice && !isCorrect
                      ? "border-green-300 bg-green-50"
                      : "border-gray-300"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`mt-1 w-5 h-5 shrink-0 rounded border ${
                    isSelected
                      ? isCorrect
                        ? "border-green-500"
                        : "border-rose-500"
                      : "border-gray-400"
                  }`}
                ></div>
                <span className="text-gray-800 text-sm">{opt}</span>
                <div className="ml-auto">
                  {answered && isSelected && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  {answered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600" />
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
                ? "bg-green-50 border-green-300 text-green-800"
                : "bg-rose-50 border-rose-300 text-rose-800"
            }`}
          >
            <div className="font-semibold mb-1">
              {isCorrect ? "✅ Benar — Penjelasan singkat" : "❌ Penjelasan"}
            </div>
            <p className="text-sm leading-relaxed">
              {isCorrect ? feedbackCorrect : feedbackWrong}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
