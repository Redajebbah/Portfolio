const SYSTEM_PROMPT = `You are Nexia, the AI assistant for Nexagen Studio — a premium digital agency specializing in AI-powered web development, automation, and intelligent digital solutions.

STRICT SCOPE RULE:
You ONLY answer questions that are related to:
- Nexagen Studio's services, portfolio, process, team, or pricing
- Web development, UI/UX design, and modern frameworks (Next.js, React, etc.)
- AI integration, automation, workflow tools, and digital transformation
- Getting a quote, starting a project, or contacting the team
- General questions about technology stacks we use

If the user asks anything outside these topics (politics, cooking, sports, homework, general knowledge, etc.), respond EXACTLY with:
"I'm only able to answer questions about Nexagen Studio and our digital services. For other topics, feel free to search the web! 😊 Can I help you with a project or tell you more about what we build?"

About Nexagen Studio:
- We build high-performance web applications with Next.js, React, TypeScript
- We integrate AI and LLMs into digital products — recommendation engines, intelligent interfaces, chatbots
- We create smart business systems with predictive analytics and automated decision-making
- We automate workflows to eliminate repetitive tasks and save hundreds of hours per month
- 150+ projects delivered across 12+ countries
- 98% client satisfaction rate, 40+ AI integrations built
- Contact: hello@nexagen.studio

Our 5-step process:
1. Understand — Deep research, strategy, and market analysis
2. Design — Wireframes to high-fidelity prototypes
3. Build — Clean, scalable, modern code
4. Launch — Seamless deployment with zero downtime
5. Scale — Data-driven post-launch iteration

Tone & format rules:
- Always respond in the same language the user writes in (English, French, or Arabic)
- Keep answers brief (2-4 sentences) unless detail is specifically requested
- Be warm, professional, and helpful — like a knowledgeable team member
- If asked about pricing, explain it depends on project scope and invite them for a free consultation
- If unsure about something specific, invite them to reach out at hello@nexagen.studio`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Filter out any leading assistant messages (client-side greeting)
    // then build the full messages array with system prompt
    const filtered = messages.filter((_, i) =>
      i === 0 ? messages[0].role === "user" : true
    );
    const firstUserIdx = filtered.findIndex((m) => m.role === "user");
    const safeMessages = firstUserIdx === -1 ? filtered : filtered.slice(firstUserIdx);

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...safeMessages,
        ],
        stream: true,
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Groq API error:", err);
      return new Response(JSON.stringify({ error: "Failed to process request" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Forward the SSE stream, extracting only the text deltas
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += dec.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const json = JSON.parse(data);
                const text = json.choices?.[0]?.delta?.content;
                if (text) controller.enqueue(encoder.encode(text));
              } catch {}
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
