// services/thumbnailService.js

/**
 * Generate thumbnails using the API route
 */
export const generateThumbnail = async (
  userPhoto,
  prompt,
  orientation,
  photoPlacement,
  options = {}
) => {
  const {
    videoType = "",
    style = "",
    mood = "",
    referenceImage = null,
  } = options;

  // Create FormData for file upload
  const formData = new FormData();
  formData.append("userPhoto", userPhoto);
  formData.append("prompt", prompt);
  formData.append("orientation", orientation);
  formData.append("photoPlacement", photoPlacement);
  formData.append("videoType", videoType);
  formData.append("style", style);
  formData.append("mood", mood);

  if (referenceImage) {
    formData.append("referenceImage", referenceImage);
  }

  const response = await fetch("/api/generate-thumbnail", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate thumbnail");
  }

  return data.imageUrl;
};

/**
 * Generate multiple thumbnail variations
 */
export const generateThumbnailVariations = async (
  userPhoto,
  prompt,
  photoPlacement,
  options = {}
) => {
  const {
    videoType = "",
    style = "",
    mood = "",
    referenceImage = null,
  } = options;

  try {
    // Generate 3 horizontal and 3 vertical thumbnails concurrently
    const horizontalPromises = Array(3)
      .fill(null)
      .map(() =>
        generateThumbnail(userPhoto, prompt, "horizontal", photoPlacement, {
          videoType,
          style,
          mood,
          referenceImage,
        })
      );

    const verticalPromises = Array(3)
      .fill(null)
      .map(() =>
        generateThumbnail(userPhoto, prompt, "vertical", photoPlacement, {
          videoType,
          style,
          mood,
          referenceImage,
        })
      );

    const [horizontalResults, verticalResults] = await Promise.all([
      Promise.all(horizontalPromises),
      Promise.all(verticalPromises),
    ]);

    return {
      horizontal: horizontalResults,
      vertical: verticalResults,
    };
  } catch (error) {
    console.error("Error generating thumbnail variations:", error);
    throw error;
  }
};

/**
 * Enhance user prompt using text AI model
 */
export const enhancePrompt = async (userPrompt, videoType, style, mood) => {
  const response = await fetch("/api/enhance-prompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: userPrompt,
      videoType,
      style,
      mood,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to enhance prompt");
  }

  return data.enhancedPrompt;
};
