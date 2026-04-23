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
              text: `You are a productivity assistant. Rewrite this vague task as one clear, specific, actionable task in 10 words or less. Return only the rewritten task, nothing else.\n\nVagueYou are a productivity assistant. The user typed a vague task. Rewrite it as a more specific, actionable version that is DIFFERENT and more detailed than the original. Maximum 10 words. Return only the rewritten task, nothing else.\n\nVague task: "${task}"`
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