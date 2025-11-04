import { CheckCircle2, XCircle } from "lucide-react";

function ProgressBar({ current, total }) {
  return (
    <div className="h-2 rounded-full overflow-hidden border border-dashed border-gray-300 my-4">
      <div
        className="h-full bg-gray-400"
        style={{
          width: `${(current / total) * 100}%`,
          transition: "width 0.5s ease-in-out",
        }}
      ></div>
    </div>
  );
}

function OptionButton({ option, isSelected, isCorrect, answered, onSelect }) {
  const getButtonStyle = () => {
    if (!answered) return "border-gray-300 hover:bg-gray-50 cursor-pointer";
    if (isSelected && !isCorrect) return "border-rose-400 bg-rose-50";
    if (isSelected && isCorrect) return "border-green-400 bg-green-50";
    if (isCorrect && !isSelected) return "border-green-300 bg-green-50";
    return "border-gray-300";
  };

  const getCheckboxStyle = () => {
    if (!isSelected) return "border-gray-400";
    return isCorrect ? "border-green-500" : "border-rose-500";
  };

  return (
    <button
      onClick={!answered ? onSelect : undefined}
      disabled={answered}
      className={`flex items-center gap-3 w-full px-4 py-3 border rounded-lg text-left transition-all ${getButtonStyle()}`}
    >
      <div
        className={`mt-1 w-5 h-5 shrink-0 rounded border ${getCheckboxStyle()}`}
      ></div>
      <span className="text-gray-800 text-sm">{option}</span>
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
}

function QuestionContent({
  question,
  options,
  correct,
  selected,
  answered,
  onSelect,
}) {
  return (
    <div>
      <h2 className="font-bold text-lg text-gray-800 mb-4">{question}</h2>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <OptionButton
            key={i}
            option={opt}
            isSelected={selected === opt}
            isCorrect={opt === correct}
            answered={answered}
            onSelect={() => onSelect(opt)}
          />
        ))}
      </div>
    </div>
  );
}

function FeedbackPanel({ isCorrect, feedbackCorrect, feedbackWrong }) {
  return (
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
  );
}

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
      <div className="flex items-center justify-between pb-3 text-sm font-medium border-b border-gray-200 text-gray-700">
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

      <ProgressBar current={index + 1} total={total} />

      <QuestionContent
        question={question}
        options={options}
        correct={correct}
        selected={selected}
        answered={answered}
        onSelect={onSelect}
      />

      {answered && (
        <FeedbackPanel
          isCorrect={isCorrect}
          feedbackCorrect={feedbackCorrect}
          feedbackWrong={feedbackWrong}
        />
      )}
    </>
  );
}
