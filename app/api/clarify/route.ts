import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { task } = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a productivity assistant. Transform this vague intention into a specific, actionable task with a clear action verb and measurable outcome. NEVER return the same words as the input. Example: "work out" → "Complete 30-minute HIIT workout at 7am". Now transform: "${task}"`
            }]
          }]
        }),
      }
    );

    const data = await response.json();
    const refined = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? task;

    return NextResponse.json({ refined });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to refine task" }, { status: 500 });
  }
}