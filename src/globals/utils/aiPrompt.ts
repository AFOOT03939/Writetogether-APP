export function buildCorrectionPrompt({
  currentText,
  fullContext,
  instruction
}: {
  currentText: string;
  fullContext: string;
  instruction?: string;
}) {
  return `
You are a professional creative writing assistant.

RULES:
- Fix grammar, spelling, and punctuation.
- Improve clarity and flow.
- Maintain original meaning unless instructed.
- Keep consistency with the story context.
- Do NOT add explicit content.

STRICT OUTPUT RULES:
- Do NOT explain anything.
- Do NOT add options.
- Do NOT add titles.
- Do NOT use bullet points.
- Return ONLY the final corrected text.
- If you break these rules, the answer is INVALID.

FULL STORY CONTEXT:
${fullContext}

CURRENT FRAGMENT:
${currentText}

USER INSTRUCTION:
${instruction || "Improve clarity and correctness"}

FINAL OUTPUT:
`;
}