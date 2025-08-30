"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Upload, Download, Wand2, Settings } from "lucide-react";
import {
  generateThumbnailVariations,
  enhancePrompt,
} from "../services/thumbnailService";

// Simulated AI service - replace with actual Gemini integration
const generateThumbnail = async (
  userPhoto,
  prompt,
  orientation,
  photoPlacement
) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // For MVP, return a placeholder that shows the concept
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (orientation === "horizontal") {
    canvas.width = 1280;
    canvas.height = 720;
  } else {
    canvas.width = 1080;
    canvas.height = 1920;
  }

  if (!ctx) throw new Error("Could not create canvas context");

  // Create a gradient background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#3B82F6");
  gradient.addColorStop(1, "#1E40AF");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add text overlay
  ctx.fillStyle = "white";
  ctx.font = "bold 48px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Generated Thumbnail", canvas.width / 2, canvas.height / 2);

  ctx.font = "24px Arial";
  ctx.fillText(
    prompt.substring(0, 50) + "...",
    canvas.width / 2,
    canvas.height / 2 + 60
  );

  return canvas.toDataURL("image/png");
};

const ThumbnailGeneratorMVP = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState(null);
  const [referenceImage, setReferenceImage] = useState(null);
  const [referenceImageUrl, setReferenceImageUrl] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [videoType, setVideoType] = useState("");
  const [style, setStyle] = useState("");
  const [mood, setMood] = useState("");
  const [photoPlacement, setPhotoPlacement] = useState("center");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedThumbnails, setGeneratedThumbnails] = useState({
    horizontal: [],
    vertical: [],
  });
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const userPhotoInputRef = useRef(null);
  const referenceInputRef = useRef(null);

  const maxCredits = 5;

  // Handle user photo upload
  useEffect(() => {
    if (userPhoto) {
      const url = URL.createObjectURL(userPhoto);
      setUserPhotoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setUserPhotoUrl(null);
    }
  }, [userPhoto]);

  // Handle reference image upload
  useEffect(() => {
    if (referenceImage) {
      const url = URL.createObjectURL(referenceImage);
      setReferenceImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setReferenceImageUrl(null);
    }
  }, [referenceImage]);

  const handleUserPhotoUpload = useCallback((files) => {
    if (files && files[0]) {
      setUserPhoto(files[0]);
    }
  }, []);

  const handleReferenceUpload = useCallback((files) => {
    if (files && files[0]) {
      setReferenceImage(files[0]);
    }
  }, []);

  const enhancePrompt = (userPrompt) => {
    // Simulate LLM prompt enhancement
    const basePrompt = `Create a stunning YouTube thumbnail with the following elements: ${userPrompt}`;
    const styleAddition = style ? ` Style: ${style}.` : "";
    const moodAddition = mood ? ` Mood: ${mood}.` : "";
    const videoTypeAddition = videoType ? ` Video type: ${videoType}.` : "";

    return (
      basePrompt +
      styleAddition +
      moodAddition +
      videoTypeAddition +
      " Make it eye-catching and click-worthy with bold text and vibrant colors."
    );
  };

  const handleGenerate = useCallback(async () => {
    if (!userPhoto) {
      setError("Please upload your photo first.");
      return;
    }

    if (!prompt.trim()) {
      setError("Please enter a description for your thumbnail.");
      return;
    }

    if (creditsUsed >= maxCredits) {
      setError(
        "You have reached your free generation limit. Please upgrade to continue."
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const enhancedPrompt = enhancePrompt(prompt);

      // Generate 3 variations for both orientations
      const horizontalPromises = Array(3)
        .fill(null)
        .map(() =>
          generateThumbnail(
            userPhoto,
            enhancedPrompt,
            "horizontal",
            photoPlacement
          )
        );

      const verticalPromises = Array(3)
        .fill(null)
        .map(() =>
          generateThumbnail(
            userPhoto,
            enhancedPrompt,
            "vertical",
            photoPlacement
          )
        );

      const [horizontalResults, verticalResults] = await Promise.all([
        Promise.all(horizontalPromises),
        Promise.all(verticalPromises),
      ]);

      setGeneratedThumbnails({
        horizontal: horizontalResults,
        vertical: verticalResults,
      });

      setCreditsUsed((prev) => prev + 1);
      setShowResults(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to generate thumbnails. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userPhoto, prompt, videoType, style, mood, photoPlacement, creditsUsed]);

  const downloadThumbnail = (dataUrl, filename) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllThumbnails = () => {
    [
      ...generatedThumbnails.horizontal,
      ...generatedThumbnails.vertical,
    ].forEach((thumbnail, index) => {
      const orientation = index < 3 ? "horizontal" : "vertical";
      const number = index < 3 ? index + 1 : index - 2;
      downloadThumbnail(thumbnail, `thumbnail-${orientation}-${number}.png`);
    });
  };

  const copyToClipboard = async (dataUrl) => {
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const shareLink = (dataUrl, index, orientation) => {
    // For MVP, this could just copy the data URL or implement a simple sharing mechanism
    // In production, you'd upload to a CDN and generate shareable links
    const shareUrl = `${window.location.origin}/shared/${orientation}-${index}`;
    navigator.clipboard.writeText(shareUrl);
    // You could add a toast notification here
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Your Generated Thumbnails</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowResults(false)}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Generate More
              </button>
              <button
                onClick={downloadAllThumbnails}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download All as ZIP
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Horizontal Thumbnails */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-300">
                Horizontal (YouTube) - 1280×720
              </h2>
              <div className="space-y-4">
                {generatedThumbnails.horizontal.map((thumbnail, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={thumbnail}
                      alt={`Horizontal thumbnail ${index + 1}`}
                      className="w-full rounded-lg border border-gray-600 hover:border-blue-400 transition-colors"
                    />
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() =>
                          downloadThumbnail(
                            thumbnail,
                            `thumbnail-horizontal-${index + 1}.png`
                          )
                        }
                        className="bg-black/70 hover:bg-black/90 p-2 rounded-lg"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(thumbnail)}
                        className="bg-black/70 hover:bg-black/90 p-2 rounded-lg"
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                      <button
                        onClick={() =>
                          shareLink(thumbnail, index + 1, "horizontal")
                        }
                        className="bg-black/70 hover:bg-black/90 p-2 rounded-lg"
                        title="Share link"
                      >
                        🔗
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Thumbnails */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-300">
                Vertical (Shorts/Reels) - 1080×1920
              </h2>
              <div className="space-y-4">
                {generatedThumbnails.vertical.map((thumbnail, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={thumbnail}
                      alt={`Vertical thumbnail ${index + 1}`}
                      className="w-full max-w-xs mx-auto rounded-lg border border-gray-600 hover:border-purple-400 transition-colors"
                    />
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() =>
                          downloadThumbnail(
                            thumbnail,
                            `thumbnail-vertical-${index + 1}.png`
                          )
                        }
                        className="bg-black/70 hover:bg-black/90 p-2 rounded-lg"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(thumbnail)}
                        className="bg-black/70 hover:bg-black/90 p-2 rounded-lg"
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                      <button
                        onClick={() =>
                          shareLink(thumbnail, index + 1, "vertical")
                        }
                        className="bg-black/70 hover:bg-black/90 p-2 rounded-lg"
                        title="Share link"
                      >
                        🔗
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">AI Thumbnail Generator</h1>
          <div className="text-sm text-gray-300">
            Credits: {creditsUsed}/{maxCredits} free generations
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
            <p className="text-red-300">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-red-400 hover:text-red-300 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="space-y-8">
          {/* Step 1: Upload Photo */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Step 1: Upload Your Photo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Photo */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Photo (Required)
                </label>
                <div
                  onClick={() => userPhotoInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg p-8 text-center cursor-pointer transition-colors"
                >
                  {userPhotoUrl ? (
                    <img
                      src={userPhotoUrl}
                      alt="User photo"
                      className="max-w-full max-h-32 mx-auto rounded"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 text-gray-400 flex items-center justify-center text-2xl">
                        📷
                      </div>
                      <p className="text-gray-400">
                        Click to upload your photo
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={userPhotoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUserPhotoUpload(e.target.files)}
                  className="hidden"
                />
              </div>

              {/* Reference Image */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reference Thumbnail (Optional)
                </label>
                <div
                  onClick={() => referenceInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg p-8 text-center cursor-pointer transition-colors"
                >
                  {referenceImageUrl ? (
                    <img
                      src={referenceImageUrl}
                      alt="Reference"
                      className="max-w-full max-h-32 mx-auto rounded"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 text-gray-400 flex items-center justify-center text-2xl">
                        🖼️
                      </div>
                      <p className="text-gray-400">
                        Upload inspiration thumbnail
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={referenceInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleReferenceUpload(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Questionnaire */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Step 2: Tell Us About Your Video
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Video Type
                </label>
                <select
                  value={videoType}
                  onChange={(e) => setVideoType(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select type...</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="review">Review</option>
                  <option value="vlog">Vlog</option>
                  <option value="gaming">Gaming</option>
                  <option value="music">Music</option>
                  <option value="comedy">Comedy</option>
                  <option value="educational">Educational</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select style...</option>
                  <option value="bold">Bold & Dramatic</option>
                  <option value="clean">Clean & Minimal</option>
                  <option value="colorful">Colorful & Vibrant</option>
                  <option value="dark">Dark & Moody</option>
                  <option value="retro">Retro</option>
                  <option value="futuristic">Futuristic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mood</label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select mood...</option>
                  <option value="excited">Excited</option>
                  <option value="mysterious">Mysterious</option>
                  <option value="professional">Professional</option>
                  <option value="fun">Fun & Playful</option>
                  <option value="serious">Serious</option>
                  <option value="inspiring">Inspiring</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Photo Placement
              </label>
              <div className="flex gap-2">
                {["left", "center", "right"].map((placement) => (
                  <button
                    key={placement}
                    onClick={() => setPhotoPlacement(placement)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors capitalize ${
                      photoPlacement === placement
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {placement}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Generate */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wand2 className="w-5 h-5" />
              Step 3: Describe Your Thumbnail
            </h2>

            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want your thumbnail to look like... (e.g., 'Me pointing at a shocked expression with the text UNBELIEVABLE in big red letters')"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                rows={3}
                disabled={isLoading}
              />

              <button
                onClick={handleGenerate}
                disabled={
                  isLoading ||
                  !userPhoto ||
                  !prompt.trim() ||
                  creditsUsed >= maxCredits
                }
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating Thumbnails...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate 6 Thumbnails ({maxCredits - creditsUsed} credits
                    left)
                  </>
                )}
              </button>
            </div>
          </div>

          {creditsUsed >= maxCredits && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold text-yellow-300 mb-2">
                Free Credits Exhausted
              </h3>
              <p className="text-gray-300 mb-4">
                You've used all 5 free thumbnail generations. Upgrade to
                continue creating amazing thumbnails!
              </p>
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Upgrade Now
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ThumbnailGeneratorMVP;
