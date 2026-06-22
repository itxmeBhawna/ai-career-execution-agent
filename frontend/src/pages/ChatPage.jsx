import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Welcome. Tell me what you're working on today.",
    },
  ]);

  const [goals, setGoals] = useState([]);
  const [progress, setProgress] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [streak, setStreak] = useState(0);

  const displayName =
    localStorage.getItem("display_name") || "User";

  const userId =
    localStorage.getItem("user_id");

  const loadDashboard = async () => {
    try {
      const memoryResponse = await fetch(
        `http://127.0.0.1:8000/memory/${userId}`
      );

      const memoryData = await memoryResponse.json();

      setGoals(
        memoryData
          .filter((item) => item.type === "goal")
          .slice(-3)
          .reverse()
      );

      setProgress(
        memoryData
          .filter((item) => item.type === "progress")
          .slice(-3)
          .reverse()
      );

      setMilestones(
        memoryData
          .filter((item) => item.type === "milestone")
          .slice(-3)
          .reverse()
      );

      const streakResponse = await fetch(
        `http://127.0.0.1:8000/streak/${userId}`
      );

      const streakData = await streakResponse.json();

      setStreak(streakData.streak || 0);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/coach",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            display_name: displayName,
            user_input: userMessage,
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
        },
      ]);

      await loadDashboard();

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to connect to backend.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-2xl font-bold">
          AI Career Execution Coach
        </h1>
      </div>

      <div className="flex h-[calc(100vh-73px)]">

        <div className="w-96 border-r border-slate-800 p-4 overflow-y-auto space-y-4">

          <h2 className="text-2xl font-bold">
            Dashboard
          </h2>

          <div className="rounded-xl bg-slate-900 p-4">
            <h3 className="text-xl font-semibold">
              👤 User
            </h3>

            <p className="mt-3 text-slate-300">
              {displayName}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <h3 className="text-xl font-semibold">
              🔥 Streak
            </h3>

            <p className="mt-3 text-3xl font-bold">
              {streak}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <h3 className="text-xl font-semibold">
              🎯 Goals
            </h3>

            <div className="mt-3 space-y-3">
              {goals.length > 0 ? (
                goals.map((goal, index) => (
                  <div
                    key={index}
                    className="text-slate-300"
                  >
                    • {goal.content}
                  </div>
                ))
              ) : (
                <p className="text-slate-500">
                  No goals yet.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <h3 className="text-xl font-semibold">
              📈 Progress
            </h3>

            <div className="mt-3 space-y-3">
              {progress.length > 0 ? (
                progress.map((item, index) => (
                  <div
                    key={index}
                    className="text-slate-300"
                  >
                    • {item.content}
                  </div>
                ))
              ) : (
                <p className="text-slate-500">
                  No progress recorded.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <h3 className="text-xl font-semibold">
              🏆 Milestones
            </h3>

            <div className="mt-3 space-y-3">
              {milestones.length > 0 ? (
                milestones.map((item, index) => (
                  <div
                    key={index}
                    className="text-slate-300"
                  >
                    • {item.content}
                  </div>
                ))
              ) : (
                <p className="text-slate-500">
                  No milestones yet.
                </p>
              )}
            </div>
          </div>

        </div>

        <div className="flex flex-1 flex-col">

          <div className="border-b border-slate-800 p-6">
            <h2 className="text-4xl font-bold">
              AI Coach Conversation
            </h2>

            <p className="mt-2 text-slate-400">
              Welcome back, {displayName}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? "ml-auto max-w-4xl rounded-2xl bg-indigo-600 p-5 text-lg"
                    : "max-w-4xl rounded-2xl bg-slate-800 p-5"
                }
              >
                {message.role === "assistant" ? (
                  <div
                    className="
                    prose
                    prose-invert
                    max-w-none

                    prose-h2:mt-8
                    prose-h2:mb-4

                    prose-p:my-4

                    prose-ul:my-4
                    prose-li:my-2

                    prose-hr:hidden
                    "
                  >
                    <ReactMarkdown>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  message.content
                )}
              </div>
            ))}

          </div>

          <div className="border-t border-slate-800 p-4">

            <div className="flex gap-3">

              <input
                type="text"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask your coach..."
                className="flex-1 rounded-xl bg-slate-900 px-4 py-4 text-lg outline-none"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold hover:bg-indigo-500 disabled:opacity-50"
              >
                {loading ? "..." : "Send"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}