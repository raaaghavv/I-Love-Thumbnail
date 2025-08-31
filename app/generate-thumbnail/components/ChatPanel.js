import {
  Upload,
  Image,
  Send,
  Paperclip,
  Smile,
  Palette,
  Monitor,
  Smartphone,
  Sparkles,
} from "lucide-react";
import React from "react";

export default function ChatPanel({
  prompt,
  setPrompt,
  enhancedPrompt,
  isEnhancing,
  isLoading,
  userPhoto,
  userPhotoUrl,
  referenceImage,
  referenceImageUrl,
  videoType,
  setVideoType,
  style,
  setStyle,
  mood,
  setMood,
  photoPlacement,
  setPhotoPlacement,
  aspectRatio,
  setAspectRatio,
  onUserPhotoUpload,
  onReferenceUpload,
  onGenerate,
  showResults,
  creditsUsed,
  maxCredits,
  error,
}) {
  const userPhotoInputRef = React.useRef(null);
  const referenceInputRef = React.useRef(null);

  // Replace the colored sections with neutral shades:
  return (
    <div
      className={`${
        showResults ? "w-96" : "w-full max-w-2xl mx-auto"
      } bg-white border-l border-gray-200 flex flex-col transition-all duration-300`}
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">ThumbPic</h3>
            <p className="text-sm text-gray-600">Thumbnail Designer</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-auto">
        {!showResults && (
          <div className="space-y-4">
            {/* Welcome Message */}
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-sm">
                <p className="text-gray-900">
                  Hello! Welcome to ThumbPic AI. How can I assist you with your
                  thumbnail design needs today? Whether you're looking for
                  YouTube thumbnails, social media graphics, or video covers,
                  I'm here to help bring your creative vision to life. What
                  would you like to create?
                </p>
              </div>
            </div>

            {/* Uploaded Images Display */}
            {(userPhotoUrl || referenceImageUrl) && (
              <div className="flex justify-end">
                <div className="bg-gray-100 rounded-2xl rounded-tr-sm p-4 max-w-sm">
                  <div className="space-y-3">
                    {userPhotoUrl && (
                      <div>
                        <p className="text-sm text-gray-800 mb-2">
                          Your Photo:
                        </p>
                        <img
                          src={userPhotoUrl}
                          alt="User"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    {referenceImageUrl && (
                      <div>
                        <p className="text-sm text-gray-800 mb-2">Reference:</p>
                        <img
                          src={referenceImageUrl}
                          alt="Reference"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Generating State */}
        {(isEnhancing || isLoading) && (
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              {/* <Sparkles className="w-4 h-4 text-white" /> */}
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <span className="text-gray-600 text-sm">
                  {isEnhancing
                    ? "Enhancing your prompt..."
                    : "Generating thumbnails..."}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        {/* Controls Row */}
        <div className="mb-4 space-y-3">
          {/* File Upload Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => userPhotoInputRef.current?.click()}
              className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-dashed transition-colors ${
                userPhoto
                  ? "border-gray-600 bg-gray-50 text-gray-700"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">
                {userPhoto ? "Photo Added" : "Your Photo"}
              </span>
            </button>

            <button
              onClick={() => referenceInputRef.current?.click()}
              className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-dashed transition-colors ${
                referenceImage
                  ? "border-gray-600 bg-gray-50 text-gray-700"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              <Image className="w-4 h-4" />
              <span className="text-sm font-medium">
                {referenceImage ? "Reference Added" : "Reference"}
              </span>
            </button>
          </div>

          {/* Aspect Ratio Toggle */}
          <div className="flex space-x-2">
            <button
              onClick={() => setAspectRatio("landscape")}
              className={`flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg transition-colors ${
                aspectRatio === "landscape"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="text-sm font-medium">Landscape</span>
            </button>
            <button
              onClick={() => setAspectRatio("portrait")}
              className={`flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg transition-colors ${
                aspectRatio === "portrait"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-sm font-medium">Portrait</span>
            </button>
          </div>

          {/* Quick Options */}
          <div className="grid grid-cols-3 gap-2">
            <select
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
              className="p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="">Video Type</option>
              <option value="tutorial">Tutorial</option>
              <option value="review">Review</option>
              <option value="vlog">Vlog</option>
              <option value="gaming">Gaming</option>
              <option value="music">Music</option>
              <option value="comedy">Comedy</option>
            </select>

            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="">Style</option>
              <option value="bold">Bold</option>
              <option value="clean">Clean</option>
              <option value="colorful">Colorful</option>
              <option value="dark">Dark</option>
              <option value="retro">Retro</option>
            </select>

            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="">Mood</option>
              <option value="excited">Excited</option>
              <option value="mysterious">Mysterious</option>
              <option value="professional">Professional</option>
              <option value="fun">Fun</option>
              <option value="serious">Serious</option>
            </select>
          </div>

          {/* Photo Placement */}
          <div className="flex space-x-2">
            <span className="text-sm text-gray-600 py-2">Photo Position:</span>
            {["left", "center", "right"].map((placement) => (
              <button
                key={placement}
                onClick={() => setPhotoPlacement(placement)}
                className={`px-3 py-1 text-sm rounded-md transition-colors capitalize ${
                  photoPlacement === placement
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {placement}
              </button>
            ))}
          </div>
        </div>

        {/* Main Input */}
        <div className="relative">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Start with an idea or task..."
                className="w-full p-4 pr-12 border border-gray-300 rounded-xl  resize-none"
                rows={3}
                disabled={isLoading}
              />

              {/* Enhanced Prompt Display */}
              {enhancedPrompt && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">Enhanced: </span>
                    {enhancedPrompt}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={onGenerate}
              disabled={
                isLoading ||
                !userPhoto ||
                !prompt.trim() ||
                creditsUsed >= maxCredits
              }
              className="w-10 h-10 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white rounded-xl flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Attachment Button */}
          <button className="absolute bottom-3 right-14 p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
        </div>

        {/* Hidden File Inputs */}
        <input
          ref={userPhotoInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => onUserPhotoUpload(e.target.files)}
          className="hidden"
        />
        <input
          ref={referenceInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => onReferenceUpload(e.target.files)}
          className="hidden"
        />

        {/* Error Display */}
        {error && (
          <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-700">{error}</p>
          </div>
        )}

        {/* Credits Warning */}
        {creditsUsed >= maxCredits && (
          <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-800">
              You've used all free credits. Upgrade to continue creating!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
