import {
  Download,
  Edit3,
  Copy,
  Share2,
  Image as ImageIcon,
} from "lucide-react";

export default function MainCanvas({
  generatedThumbnails,
  isLoading,
  showResults,
  aspectRatio,
  error,
}) {
  const downloadThumbnail = (dataUrl, filename) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async (dataUrl) => {
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const shareLink = (dataUrl, index, orientation) => {
    const shareUrl = `${window.location.origin}/shared/${orientation}-${index}`;
    navigator.clipboard.writeText(shareUrl);
  };

  if (!showResults) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <ImageIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Start Creating Thumbnails
          </h3>
          <p className="text-gray-600 max-w-md">
            Upload your photo and describe your thumbnail idea to get started
            with AI-powered generation.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl">❌</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Generation Failed
          </h3>
          <p className="text-gray-600 max-w-md">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Generating Thumbnails
          </h3>
          <p className="text-gray-600">
            Creating your personalized thumbnails...
          </p>
        </div>
      </div>
    );
  }

  const thumbnailsToShow =
    aspectRatio === "landscape"
      ? generatedThumbnails.horizontal
      : generatedThumbnails.vertical;

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Generated Thumbnails
          </h2>
          <p className="text-gray-600">
            {aspectRatio === "landscape"
              ? "Landscape (1280×720)"
              : "Portrait (1080×1920)"}{" "}
            format
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {thumbnailsToShow.map((thumbnail, index) => (
            <div key={index} className="group relative">
              <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src={thumbnail}
                  alt={`Generated thumbnail ${index + 1}`}
                  className={`w-full ${
                    aspectRatio === "landscape"
                      ? "aspect-video"
                      : "aspect-[9/16]"
                  } object-cover`}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                {/* Action Buttons */}
                <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() =>
                      downloadThumbnail(
                        thumbnail,
                        `thumbnail-${aspectRatio}-${index + 1}.png`
                      )
                    }
                    className="w-8 h-8 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center shadow-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-gray-700" />
                  </button>

                  <button
                    onClick={() => copyToClipboard(thumbnail)}
                    className="w-8 h-8 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center shadow-lg transition-colors"
                    title="Copy"
                  >
                    <Copy className="w-4 h-4 text-gray-700" />
                  </button>

                  <button
                    onClick={() => shareLink(thumbnail, index + 1, aspectRatio)}
                    className="w-8 h-8 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center shadow-lg transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4 text-gray-700" />
                  </button>

                  <button
                    className="w-8 h-8 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center shadow-lg transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
