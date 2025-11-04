import { RefreshCcw } from "lucide-react";

export default function NavigationButtons({
  current,
  total,
  onReset,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex justify-end gap-2 mt-6 text-sm">
      <button
        onClick={onReset}
        className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        <RefreshCcw className="w-4 h-4 mr-2" /> Try Again
      </button>

      <button
        onClick={onPrevious}
        disabled={current === 0}
        className="flex items-center space-x-1 px-4 py-2 rounded-lg border-2 border-dashed border-gray-400 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m15 19-7-7 7-7"
          />
        </svg>
        <span>Previous</span>
      </button>

      <button
        onClick={onNext}
        disabled={current === total - 1}
        className="flex items-center space-x-1 px-4 py-2 rounded-lg border-2 border-dashed border-gray-400 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span>Next</span>
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m9 5 7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
