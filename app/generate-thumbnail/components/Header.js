import { ArrowLeft, Sparkles } from "lucide-react";

export default function Header({
  creditsUsed,
  maxCredits,
  onReset,
  showResults,
}) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        {showResults && (
          <button
            onClick={onReset}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-gray-900">
          {showResults ? "Generated Thumbnails" : "Untitled"}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          <span className="text-gray-900 font-medium">{creditsUsed}</span>
          <span className="text-gray-500"> / {maxCredits}</span>
        </div>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Upgrade
        </button>
      </div>
    </header>
  );
}
