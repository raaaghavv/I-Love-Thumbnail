"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar.js";
import Header from "./components/Header.js";
import MainCanvas from "./components/MainCanvas.js";
import ChatPanel from "./components/ChatPanel.js";
import MobileToggle from "./components/MobileToggle.js";
import {
  generateThumbnailVariations,
  enhancePrompt,
} from "../../services/thumbnailService";

const ThumbnailGeneratorMVP = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState(null);
  const [referenceImage, setReferenceImage] = useState(null);
  const [referenceImageUrl, setReferenceImageUrl] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [videoType, setVideoType] = useState("");
  const [style, setStyle] = useState("");
  const [mood, setMood] = useState("");
  const [photoPlacement, setPhotoPlacement] = useState("center");
  const [aspectRatio, setAspectRatio] = useState("landscape");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState(null);
  const [generatedThumbnails, setGeneratedThumbnails] = useState({
    horizontal: [],
    vertical: [],
  });
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileImages, setShowMobileImages] = useState(false);

  const maxCredits = 5;

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Auto-enhance prompt when user stops typing
  useEffect(() => {
    if (!prompt.trim() || prompt.length < 10) {
      setEnhancedPrompt("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      if (videoType || style || mood) {
        setIsEnhancing(true);
        try {
          const enhanced = await enhancePrompt(prompt, videoType, style, mood);
          setEnhancedPrompt(enhanced);
        } catch (err) {
          console.error("Failed to enhance prompt:", err);
          setEnhancedPrompt("");
        } finally {
          setIsEnhancing(false);
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [prompt, videoType, style, mood]);

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
    setShowResults(true);

    if (isMobile) {
      setShowMobileImages(true);
    }

    try {
      const results = await generateThumbnailVariations(
        userPhoto,
        prompt,
        photoPlacement,
        {
          videoType,
          style,
          mood,
          referenceImage,
        }
      );

      setGeneratedThumbnails(results);
      setCreditsUsed((prev) => prev + 1);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to generate thumbnails. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [
    userPhoto,
    prompt,
    videoType,
    style,
    mood,
    photoPlacement,
    referenceImage,
    creditsUsed,
    isMobile,
  ]);

  const resetGeneration = () => {
    setShowResults(false);
    setShowMobileImages(false);
    setGeneratedThumbnails({ horizontal: [], vertical: [] });
    setError(null);
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          creditsUsed={creditsUsed}
          maxCredits={maxCredits}
          onReset={resetGeneration}
          showResults={showResults}
        />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Canvas Area */}
          {!isMobile && (
            <MainCanvas
              generatedThumbnails={generatedThumbnails}
              isLoading={isLoading}
              showResults={showResults}
              aspectRatio={aspectRatio}
              error={error}
            />
          )}

          {/* Chat Panel */}
          <ChatPanel
            prompt={prompt}
            setPrompt={setPrompt}
            enhancedPrompt={enhancedPrompt}
            isEnhancing={isEnhancing}
            isLoading={isLoading}
            userPhoto={userPhoto}
            userPhotoUrl={userPhotoUrl}
            referenceImage={referenceImage}
            referenceImageUrl={referenceImageUrl}
            videoType={videoType}
            setVideoType={setVideoType}
            style={style}
            setStyle={setStyle}
            mood={mood}
            setMood={setMood}
            photoPlacement={photoPlacement}
            setPhotoPlacement={setPhotoPlacement}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            onUserPhotoUpload={handleUserPhotoUpload}
            onReferenceUpload={handleReferenceUpload}
            onGenerate={handleGenerate}
            showResults={showResults}
            creditsUsed={creditsUsed}
            maxCredits={maxCredits}
            error={error}
          />
        </div>
      </div>

      {/* Mobile Toggle */}
      {isMobile && showResults && (
        <MobileToggle
          showImages={showMobileImages}
          setShowImages={setShowMobileImages}
          generatedThumbnails={generatedThumbnails}
          isLoading={isLoading}
          aspectRatio={aspectRatio}
        />
      )}
    </div>
  );
};

export default ThumbnailGeneratorMVP;
