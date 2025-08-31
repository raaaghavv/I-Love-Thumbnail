// pages/api/enhance-prompt.js (or app/api/enhance-prompt/route.js for App Router)

import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  try {
    const { prompt, videoType, style, mood } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Initialize Gemini AI for text generation
    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

    // Create enhancement prompt
    const enhancementPrompt = `You are an expert YouTube thumbnail designer. Take the user's basic thumbnail description and enhance it into a detailed, professional prompt for AI image generation.
User's description: "${prompt}"
Video type: ${videoType || "general"}
Style preference: ${style || "not specified"}
Mood preference: ${mood || "not specified"}

Transform this into a detailed prompt that will create an eye-catching YouTube thumbnail. Include:
- Specific visual elements and composition
- Color schemes and lighting
- Text placement and typography suggestions
- Background elements
- Overall aesthetic that matches the video type and style

Keep the enhanced prompt focused, clear, and under 200 words. Do not include any copyrighted characters, brands, or trademarked content.

Enhanced prompt:`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: enhancementPrompt,
    });

    const enhancedPrompt = result.text.trim();

    return NextResponse.json({
      success: true,
      enhancedPrompt,
      originalPrompt: prompt,
    });
  } catch (error) {
    console.error("Prompt enhancement error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to enhance prompt",
        success: false,
      },
      { status: 500 }
    );
  }
}
