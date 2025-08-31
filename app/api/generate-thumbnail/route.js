
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to convert File to Gemini format
const fileToGenerativePart = async (file) => {
  // Convert File to ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  // Convert ArrayBuffer to Buffer
  const buffer = Buffer.from(arrayBuffer);
  // Convert to base64
  const base64 = buffer.toString("base64");

  return {
    type: "image_url",
    image_url: {
      url: base64,
    },
  };
};

// Content moderation function
const moderateContent = (prompt) => {
  const prohibitedTerms = [
    // Add terms that violate fair use or content policies
    "copyrighted",
    "trademark",
    "brand logo",
    "disney",
    "marvel",
    "pokemon",
    // Add inappropriate content filters
    "nude",
    "naked",
    "sexual",
    "violence",
    "hate",
    "discrimination",
  ];

  const lowerPrompt = prompt.toLowerCase();
  for (const term of prohibitedTerms) {
    if (lowerPrompt.includes(term)) {
      throw new Error(
        `Content moderation: Prompt contains prohibited content. Please revise your description.`
      );
    }
  }

  return true;
};

// Enhanced prompt generation
const enhancePromptForThumbnail = (
  userPrompt,
  videoType,
  style,
  mood,
  photoPlacement,
  hasReference
) => {
  // Content guardrails
  moderateContent(userPrompt);

  let enhancedPrompt = `Create a professional YouTube thumbnail that is eye-catching and click-worthy. `;

  // Add user requirements
  enhancedPrompt += `Main concept: ${userPrompt}. `;

  // Add placement instruction
  enhancedPrompt += `Place the person's photo on the ${photoPlacement} side of the thumbnail. `;

  // Add style and mood
  if (style) enhancedPrompt += `Style: ${style}. `;
  if (mood) enhancedPrompt += `Mood: ${mood}. `;
  if (videoType) enhancedPrompt += `This is for a ${videoType} video. `;

  // Add reference context
  if (hasReference) {
    enhancedPrompt += `Use the reference image as inspiration for composition and style. `;
  }

  // Add thumbnail best practices
  enhancedPrompt += `Requirements:
- High contrast and vibrant colors
- Bold, readable text if any
- Clear focal point
- Professional quality
- Engaging composition that encourages clicks
- Ensure the person stands out clearly
- Use appropriate typography and layout
- Make it visually appealing for the target audience`;

  return enhancedPrompt;
};

const handleApiResponse = (response, context) => {
  // Check for prompt blocking
  // if (response.content?.length > 0) {
  // const { blockReason, blockReasonMessage } = response.promptFeedback;
  // throw new Error(
  // `Content blocked: ${blockReason}. ${
  //   blockReasonMessage ||
  // }`
  //  "Please try a different description."
  //   );
  // }

  // Find image in response
  const imagePartFromResponse = response.images[0];

  if (imagePartFromResponse) {
    // const { type, image_url } = imagePartFromResponse;
    return imagePartFromResponse.image_url.url;
  }

  // Handle other issues
  const finishReason = response.candidates?.[0]?.finishReason;
  if (finishReason && finishReason !== "STOP") {
    throw new Error(
      `Generation stopped: ${finishReason}. Please try rephrasing your description.`
    );
  }

  throw new Error(
    "No image was generated. Please try a different description."
  );
};

export async function POST(request) {
  try {
    // Initialize Gemini AI
    // const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    // Parse form data
    const formData = await request.formData();
    const userPhoto = formData.get("userPhoto");
    const referenceImage = formData.get("referenceImage");
    const prompt = formData.get("prompt");
    const orientation = formData.get("orientation") || "horizontal";
    const videoType = formData.get("videoType") || "";
    const style = formData.get("style") || "";
    const mood = formData.get("mood") || "";
    const photoPlacement = formData.get("photoPlacement") || "center";

    // Validate file uploads
    if (!userPhoto || !(userPhoto instanceof File)) {
      return NextResponse.json(
        { error: "Valid user photo file is required" },
        { status: 400 }
      );
    }

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Enhanced prompt generation
    const enhancedPrompt = enhancePromptForThumbnail(
      prompt,
      videoType,
      style,
      mood,
      photoPlacement,
      !!referenceImage
    );

    // Convert files to Gemini format
    const parts = [];

    // Add the enhanced prompt
    parts.push({
      type: "text",
      text: enhancedPrompt,
    });

    // Add user photo
    const userPhotoPart = await fileToGenerativePart(userPhoto);

    // Add reference image if provided
    if (referenceImage instanceof File) {
      const referencePart = await fileToGenerativePart(referenceImage);
      parts.push(referencePart);
    }

    // console.log(parts);

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image-preview:free",
      messages: [
        {
          role: "user",
          // content: { parts },
          content: "generate an image of a woman",
        },
      ],
    });

    const result = completion.choices[0].message;

    // const result = await ai.models.generateContent({
    //   model: "gemini-2.5-flash-image-preview",
    //   contents: [{ parts }],
    //   generationConfig: {
    //     temperature: 0.7,
    //     topP: 0.8,
    //     topK: 40,
    //   },
    // });

    const imageDataUrl = handleApiResponse(result, "thumbnail generation");

    return NextResponse.json({
      success: true,
      imageUrl: imageDataUrl,
      enhancedPrompt,
    });
  } catch (error) {
    console.error("Thumbnail generation error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to generate thumbnail",
        success: false,
      },
      { status: 500 }
    );
  }
}
