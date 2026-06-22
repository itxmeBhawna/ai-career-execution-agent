import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const startJourney = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    localStorage.setItem(
      "display_name",
      name.trim()
    );

    let userId =
      localStorage.getItem("user_id");

    if (!userId) {
      userId = crypto.randomUUID();

      localStorage.setItem(
        "user_id",
        userId
      );
    }

    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-8 py-4">
        <h1 className="text-2xl font-bold">
          AI Career Execution Coach
        </h1>
      </nav>

      <main className="flex min-h-[85vh] items-center justify-center px-6">
        <div className="max-w-4xl text-center">

          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            Keep Moving Forward
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-slate-400 md:text-xl">
            Progress is not about speed.
            Progress is about consistency.
            Every small step you take today
            compounds into the future you want tomorrow.
          </p>

          <div className="mt-10">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full max-w-md rounded-xl bg-slate-900 px-4 py-4 text-lg outline-none border border-slate-700"
            />
          </div>

          <button
            onClick={startJourney}
            className="mt-6 rounded-xl bg-indigo-600 px-8 py-4 font-semibold hover:bg-indigo-500"
          >
            Start Your Journey
          </button>

          <div className="mt-12 max-w-3xl mx-auto text-sm text-slate-500">
            AI Career Execution Coach helps prioritize
            your work, reduce decision fatigue,
            and guide you toward the highest-impact
            actions based on your goals and progress.

            <br />
            <br />

            AI responses may be inaccurate and should
            not be treated as professional, legal,
            financial, or career advice.
          </div>

        </div>
      </main>
    </div>
  );
}