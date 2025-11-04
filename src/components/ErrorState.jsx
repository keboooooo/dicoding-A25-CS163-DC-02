export default function ErrorState({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-red-50 border border-red-300 rounded-lg p-6 max-w-md">
        <h2 className="text-red-800 font-semibold mb-2">Error</h2>
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  );
}
