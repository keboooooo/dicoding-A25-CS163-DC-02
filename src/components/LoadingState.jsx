import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-600">Loading quiz...</p>
      </div>
    </div>
  );
}
