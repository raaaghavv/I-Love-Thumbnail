import { Image, MessageSquare } from "lucide-react";
import MainCanvas from "./MainCanvas";

export default function MobileToggle({
  showImages,
  setShowImages,
  generatedThumbnails,
  isLoading,
  aspectRatio,
}) {
  return (
    <>
      {/* Mobile View */}
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Mobile Header */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <h1 className="font-semibold text-gray-900">
            {showImages ? "Generated Thumbnails" : "Chat"}
          </h1>

          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setShowImages(false)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors ${
                !showImages
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setShowImages(true)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors ${
                showImages
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Images</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {showImages ? (
          <MainCanvas
            generatedThumbnails={generatedThumbnails}
            isLoading={isLoading}
            showResults={true}
            aspectRatio={aspectRatio}
          />
        ) : (
          <div className="flex-1 p-4">
            <p className="text-gray-600">
              Switch to Images tab to see your generated thumbnails.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
