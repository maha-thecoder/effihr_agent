export async function callAI(prompt) {
  try {
    const response = await window.puter.ai.chat(prompt, {
      model: "openrouter:meta-llama/llama-3.1-8b-instruct"
    });

    // 🔥 FIX: Extract only text
    return response?.message?.content || "No response";

  } catch (err) {
    console.error("Puter AI Error:", err);
    return "⚠️ AI failed to respond.";
  }
}